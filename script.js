
window.onload = function() {
  loadTasks();
};

function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value.trim();
  if (task === "") return;

  let li = document.createElement("li");
  li.textContent = task;
  li.onclick = function() {
    li.classList.toggle("completed");
    saveTasks();
  };
  li.ondblclick = function() {
    li.remove();
    saveTasks();
  };

  document.getElementById("taskList").appendChild(li);
  input.value = "";
  saveTasks();
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({ text: li.textContent, done: li.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach(task => {
    let li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("completed");
    li.onclick = function() {
      li.classList.toggle("completed");
      saveTasks();
    };
    li.ondblclick = function() {
      li.remove();
      saveTasks();
    };
    document.getElementById("taskList").appendChild(li);
  });
}
