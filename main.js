const taskInput = document.getElementById('task_input');
const addTaskBtn = document.querySelector('#btn');

let list = [
  {
    todo: 'Go to the gym'
  },
  {
    todo: ' Read'
  },
  {
    todo: ' Code'
  }
];

const taskArea = document.getElementById('task_area');

function createTasksHTML() {
  taskArea.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    const taskText = list[i].todo;

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task');

    const taskPara = document.createElement('p');
    taskPara.innerText = taskText;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    taskContainer.appendChild(taskPara);
    taskContainer.appendChild(checkbox);

    taskArea.appendChild(taskContainer);
  }

  const checkBoxes = document.querySelectorAll('.checkbox');
  const taskList = document.querySelectorAll('.task');

  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener('change', () => {
      if (checkBoxes[i].checked) {
        taskList[i].style.backgroundColor = '#c4ebd4';
      } else {
        taskList[i].style.backgroundColor = 'unset';
      }
    })
  };
};

createTasksHTML();


addTaskBtn.addEventListener('click', () => {
    const newTask = taskInput.value;
    if (newTask === '') {
      document.getElementById('hidden').style.visibility = 'visible';
      taskInput.style.border = '2px solid #f7b4bb';
      return;
    } else {
      const newTaskObj = { todo: newTask };
      list.push(newTaskObj);
      createTasksHTML();
      taskInput.value = '';
    }
  });

taskInput.addEventListener('click', () => {
    taskInput.style.border = '';
    document.getElementById('hidden').style.visibility = 'hidden';
  });