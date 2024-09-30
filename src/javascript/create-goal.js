import barCompletedGoals from './completed-goal.js';

let goals = [];

const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));

if(storedGoalsArray){
    goals = storedGoalsArray;
}

function createButtonToCompleteGoal(){
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

function createGoal(event){
    event.preventDefault();

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

        const sectionInit = document.querySelector('.js-sectionInit');
        const classSectionActive = 'js-activeSection';

        if(sectionInit.classList.contains(classSectionActive)){
            barCompletedGoals();
            window.location.reload();
        } else {
            barCompletedGoals();
        }

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