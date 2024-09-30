const goals = JSON.parse(localStorage.getItem('goalsArray'));

// para debug
if (dayjs(goals[0].createGoalDate, 'DD MM YYYY').isBefore(dayjs('30 09 2024', 'DD MM YYYY'))) {
    localStorage.clear();
}

const barCompletedGoal = document.querySelector('.js-completedGoalBar');
const classBarCompleted = 'js-completedPorcent';

let goalCompletedTotal = 0;
let totalGoals = 0;

if(goals){
    goals.forEach((goal) => {
        goalCompletedTotal += goal.completed;
        totalGoals += Number(goal.desiredFrequency);
    });
}

const porcentCompleted = Math.round((100 * goalCompletedTotal) / totalGoals);

barCompletedGoal.style.width = `${porcentCompleted}%`;

const infoCompletedGoalNumber = document.querySelector('.js-completedGoalNumber');
const infoTotalGoalNumber = document.querySelector('.js-totalGoalNumber');
const infoPorcentCompleted = document.querySelector('.js-percentageCompletedGoal');

infoCompletedGoalNumber.textContent = goalCompletedTotal;
infoTotalGoalNumber.textContent = totalGoals;
infoPorcentCompleted.textContent = `${porcentCompleted}%`;

goals.forEach((goal) => {
    const buttonCompleteGoal = document.querySelector(`.js-buttonCompleteGoal-${goal.id}`);

    buttonCompleteGoal.children[1].textContent = goal.title;
});

function disableButtonGoal(){
    const buttonsDisabled = document.querySelector('.js-goalFinish');
    
    buttonsDisabled.disabled = true;
}

function completedGoal(){
    goals.forEach((goal) => {
        const buttonCompleteGoal = document.querySelector(`.js-buttonCompleteGoal-${goal.id}`);
        const classButtonFinish = 'js-goalFinish';

        if(goal.completed == goal.desiredFrequency){
            buttonCompleteGoal.classList.add(classButtonFinish);
            disableButtonGoal();
        }
    });
}

window.completedGoal = completedGoal;

const today = dayjs().format('ddd[,] DD [de] MMM');

const dateGoalCompleted = document.querySelector('.js-dateGoal');

dateGoalCompleted.textContent = today;

if(goals){
    goals.forEach((goal) => {

        const titleCompletedGoal = document.querySelector(`.js-titleGoalCompleted-${goal.id}`);
        const infoCompletedHour = document.querySelector(`.js-completedInfoHour-${goal.id}`);

        if(titleCompletedGoal && goal.title){
            titleCompletedGoal.textContent = goal.title;
        } else {
            titleCompletedGoal.textContent = 'Deu erro, reporte ao proprietário';
        }

        if(infoCompletedHour && goal.completedHour){
            infoCompletedHour.textContent = goal.completedHour;
        } else {
            infoCompletedHour.textContent = 'Deu erro, reporte ao proprietário';
        }

    });
}