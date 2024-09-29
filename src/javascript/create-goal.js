let goals = [];

function createGoal(event){
    event.preventDefault();

    window.inputTitleGoal = document.querySelector('.js-titleGoal');
    window.radioCheckedGoal = document.querySelector('.js-desiredFrequency:checked');

    if(inputTitleGoal.value && radioCheckedGoal.value){

        goals.push(
            {
                id: goals.length,
                title: inputTitleGoal.value,
                desiredFrequency: radioCheckedGoal.value,
                completed: 0,
                completedHour: dayjs().format('HH[:]mm'),
            }
        );
    
        localStorage.setItem('goalsArray', goals)
        
        window.location.reload();

    } else {

        const inputTitleGoal = document.querySelector('.js-titleGoal');
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

export default goals;