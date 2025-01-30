import { saveTask } from "./fireStore.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("task-container");

window.addEventListener("DOMContentLoaded", () => {

});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("submitted");

  const taskTitle = taskForm("task-title");
  const taskDesc = taskForm("task-description");
  const taskPriority = taskForm("task-priority");

  saveTask(taskTitle.value, taskDesc.value, taskPriority.value);

  taskForm.reset();
});