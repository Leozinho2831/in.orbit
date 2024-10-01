const getGoals = JSON.parse(localStorage.getItem('goalsArray'));

// colocar as datas seguindo padrão português brasileiro
dayjs.locale('pt-br');

// código para determinar textos da página
const firstDayOfWeek = dayjs().startOf('week');
const lastDayOfWeek = dayjs().endOf('week');

const titleHeader = document.querySelector('.js-titleHeader');

// colchetes para usar string sem ser comandos do format do dayjs
if(firstDayOfWeek.format('MM') != lastDayOfWeek.format('MM')){
    titleHeader.textContent = 
    `${firstDayOfWeek.format('DD [de] MMMM [à]')} ${lastDayOfWeek.format('DD [de] MMMM')}`;
} else {
    titleHeader.textContent = 
    `${firstDayOfWeek.format('DD [à]')} ${lastDayOfWeek.format('DD [de] MMMM')}`;
}

// somente para debugar enquanto está em produção
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { 
        localStorage.removeItem('goalsArray');
        localStorage.removeItem('containerButtonsGoal');
        localStorage.removeItem('barCompletedGoalValues');
        window.location.reload();
    }
});

// goal é o objeto dentro do array
// esse for é usado quando n é necessário o número do array para manipular o que deseja
if(getGoals){
    for (const goal of getGoals){

        const sectionCompletedGoal = document.querySelector('.js-completedGoal');
        const classSectionCompletedGoal = 'js-haveCompletedGoal';
    
        const textNotCompletedGoal = document.querySelector('.js-notCompletedGoal');
    
        if(goal.completed){
            sectionCompletedGoal.classList.add(classSectionCompletedGoal);
            textNotCompletedGoal.style.display = 'none';
    
            // o break para o loop
            break;
        } else {
            textNotCompletedGoal.style.display = 'block';
        }
    
    }
}