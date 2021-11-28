const btnAdd = document.querySelector('#btn-add');
const btnClear = document.querySelector('#clear');
const inputTask = document.querySelector('#task');
const inputFilter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');

const displayTask = (task) => {
  const html = `<li>${task}<a class="close"><i class="fa fa-remove"></i></a></li>`;
  const link = ``;
  taskList.insertAdjacentHTML('afterbegin', html);
};

updateTasks();
function updateTasks(input) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (input) {
    tasks.push(input);
  }
  inputTask.value = '';
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    displayTask(task);
  });
  return tasks;
}

function removeTask(task) {
  let taskList = JSON.parse(localStorage.getItem('tasks'));
  const index = taskList.findIndex((el) => el === task);
  taskList.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  updateTasks();
}

function addTask(e) {
  const input = inputTask.value.trim();

  if (!input) return;

  const tasks = updateTasks(input);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  localStorage.setItem('tasks', JSON.stringify([]));
  taskList.innerHTML = '';
}

function filterTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const input = inputFilter.value.trim().toLowerCase();

  if (!tasks) return;
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    if (task.toLowerCase().includes(input)) {
      displayTask(task);
    }
  });
}

btnAdd.addEventListener('click', addTask);
window.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});
btnClear.addEventListener('click', clearTasks);
inputFilter.addEventListener('input', filterTasks);

taskList.addEventListener('click', function (e) {
  const current = e.target;
  if (current.classList.contains('fa')) {
    // console.log(current.closest('li').textContent);
    // current.closest('li').remove();
    // removeTask(current.closest('li').textContent);
  }
  if (current.classList.contains('fa')) {
    current.closest('li').classList.add('done');
    current.classList.remove('fa-remove');
    current.classList.add('fa-check');
    current.style.color = 'green';

    setTimeout(function () {
      removeTask(current.closest('li').textContent);
    }, 1000);
  }
});
