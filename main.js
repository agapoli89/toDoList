const storageTaskList = document.querySelector('.ulToStorage');

const getFromStorage = () => {
    const retrievedDiv = localStorage.getItem("storageTaskList");

    if (retrievedDiv !== null)
        storageTaskList.innerHTML = retrievedDiv;

    currentNumbers();
}


const btnAddPanel = document.querySelector('.icon-plus');
const btnSearchPanel = document.querySelector('.icon-search');
let taskList = [...document.querySelectorAll('li')];
//const ul = document.querySelector('.undone');
//const ulDone = document.querySelector('.done');
let liToDo = [...document.querySelectorAll('.undone li')];

const addPanel = () => {
    document.querySelector('.add-panel').classList.remove('visibility');

    document.querySelector('.add-panel .icon-plus').addEventListener('click', addTask);
    document.querySelector('.add-panel input').addEventListener('keyup', e => {
        if (e.key === 'Enter') {
            addTask();
        }
    })

    document.querySelector('.add-panel .icon-undo').addEventListener('click', () => {
        document.querySelector('.add-panel').classList.add('visibility');
    })
}

const addTask = () => {
    let newTask = document.querySelector('.add-panel input').value;

    if (!newTask) {
        alert('Wpisz zadanie');
        return;
    }
    const addLi = document.createElement('li');
    addLi.textContent = newTask;
    taskList.push(addLi);
    document.querySelector('.undone').appendChild(addLi);
    const img = document.createElement('img');
    img.src = 'img/bin.png';
    addLi.after(img);
    document.querySelector('.add-panel input').value = "";
    addLi.addEventListener('click', doneTask);
    img.addEventListener('click', removeTask);

    currentNumbers();
    storageFunction();
}

const doneTask = (e) => {
    const doneTask = e.target;
    doneTask.style.background = `url('img/checked.png') no-repeat 7px 4px`;
    const img = doneTask.nextElementSibling;
    const ulDone = document.querySelector('.done');
    ulDone.appendChild(doneTask);
    ulDone.appendChild(img);
    e.target.removeEventListener('click', doneTask);
    e.target.addEventListener('click', undoneTask);

    currentNumbers();
    storageFunction();
}

const removeTask = (e) => {
    e.target.previousElementSibling.remove();
    e.target.remove();

    currentNumbers();
    storageFunction();
}

const undoneTask = (e) => {
    const doneTask = e.target;
    doneTask.style.background = `url('img/unchecked.png') no-repeat 7px 4px`;
    const img = doneTask.nextElementSibling;
    const ul = document.querySelector('.undone');
    ul.appendChild(doneTask);
    ul.appendChild(img);
    e.target.removeEventListener('click', undoneTask);
    e.target.addEventListener('click', doneTask);

    currentNumbers();
    storageFunction();
}

const searchPanel = () => {
    document.querySelector('.search-panel').classList.remove('visibility');

    document.querySelector('.search-panel .icon-undo').addEventListener('click', () => {
        document.querySelector('.search-panel').classList.add('visibility');
    });

    document.querySelector('.search-panel input').addEventListener('input', searchTask);

}

const searchTask = (e) => {
    const searchTask = e.target.value.toLowerCase();
    let tasksList = [...document.querySelectorAll('li')];

    tasksList.forEach(task => {
        task.classList.add('invisible');
        task.nextElementSibling.classList.add('invisible');
    });

    tasksList = tasksList.filter(li => li.textContent.toLowerCase().includes(searchTask));

    tasksList.forEach(li => {
        li.classList.remove('invisible')
        li.nextElementSibling.classList.remove('invisible')
    });

    taskList = tasksList;
    document.querySelector('.all-tasks').textContent = taskList.length;

    const taskListToDo = taskList.filter(li => {
        return li.parentNode.classList.contains('undone')
    });
    document.querySelector('.to-do').textContent = taskListToDo.length;

    currentNumbers();
}

const currentNumbers = () => {
    const invisible = document.querySelectorAll('li.invisible').length;
    const invisibleUndone = document.querySelectorAll('.undone li.invisible').length;

    taskList = [...document.querySelectorAll('li')];
    document.querySelector('.all-tasks').textContent = taskList.length - invisible;

    liToDo = [...document.querySelectorAll('.undone li')];
    document.querySelector('.to-do').textContent = liToDo.length - invisibleUndone;
}

//storage
const storageFunction = () => {
    localStorage.setItem('storageTaskList', storageTaskList.innerHTML);

    if (taskList.length <= 0) localStorage.removeItem("storageTaskList");
}

getFromStorage();
btnAddPanel.addEventListener('click', addPanel);
document.querySelectorAll('li').forEach(item => item.addEventListener('click', doneTask));
document.querySelectorAll('img').forEach(item => item.addEventListener('click', removeTask));
btnSearchPanel.addEventListener('click', searchPanel);