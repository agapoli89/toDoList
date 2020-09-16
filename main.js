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
    taskNumber.textContent = liElements.length;
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
    task.innerHTML = '<input type="checkbox">' + titleTask;
    toDoList.push(task);
    ul.appendChild(task);
    addInput.value = "";
    taskNumber.textContent = liElements.length;
    task.querySelector('input').addEventListener('click', removeTask);
}

//nasłuchiwanie na wykonanie pierwszego zadania
document.querySelectorAll('li input').forEach(item => item.addEventListener('click', removeTask));

//nasłuchiwanie na dodanie zadania
form.addEventListener('submit', addTask);
//nasłuchiwanie na wyszukiwanie
searchInput.addEventListener('input', searchTask);

taskNumber.textContent = liElements.length;