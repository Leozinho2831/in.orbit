import closeCreateGoal from './events-handlers.js';

// Determinar as datas no padrão brasileiro
dayjs.locale('pt-br');

// limpar storage todo primeiro dia da semana
const today = dayjs();
const month = dayjs().format('MM');
const year = dayjs().format('YYYY');

// por problemas da biblioteca, tive que colocar dia entre mes e ano para conseguir a data corretamente
const firstDayMonth = dayjs(`${month} 01 ${year}`);
const firstDaySecondWeek = dayjs(firstDayMonth).add(2, 'week').startOf('week');

function cleanStorage(){
    let alreadyHadCleaning = false;

    const getAlreadyCleaning = localStorage.getItem('cleaningStorage');

    if(getAlreadyCleaning){
        alreadyHadCleaning = getAlreadyCleaning;
    }

    if(alreadyHadCleaning){
        return;
    } else {
        localStorage.removeItem('goalsArray');
        localStorage.removeItem('containerButtonsGoal');
        localStorage.removeItem('containerButtonsGoal');
    }

    JSON.stringify(localStorage.setItem('cleaningStorage', alreadyHadCleaning));
}

if(firstDaySecondWeek.diff(today, 'day') == 0){
    let storagedCleaningValue = JSON.parse(localStorage.getItem('cleaningStorage'));
    storagedCleaningValue = true;
    JSON.stringify(localStorage.setItem('cleaningStorage', storagedCleaningValue));
    cleanStorage();
}

// determinar o texto do header
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
}

barCompletedGoals();

window.barCompletedGoals = barCompletedGoals;

const containerInfoCompletedGoal = document.querySelector('.js-containerInfoCompletedGoal');
const textNotCompletedGoal = document.querySelector('.js-notCompletedGoal');

const storagedContainerInfoCompletedGoal = 
localStorage.getItem('containerInfoCompletedGoal');

if(storagedContainerInfoCompletedGoal){
    containerInfoCompletedGoal.innerHTML = storagedContainerInfoCompletedGoal;

    textNotCompletedGoal.style.display = 'none';
}

function addInfoCompletedGoal(){
    const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));

    if(storedGoalsArray){
        goals = storedGoalsArray;
    }

    const completedDateTitle = dayjs().format('ddd[,] DD [de] MMM');
    
    goals.forEach((goal) => {
        const titleInfoCompletedGoal = document.querySelector(`.js-dateCompletedGoal-${goal.completedDate}`);

        if(titleInfoCompletedGoal){
            containerInfoCompletedGoal.innerHTML += 
            `
            <figure class="flex items-center gap-2">
                <img class="w-4 h-4 tablet:w-5 tablet:h-5" src="src/images/circle checked.svg" alt="círculo ativo">
                <p class="text-[0.875rem] leading-[1.25rem] text-zinc-400 tablet:text-[1rem] tablet:leading-[1.4rem]">
                    Você completou 
                    “<span class="font-normal text-zinc-100 js-titleGoalCompleted-0">${goal.title}</span>”
                    às 
                    <span class="font-normal text-zinc-100 js-completedInfoHour-0">${goal.completedHour}</span>
                </p>
            </figure>
            `;
        } else {
            containerInfoCompletedGoal.innerHTML = 
            `
            <div class="flex flex-col justify-center gap-3 js-completeGoal-01-10-2023">
                <h3 class="mb-1 first-letter:uppercase text-[1.2rem] leading-[1.5rem] text-zinc-50 tablet:text-[1.4rem] tablet:leading-[2rem] js-dateCompletedGoal-${goal.completedDate}">${completedDateTitle}</h3>
            
                <figure class="flex items-center gap-2">
                    <img class="w-4 h-4 tablet:w-5 tablet:h-5" src="src/images/circle checked.svg" alt="círculo ativo">
                    <p class="text-[0.875rem] leading-[1.25rem] text-zinc-400 tablet:text-[1rem] tablet:leading-[1.4rem]">
                        Você completou 
                        “<span class="font-normal text-zinc-100 js-titleGoalCompleted-0">${goal.title}</span>”
                        às 
                        <span class="font-normal text-zinc-100 js-completedInfoHour-0">${goal.completedHour}</span>
                    </p>
                </figure>
            </div>
            ` + containerInfoCompletedGoal.innerHTML;
        }

        localStorage.setItem('containerInfoCompletedGoal', containerInfoCompletedGoal.innerHTML);
    });
    
    textNotCompletedGoal.style.display = 'none';
}

function completedGoal(){
    const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));

    if(storedGoalsArray){
        goals = storedGoalsArray;
    }

    goals.forEach((goal) => {
        const buttonToCompletedGoal = document.querySelector(`.js-buttonCompleteGoal-${goal.id}`);
        const classButtonDisabled = 'js-goalFinish';

        goal.completed++;
        goal.completedDate = dayjs().format('DD-MM-YYYY');
        goal.completedHour = dayjs().format('HH:mm[h]');

        localStorage.setItem('goalsArray', JSON.stringify(goals));
        
        if(goal.completed == goal.desiredFrequency){
            barCompletedGoals();
            buttonToCompletedGoal.disabled = true;
            buttonToCompletedGoal.classList.add(classButtonDisabled);

            localStorage.setItem('containerButtonsGoal', containerButtonsGoal.innerHTML);

            addInfoCompletedGoal();
        } else {
            barCompletedGoals();

            addInfoCompletedGoal();
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
                completed: 0,
                completedDate: undefined,
                completedHour: undefined,
            }
        );

        localStorage.setItem('goalsArray', JSON.stringify(goals));

        inputTitleGoal.value = '';

        closeCreateGoal();
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