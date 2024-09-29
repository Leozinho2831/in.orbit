const goals = localStorage.getItem('goalsArray');

const sectionGoal = document.querySelector('.js-sectionGoal');
const sectionInit = document.querySelector('.js-sectionInit');
const classSectionActive = 'js-activeSection';

if(sectionGoal && sectionInit){
    if(!goals.length){
        sectionInit.classList.add(classSectionActive);
    } else {
        sectionGoal.classList.add(classSectionActive);    
    }    
}

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

// goal é o objeto dentro do array
// esse for é usado quando n é necessário o número do array para manipular ele
for (const goal of goals){

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

const today = dayjs().format('ddd[,] DD [de] MMM');

const dateGoalCompleted = document.querySelector('.js-dateGoal');

dateGoalCompleted.textContent = today;

goals.forEach((goal) => {
    const titleCompletedGoal = document.querySelector(`.js-titleGoalCompleted-${goal.id}`);
    const infoCompletedHour = document.querySelector(`.js-completedInfoHour-${goal.id}`);

    titleCompletedGoal.textContent = goal.title;
    infoCompletedHour.textContent = goal.completedHour;
});