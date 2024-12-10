const TASKSJSON = [
  {
    id: 1,
    title: "Clean dishes",
    priority: "low"
  },
  {
    id: 2,
    title: "Study JQuery",
    priority: "medium"
  }
];

$(() => { // Document ready shortcut
  let tasks = loadTasksFromLocalStorage();

  if (tasks.length === 0) {
    tasks = TASKSJSON;
    saveTasksFromLocalStorage(tasks);

  } else {
    console.log("Tasks autocargados" + tasks);
  }
  
  if (tasks.length != 0) {
    $.each(TASKSJSON, (index, task) => {
      appendTask(task);
    });

    $("#btn-add-task").on('click',() => {
      const taskTitle = $("#task-title").val().trim();
      const taskPriority = $("#task-priority").val();

      if (taskTitle) {
        let task = {
            title: taskTitle,
            priority: taskPriority
          }

        tasks.push(task);
        appendTask(task);
        saveTasksFromLocalStorage(tasks);
      } else {
        
      }

    });

  }
});

function appendTask(task) {
  $("#todo-list").append(`<li>${task.title} - Priority: ${task.priority}</li>`);
}

function loadTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || []; // si no hay nada, vacío
}

function saveTasksFromLocalStorage(tasks) {
  return localStorage.setItem("tasks", JSON.stringify(tasks));
}