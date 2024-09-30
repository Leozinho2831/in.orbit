const getGoals = JSON.parse(localStorage.getItem('goalsArray'));

// para debug
if(getGoals){
    if (dayjs(getGoals[0].createGoalDate, 'DD MM YYYY').isBefore(dayjs('30 09 2024', 'DD MM YYYY'))) {
        localStorage.removeItem('goalsArray');
    }
}

const barCompletedGoal = document.querySelector('.js-completedGoalBar');

const infoCompletedGoalNumber = document.querySelector('.js-completedGoalNumber');
const infoTotalGoalNumber = document.querySelector('.js-totalGoalNumber');
const infoPorcentCompleted = document.querySelector('.js-percentageCompletedGoal');

export default function barCompletedGoals(){

    const getGoals = JSON.parse(localStorage.getItem('goalsArray'));

    let goalCompletedTotal = 0;
    let totalGoals = 0;

    if(getGoals){
        getGoals.forEach((goal) => {
            goalCompletedTotal += goal.completed;
            totalGoals += Number(goal.desiredFrequency);
        });
    }

    let porcentCompleted = Math.round((100 * goalCompletedTotal) / totalGoals);

    const getValuesBar = JSON.parse(localStorage.getItem('barCompletedGoalValues'));

    if(getValuesBar){
        // infoCompletedGoalNumber.textContent = `${getValuesBar.infoCompletedGoal}`;
        // infoTotalGoalNumber.textContent = `${getValuesBar.infoTotalGoal}`;
        // infoPorcentCompleted.textContent = `${getValuesBar.infoPorcentCompletedBar}%`;

        // barCompletedGoal.style.width = `${getValuesBar.infoPorcentCompletedBar}%`;

        goalCompletedTotal = getValuesBar.infoCompletedGoal;
        totalGoals = getValuesBar.infoTotalGoal;
        porcentCompleted = getValuesBar.infoPorcentCompletedBar;
    }

    barCompletedGoal.style.width = `${porcentCompleted}%`;

    infoCompletedGoalNumber.textContent = `${goalCompletedTotal}`;
    infoTotalGoalNumber.textContent = `${totalGoals}`;
    infoPorcentCompleted.textContent = `${porcentCompleted}%`;

    const saveValuesBar = 
    {
        infoCompletedGoal: goalCompletedTotal,
        infoTotalGoal: totalGoals,
        infoPorcentCompletedBar: porcentCompleted,
    }

    localStorage.setItem('barCompletedGoalValues', JSON.stringify(saveValuesBar));
}

const containerButtonsGoal = document.querySelector('.js-containerButtonsGoal');
const containerButtonsGoalStorage = localStorage.getItem('containerButtonsGoal');

if(containerButtonsGoalStorage){
    containerButtonsGoal.innerHTML = containerButtonsGoalStorage;
}

function completedGoal(){

    getGoals.forEach((goal) => {
        const buttonCompleteGoal = document.querySelector(`.js-buttonCompleteGoal-${goal.id}`);
        const classButtonFinish = 'js-goalFinish';
        goal.completed++;

        goal.completedHour = dayjs().format('HH[:]mm[h]');

        if(goal.completed == goal.desiredFrequency){
            barCompletedGoals();
            buttonCompleteGoal.classList.add(classButtonFinish);

            const buttonsDisabled = document.querySelector('.js-goalFinish');
            buttonsDisabled.disabled = true;
        } else {
            barCompletedGoals();
        }
    });

}

function createInfoGoalCompleted(){

}

window.completedGoal = completedGoal;
// window.createInfoGoalCompleted = createInfoGoalCompleted;