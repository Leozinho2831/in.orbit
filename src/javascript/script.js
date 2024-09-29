// const dayjs = require("dayjs");
// require('../../node_modules/dayjs/locale/pt-br')
// import dayjs from '/node_modules/dayjs/dayjs.min.js';
// import '/node_modules/dayjs/locale/pt-br.js'

dayjs.locale('pt-br');
console.log(dayjs());

let goals = [];

goals = [{
    title: '',
    desiredFrequency: 5,
    completed: 2,
}];

const sectionGoal = document.querySelector('.js-sectionGoal');
const sectionInit = document.querySelector('.js-sectionInit')
const classSectionActive = 'js-activeSection';

if(goals.length){
    sectionGoal.classList.add(classSectionActive);
} else {
    sectionInit.classList.add(classSectionActive);
}

window.addEventListener('load', () => {
    function initCreateGoal(){
        const sectionCreateMeta = document.querySelector('.js-sectionGoalMenu');
        const classCreateMeta = 'js-menuOpened';

        const sectionBlur = document.querySelector('.js-sectionBlur');
    
        function openRegisterGoal(){
            sectionBlur.style.cssText = 'filter: blur(5px);';
    
            sectionCreateMeta.classList.toggle(classCreateMeta);
        }
    
        // com type="module" deve-se determinar a função que quer usar no html como global, desta maneira.
        window.openRegisterGoal = openRegisterGoal;
    
        function closeCreateGoal(event){
            sectionBlur.style.cssText = 'filter: none;';

            sectionCreateMeta.classList.remove(classCreateMeta);
        }
        
        window.closeCreateGoal = closeCreateGoal;
    }
    
    initCreateGoal();
    
    function initSelectRadio(){
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
    }
    
    initSelectRadio();
});

// não esquecer de usar essa função na hora de desativar o botão após completar todas as vezes a meta
function disableButtonGoal(){
    const buttonsDisabled = document.querySelector('.js-goalFinish');

    buttonsDisabled.disabled = true;
}

disableButtonGoal();
