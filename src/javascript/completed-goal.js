const goals = JSON.parse(localStorage.getItem('goalsArray'));

// para debug
if(goals){
    if (dayjs(goals[0].createGoalDate, 'DD MM YYYY').isBefore(dayjs('30 09 2024', 'DD MM YYYY'))) {
        localStorage.removeItem('goalsArray');
    }
}

function barCompletedGoals(){
    const barCompletedGoal = document.querySelector('.js-completedGoalBar');

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
}

barCompletedGoals();

const containerButtonsGoal = document.querySelector('.js-containerButtonsGoal');
const containerButtonsGoalStorage = localStorage.getItem('containerButtonsGoal');

if(containerButtonsGoalStorage){
    containerButtonsGoal.innerHTML = containerButtonsGoalStorage;
}

function createInfoGoalCompleted(){
    goals.forEach((goal) => {
        console.log('ta funfando', goal.completed)
    });
}

function completedGoal(){

    goals.forEach((goal) => {
        const buttonCompleteGoal = document.querySelector(`.js-buttonCompleteGoal-${goal.id}`);
        const classButtonFinish = 'js-goalFinish';

        goal.completedHour = dayjs().format('HH[:]mm[h]');

        if(goal.completed == goal.desiredFrequency){
            buttonCompleteGoal.classList.add(classButtonFinish);

            const buttonsDisabled = document.querySelector('.js-goalFinish');
            buttonsDisabled.disabled = true;
        } else {
            goal.completed++;
            createInfoGoalCompleted();
            barCompletedGoals();
        }
    });

}

window.completedGoal = completedGoal;
// window.createInfoGoalCompleted = createInfoGoalCompleted;