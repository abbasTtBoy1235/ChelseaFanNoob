
window.onload = function() {
  loadTasks();
};

function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value.trim();
  if (task === "") return;

  createTaskElement(task, false);
  input.value = "";
  saveTasks();
}

function createTaskElement(text, done) {
  let li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("completed");

  li.onclick = function() {
    li.classList.toggle("completed");
    updateRemoveButton(li);
    saveTasks();
  };

  let btn = document.createElement("button");
  btn.textContent = "حذف";
  btn.className = "remove-btn";
  btn.onclick = function(e) {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(btn);
  updateRemoveButton(li);

  document.getElementById("taskList").appendChild(li);
}

function updateRemoveButton(li) {
  let btn = li.querySelector("button");
  btn.style.display = li.classList.contains("completed") ? "inline-block" : "none";
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({ text: li.firstChild.textContent.trim(), done: li.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach(task => createTaskElement(task.text, task.done));
}
