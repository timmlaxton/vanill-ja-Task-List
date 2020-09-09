// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task 
  form.addEventListener('submit', addTask);
  // Remove task 
  taskList.addEventListener('click', removeTask);
  // Clear task 
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks 
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks LS
function getTasks() {
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){ 
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(task));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  })
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?, This action cannot be undone!')) {
      e.target.parentElement.parentElement.remove();

      // Remove task from local storage
      removeTaskFromLocalStorage
      (e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1)
      }
    });

    localStorage.setItem('task', JSON.stringify(tasks))
}


// Clear Tasks
function clearTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

   // Clear Tasks from Local Storage
   clearTasksFromLocalStorage();
}

  // Clear Tasks from Local Storage
  function clearTasksFromLocalStorage() {
    localStorage.clear();
  }

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}