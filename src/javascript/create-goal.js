let goals = [];

const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));

if(storedGoalsArray){
    goals = storedGoalsArray;
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
                completed: 1,
                completedHour: undefined,
            }
        );
    
        localStorage.setItem('goalsArray', JSON.stringify(goals));
        
        window.location.reload();

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