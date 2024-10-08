import closeCreateGoal from './events-handlers.js';

// Determinar as datas no padrão brasileiro
dayjs.locale('pt-br');

// limpar storage todo primeiro dia da semana
let today = dayjs();
const month = dayjs().format('MM');
const year = dayjs().format('YYYY');

// por problemas da biblioteca, tive que colocar dia entre mes e ano para conseguir a data corretamente
const firstDayMonth = dayjs(`${month} 01 ${year}`);
const firstDayThirdWeek = dayjs(firstDayMonth).add(3, 'week').startOf('week');

const getAlreadyCleaning = JSON.parse(localStorage.getItem('cleaningStorage'));


function cleanStorage(){
    let alreadyHadCleaning = false;

    if(getAlreadyCleaning){
        alreadyHadCleaning = getAlreadyCleaning;
    }

    if(!alreadyHadCleaning){
        localStorage.removeItem('goalsArray');
        localStorage.removeItem('containerButtonsGoal');
        localStorage.removeItem('containerInfoCompletedGoal');

        alreadyHadCleaning = true;
        JSON.stringify(localStorage.setItem('cleaningStorage', alreadyHadCleaning));
    }
}

if(today.diff(firstDayThirdWeek, 'day') == 0){    
    cleanStorage();
} else if(firstDayThirdWeek.diff(today, 'day') == 6 && getAlreadyCleaning){
    localStorage.removeItem('cleaningStorage');
}

// determinar o texto do header
const firstDayOfWeek = dayjs().startOf('week');
const lastDayOfWeek = dayjs().endOf('week');

const getValueCleningBasic = JSON.parse(localStorage.getItem('cleaningBasic'));

function cleanStorageBasic(){
    let cleaningBasic = false;

    if(getValueCleningBasic){
        cleaningBasic = getValueCleningBasic;
    }
    
    if(!cleaningBasic){
        localStorage.removeItem('goalsArray');
        localStorage.removeItem('containerButtonsGoal');

        cleaningBasic = true;
    }

    JSON.stringify(localStorage.setItem('cleaningBasic', cleaningBasic));
}

cleanStorageBasic();

if(today.diff(firstDayOfWeek, 'days') == 0){
    localStorage.removeItem('cleaningBasic');

    cleanStorageBasic();
} else if
    (today.diff(firstDayOfWeek, 'days') > 0 && 
    today.diff(firstDayOfWeek, 'days') < 6 && 
    !getValueCleningBasic){

    cleanStorage();
} else if(today.diff(lastDayOfWeek, 'days') == 0){
    localStorage.removeItem('cleaningBasic');
}

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
                <button class="flex items-center gap-2 px-3 py-2 rounded-[3.625rem] bg-zinc-950 border border-dashed border-zinc-800 text-[0.875rem] leading-[1rem] text-zinc-300 tablet:text-[1rem] tablet:leading-[1.4rem] js-buttonCompleteGoal-${goal.id}" onclick="completedGoal(this);">
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

function addInfoCompletedGoal(event){
    const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));

    if(storedGoalsArray){
        goals = storedGoalsArray;
    }

    const completedDateTitle = dayjs().format('ddd[,] DD [de] MMM');    
    
    for(const goal of goals){        
        if(event.classList.contains(`js-buttonCompleteGoal-${goal.id}`)){
            const titleInfoCompletedGoal = document.querySelector(`.js-dateCompletedGoal-${goal.completedDate}`);

            if(titleInfoCompletedGoal){
                const firstCompletedGoalInfo = titleInfoCompletedGoal.parentElement.querySelector('figure');

                if(firstCompletedGoalInfo){
                    firstCompletedGoalInfo.insertAdjacentHTML('beforebegin', 
                    `
                    <figure class="flex items-center gap-2">
                        <img class="w-4 h-4 tablet:w-5 tablet:h-5" src="src/images/circle checked.svg" alt="círculo ativo">
                        <p class="text-[0.875rem] leading-[1.25rem] text-zinc-400 tablet:text-[1rem] tablet:leading-[1.4rem]">
                            Você completou 
                            “<span class="font-normal text-zinc-100">${goal.title}</span>”
                            às 
                            <span class="font-normal text-zinc-100">${goal.completedHour}</span>
                        </p>
                    </figure>
                    `);

                    break;
                } else {
                    titleInfoCompletedGoal.insertAdjacentHTML('afterend',
                    `
                    <figure class="flex items-center gap-2">
                        <img class="w-4 h-4 tablet:w-5 tablet:h-5" src="src/images/circle checked.svg" alt="círculo ativo">
                        <p class="text-[0.875rem] leading-[1.25rem] text-zinc-400 tablet:text-[1rem] tablet:leading-[1.4rem]">
                            Você completou 
                            “<span class="font-normal text-zinc-100">${goal.title}</span>”
                            às 
                            <span class="font-normal text-zinc-100">${goal.completedHour}</span>
                        </p>
                    </figure>
                    `);

                    break;
                }
            } else {
                containerInfoCompletedGoal.insertAdjacentHTML('afterbegin', 
                `
                <div class="flex flex-col justify-center gap-3 js-completeGoal-01-10-2023">
                    <h3 class="mb-1 first-letter:uppercase text-[1.2rem] leading-[1.5rem] text-zinc-50 tablet:text-[1.4rem] tablet:leading-[2rem] js-dateCompletedGoal-${goal.completedDate}">${completedDateTitle}</h3>
                
                    <figure class="flex items-center gap-2">
                        <img class="w-4 h-4 tablet:w-5 tablet:h-5" src="src/images/circle checked.svg" alt="círculo ativo">
                        <p class="text-[0.875rem] leading-[1.25rem] text-zinc-400 tablet:text-[1rem] tablet:leading-[1.4rem]">
                            Você completou 
                            “<span class="font-normal text-zinc-100">${goal.title}</span>”
                            às 
                            <span class="font-normal text-zinc-100">${goal.completedHour}</span>
                        </p>
                    </figure>
                </div>
                `);
    
                break;
            }
        }
    }

    localStorage.setItem('containerInfoCompletedGoal', containerInfoCompletedGoal.innerHTML);
    
    textNotCompletedGoal.style.display = 'none';
}

function completedGoal(event){    
    const storedGoalsArray = JSON.parse(localStorage.getItem('goalsArray'));
    
    if(storedGoalsArray){
        goals = storedGoalsArray;
    }
    
    for(const goal of goals){
        if(event.classList.contains(`js-buttonCompleteGoal-${goal.id}`)){

            goal.completed++;
            goal.completedDate = dayjs().format('DD-MM-YYYY');
            goal.completedHour = dayjs().format('HH:mm[h]');
    
            if(goal.completed == goal.desiredFrequency){
                const classButtonDisabled = 'js-goalFinish';

                event.disabled = true;
                event.classList.add(classButtonDisabled);

                localStorage.setItem('containerButtonsGoal', containerButtonsGoal.innerHTML);
            }

            localStorage.setItem('goalsArray', JSON.stringify(goals));
            
            barCompletedGoals();
            addInfoCompletedGoal(event);
            break;
        }
    }
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
                // +1 para id n ser 0
                id: goals.length + 1,
                title: inputTitleGoal.value,
                desiredFrequency: radioCheckedGoal.value,
                completed: 0,
                completedDate: '',
                completedHour: '',
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