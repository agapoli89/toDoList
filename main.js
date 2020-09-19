const toDoList = [];
const searchInput = document.querySelector('.search');
const ul = document.querySelector('ul');
const liElements = document.getElementsByClassName('task');
const form = document.querySelector('form');
const taskNumber = document.querySelector('h1 span');
const addInput = document.querySelector('form input');

//wyszukiwarka
const searchTask = (e) => {
    const searchText = e.target.value.toLowerCase();
    let tasks = [...liElements];
    tasks.forEach(task => task.classList.add('invisible'));
    tasks = tasks.filter(li => li.textContent.toLowerCase().includes(searchText));
    tasks.forEach(li => {
        ul.appendChild(li);
        li.classList.remove('invisible')
    });
    taskNumber.textContent = tasks.length;
}

// usuwanie wykonanych zadań
const removeTask = (e) => {

    e.target.parentNode.remove();
    const cookieTaskNumber = e.target.parentNode.dataset.number;
    taskNumber.textContent = liElements.length;

    document.cookie = "task" + cookieTaskNumber + "=; max-age=-1;";
}

// dodawanie zadania
const addTask = (e) => {
    e.preventDefault();
    const titleTask = addInput.value;
    if (titleTask === "") {
        alert('Dodaj zadanie');
        return;
    }
    const task = document.createElement('li');
    task.className = 'task';

    // cookie
    let dataNumber = 0;
    if (toDoList.length > 0) {
        dataNumber = toDoList[toDoList.length - 1].dataset.number;
    }
    dataNumber++;
    task.dataset.number = dataNumber;
    task.innerHTML = `<input type="checkbox">` + titleTask;
    toDoList.push(task);
    ul.appendChild(task);
    taskNumber.textContent = liElements.length;

    const cookieName = "task" + dataNumber;
    setCookie(cookieName, addInput.value);

    addInput.value = "";
    task.querySelector('input').addEventListener('click', removeTask);
}

//nasłuchiwanie na wykonanie pierwszego zadania
document.querySelectorAll('li input').forEach(item => item.addEventListener('click', removeTask));

//nasłuchiwanie na dodanie zadania
form.addEventListener('submit', addTask);
//nasłuchiwanie na wyszukiwanie
searchInput.addEventListener('input', searchTask);

taskNumber.textContent = liElements.length;

const setCookie = (name, val) => {
    if (navigator.cookieEnabled) { //czy ciasteczka są włączone
        const cookieName = encodeURIComponent(name);
        const cookieVal = encodeURIComponent(val);
        let cookieText = cookieName + "=" + cookieVal + "; max-age=604800";

        document.cookie = cookieText;
    }
}

const readCookie = () => {
    console.log('odczytuje ciasteczka');
    if (document.cookie === "") return;

    const cookies = document.cookie.split(/; */);
    console.log(cookies);

    for (let i = 0; i < cookies.length; i++) {
        const cookiePart = cookies[i].split("=");
        const cookieName = cookiePart[0];
        const cookieVal = cookiePart[1];

        if (cookieName.includes('task')) {
            const task = document.createElement('li');
            task.className = 'task';
            const dataNumber = cookieName.substr("task".length);
            task.dataset.number = dataNumber;
            task.innerHTML = `<input type="checkbox">` + cookieVal;
            toDoList.push(task);
            ul.appendChild(task);
            taskNumber.textContent = liElements.length;

            task.querySelector('input').addEventListener('click', removeTask);

        };
    }

};

readCookie();