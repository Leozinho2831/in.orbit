// para conseguir exportar deve estar fora de qualquer função
const sectionCreateMeta = document.querySelector('.js-sectionGoalMenu');
const classCreateMeta = 'js-menuOpened';

const sectionBlur = document.querySelector('.js-sectionBlur');

export default function closeCreateGoal() {
    sectionBlur.style.cssText = 'filter: none;';
    sectionCreateMeta.classList.remove(classCreateMeta);
}
        
window.closeCreateGoal = closeCreateGoal;

window.addEventListener('load', () => {
        
    function openRegisterGoal(){
        sectionBlur.style.cssText = 'filter: blur(5px);';
        
        sectionCreateMeta.classList.add(classCreateMeta);
    }
        
    // deve-se determinar a função que quer usar no html como global, desta maneira.
    window.openRegisterGoal = openRegisterGoal;
            
    const radios = document.querySelectorAll('input[type="radio"]');
        
    function toggleImageChecked(event){
        const imagesRadios = document.querySelectorAll('.js-circle');
        
        imagesRadios.forEach((imageRadio) => {
            imageRadio.src = 'src/images/circle not checked.svg';
            imageRadio.alt = 'círculo não ativo';
        });
        
        if(event.checked) {
            const imageRadioChecked = document.querySelector(`.js-circle-${event.id}`);
        
            imageRadioChecked.src = 'src/images/circle checked.svg';
            imageRadioChecked.alt = 'círculo ativo';
        }
    }
        
    radios.forEach((radio) => {
        radio.onchange = () => {
            toggleImageChecked(radio);
        }
    });

});