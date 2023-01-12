const form = document.querySelector('#add-task-form');
const taskList = document.querySelector('#todo');

setupButtons();
displayTasks();

form.addEventListener('submit', event => {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;

  document.getElementById("add-task-form").reset();

  const task = {
    title: title,
    description: description,
  };

  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then(response => response.json())
    .then(task => {
      const taskItem = createItem(task);
      addClickEvent(taskItem);
      taskList.appendChild(taskItem);
    });
});

function createItem(task) {
  const taskItem = document.createElement('li');

  const taskTitle = document.createElement('div');
  taskTitle.id = 'task-title';
  taskTitle.textContent = task.title;

  const timeAgo = document.createElement('div');
  timeAgo.id = 'time-ago';
  timeAgo.textContent = "now";

  const taskDescription = document.createElement('div');
  taskDescription.id = 'task-description';
  taskDescription.textContent = task.description;

  const user = document.createElement('div');
  user.id = 'user';
  user.textContent = "user";

  taskItem.appendChild(taskTitle);
  taskItem.appendChild(timeAgo);
  taskItem.appendChild(taskDescription);
  taskItem.appendChild(user);
  taskItem.classList.add("task");
  addClickEvent(taskItem);

  return taskItem;
}

function addClickEvent(item) {
  item.addEventListener("click", function () {
    if (item.classList.contains("selected")) {
      this.classList.remove("selected");
    }
    clearSelected();
    this.classList.add("selected");
  });
}

function clearSelected() {
  const tab = document.querySelectorAll("ul");
  for (let i = 0; i < 2; i++) {
    const items = tab[i].querySelectorAll(".task");
    items.forEach(function (item) {
      item.classList.remove("selected");
    })
  }
}

function updateTask(status) {
  let selectedTask;
  let update = {};
  if (status === 'in-progress') {
    selectedTask = document.querySelector("#todo .selected");
    update = {
      isInProgress: true,
      completed: false,
    };
  } else if (status === 'done') {
    selectedTask = document.querySelector("#in-progress .selected");
    update = {
      isInProgress: false,
      completed: true,
    };
  }

  const title = selectedTask.querySelector("#task-title").innerHTML;
  const description = selectedTask.querySelector("#task-description").innerHTML;
  update = {
    title: title,
    description: description,
    ...update,
  };

  fetch('/tasks', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  })
    .then(response => response.json());
  return selectedTask;
}

function setupButtons() {
  document.getElementById("in-progress-btn")
    .addEventListener("click", moveTask.bind(this, "in-progress"));
  document.getElementById(`done-btn`).addEventListener("click", moveTask.bind(this, "done"));
}

function moveTask(status) {
  const selectedTask = updateTask(status);
  if (selectedTask) {
    selectedTask.classList.remove("selected");
    document.getElementById(status).appendChild(selectedTask);
  }
}

function displayTasks() {
  fetch("/tasks", {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .then(data => {
      const tasks = data;
      const todoList = document.querySelector("#todo");
      const isInProgressList = document.querySelector("#in-progress");
      const completedList = document.querySelector("#done");

      tasks.forEach(task => {
        const taskItem = createItem(task)
        console.log(taskItem.id);
        taskItem.classList.add("task");
        if (task.isInProgress) {
          isInProgressList.appendChild(taskItem);
        }
        else if (task.completed) {
          completedList.appendChild(taskItem);
        }
        else {
          todoList.appendChild(taskItem);
        }
      });
    });
}
