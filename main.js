const taskInput = document.getElementById('task_input');
// const addTaskBtn = document.querySelector('#btn'); 
const taskArea = document.getElementById('task_area');
const clearAll = document.getElementById('clearAll');

let list = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(list));
};

function createTasksHTML() {
  taskArea.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    const taskText = list[i].title;
    const isTaskChecked = list[i].isChecked;
    const taskId = list[i].id;

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task');

    const taskPara = document.createElement('p');
    taskPara.innerText = taskText;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isTaskChecked;
    checkbox.id = taskId;
    checkbox.classList.add('checkbox');

    if (isTaskChecked) {
      taskContainer.style.backgroundColor = '#c4ebd4';
    }

    taskContainer.appendChild(taskPara);
    taskContainer.appendChild(checkbox);

    taskArea.appendChild(taskContainer);
  }

  const checkBoxes = document.querySelectorAll('.checkbox');
  const taskList = document.querySelectorAll('.task');

  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener('change', () => {
      const checkboxId = checkBoxes[i].id;
      const task = list.filter(item => item.id === parseInt(checkboxId))[0];

      if (checkBoxes[i].checked) {
        task.isChecked = true;
        taskList[i].style.backgroundColor = '#c4ebd4';
      } else {
        task.isChecked = false;
        taskList[i].style.backgroundColor = 'unset';
      }
      saveTasks();
    })
  };

  let lastChecked;

  function handleCheck(e) {
    let inBetween = false;
    if (e.shiftKey && this.checked) {
      checkBoxes.forEach(checkbox => {
        const task = list.filter(item => item.id === parseInt(checkbox.id));
        if (checkbox === this || checkbox === lastChecked) {
          inBetween = !inBetween;
          taskList.forEach(taskL => taskL.style.backgroundColor = '#c4ebd4');
        }
        if (inBetween) {
          checkbox.checked = true;
          task.isChecked = true;
        }
      });
      saveTasks();
    }
    lastChecked = this;
  }
  checkBoxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
};

createTasksHTML();

// addTaskBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const newTask = taskInput.value;
//   if (newTask === '') {
//     document.getElementById('hidden').style.visibility = 'visible';
//     taskInput.style.border = '2px solid #f7b4bb';
//     return;
//   } else {
//     const newTaskObj = { title: newTask, id: list.length, isDone: false };
//     list.push(newTaskObj);
//     createTasksHTML();
//     saveTasks();
//     taskInput.value = '';
//   }
// }); 


taskInput.addEventListener('click', () => {
  taskInput.style.border = '';
  document.getElementById('hidden').style.visibility = 'hidden';
});

window.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = taskInput.value;
  if (newTask === '') {
    document.getElementById('hidden').style.visibility = 'visible';
    taskInput.style.border = '2px solid #f7b4bb';
    return;
  } else {
    const newTaskObj = { title: newTask, id: list.length, isDone: false };
    list.push(newTaskObj);
    createTasksHTML();
    saveTasks();
    taskInput.value = '';
  }
});

clearAll.addEventListener('click', () => {
  localStorage.clear('tasks');
  taskArea.innerHTML = '';
  list = [];
});