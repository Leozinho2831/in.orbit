let goals = [];

const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));

if(storedGoalsArray){
    goals = storedGoalsArray;
}

function verifySection(){
    const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));

    if(storedGoalsArray){
        goals = storedGoalsArray;
    }

    const sectionGoal = document.querySelector('.js-sectionGoal');
    const sectionInit = document.querySelector('.js-sectionInit');
    const classSectionActive = 'js-activeSection';

    if(sectionGoal && sectionInit){
        if(!goals || !goals.length){
            sectionInit.classList.add(classSectionActive);
            sectionGoal.classList.remove(classSectionActive);
        } else {
            sectionGoal.classList.add(classSectionActive); 
            sectionInit.classList.remove(classSectionActive);
        }    
    }
}

verifySection();

function createButtonToCompleteGoal(){
    const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));

    if(storedGoalsArray){
        goals = storedGoalsArray;
    }

    const containerButtonsGoal = document.querySelector('.js-containerButtonsGoal');

    goals.forEach((goal) => {
        const verifyButtonExist = document.querySelector(`.js-buttonCompleteGoal-${goal.id}`);
        
        if(!verifyButtonExist){
            containerButtonsGoal.innerHTML = 
            `
                <button class="flex items-center gap-2 px-3 py-2 rounded-[3.625rem] bg-zinc-950 border border-dashed border-zinc-800 text-[0.875rem] leading-[1rem] text-zinc-300 tablet:text-[1rem] tablet:leading-[1.4rem] js-buttonCompleteGoal-${goal.id}" onclick="completedGoal()">
                    <img class="w-4 h-4 tablet:w-6 tablet:h-6" src="src/images/plus grey.svg" alt="sinal de mais">
                    <span>${goal.title}</span>
                </button>
            ` + containerButtonsGoal.innerHTML;
        }
    });

    localStorage.setItem('containerButtonsGoal', containerButtonsGoal.innerHTML);
}

const containerButtonsGoal = document.querySelector('.js-containerButtonsGoal');
const containerButtonsGoalStorage = localStorage.getItem('containerButtonsGoal');

if(containerButtonsGoalStorage){
    containerButtonsGoal.innerHTML = containerButtonsGoalStorage;
}

function barCompletedGoals(){
    const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));
    
    let totalGoals = 0;
    let totalGoalsCompleted = 0;

    if(storedGoalsArray){
        storedGoalsArray.forEach((goal) => {
            totalGoals += Number(goal.desiredFrequency);
            totalGoalsCompleted += Number(goal.completed);
        });
    }

    const porcentageCompletedCalc = 
    totalGoals > 0 ? Math.floor((totalGoalsCompleted * 100) / totalGoals) : 0;

    const barCompletedGoals = document.querySelector('.js-completedGoalBar');

    const infoCompletedGoals = document.querySelector('.js-completedGoalNumber');
    const infoTotalGoals = document.querySelector('.js-totalGoalNumber');
    const infoPorcentageCompletedGoals = document.querySelector('.js-percentageCompletedGoal');
    
    barCompletedGoals.style.width = `${porcentageCompletedCalc}%`;

    infoCompletedGoals.textContent = totalGoalsCompleted;
    infoTotalGoals.textContent = totalGoals;
    infoPorcentageCompletedGoals.textContent = `${porcentageCompletedCalc}%`;

    const saveValuesHeader = 
    {
        totalGoalsSave: totalGoals,
        totalGoalsCompletedSave: totalGoalsCompleted,
        porcetageCompletedSave: porcentageCompletedCalc,
    }

    localStorage.setItem('saveValuesHeader', saveValuesHeader);
}

barCompletedGoals();

window.barCompletedGoals = barCompletedGoals;

function completedGoal(){
    const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));

    if(storedGoalsArray){
        goals = storedGoalsArray;
    }

    goals.forEach((goal) => {
        const buttonToCompletedGoal = document.querySelector(`.js-buttonCompleteGoal-${goal.id}`);
        goal.completed++;

        localStorage.setItem('goalsArray', JSON.stringify(goals));
        
        if(goal.completed == goal.desiredFrequency){
            barCompletedGoals();
            buttonToCompletedGoal.disabled = true;

            localStorage.setItem('containerButtonsGoal', containerButtonsGoal.innerHTML);
        } else {
            barCompletedGoals();
        }
    });
}

window.completedGoal = completedGoal;

function createGoal(event){
    event.preventDefault();

    const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));

    if(storedGoalsArray){
        goals = storedGoalsArray;
    }

    const inputTitleGoal = document.querySelector('.js-titleGoal');
    const radioCheckedGoal = document.querySelector('.js-desiredFrequency:checked');

    if(inputTitleGoal.value && radioCheckedGoal.value){

        goals.push(
            {
                id: goals.length,
                title: inputTitleGoal.value,
                desiredFrequency: radioCheckedGoal.value,
                createGoalDate: dayjs().format('DD MM YYYY'),
                completed: 0,
                completedHour: undefined,
            }
        );

        localStorage.setItem('goalsArray', JSON.stringify(goals));

        createButtonToCompleteGoal();
        barCompletedGoals();
        verifySection();

    } else {

        const classInputRequired = 'js-required';

        const notificationRequired = document.querySelector('.js-notificationRequired');
        const classNotificationRequired = 'js-requiredText';

        function requiredInput(){
            inputTitleGoal.classList.add(classInputRequired);
            notificationRequired.classList.add(classNotificationRequired);

            // questão de estilo com tailwind, removendo margin para texto ficar junto com input e corrigit hover
            inputTitleGoal.classList.remove('mt-2');
            inputTitleGoal.classList.remove('hover:border-zinc-800');
        }

        requiredInput();

        inputTitleGoal.onclick = () => {
            inputTitleGoal.classList.remove(classInputRequired);
            notificationRequired.classList.remove(classNotificationRequired);

            // questão de estilo com tailwind, para não deixar o input junto ao label e corrigir o hover
            inputTitleGoal.classList.add('mt-2');
            inputTitleGoal.classList.add('hover:border-zinc-800');
        }

    }
}

window.createGoal = createGoal;