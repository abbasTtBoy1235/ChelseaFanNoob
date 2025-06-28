// Add new task
function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value.trim();
  let category = document.getElementById("categorySelect").value;

  if (task === "") return;

  createTaskElement(task, category, false);
  input.value = "";
}

// Create task item
function createTaskElement(text, category, done) {
  let li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("completed");

  // Category tag
  let catSpan = document.createElement("span");
  catSpan.className = "category " + category;
  catSpan.textContent = category;
  li.prepend(catSpan);

  // Toggle complete
  li.onclick = function () {
    li.classList.toggle("completed");
    updateRemoveButton(li);
  };

  // Remove button
  let btn = document.createElement("button");
  btn.textContent = "حذف";
  btn.className = "remove-btn";
  btn.onclick = function (e) {
    e.stopPropagation();
    li.remove();
  };

  li.appendChild(btn);
  updateRemoveButton(li);
  document.getElementById("taskList").appendChild(li);
}

// Show/hide remove button
function updateRemoveButton(li) {
  let btn = li.querySelector("button");
  if (!btn) return;
  btn.style.display = li.classList.contains("completed") ? "inline-block" : "none";
}

// Theme toggle
document.getElementById("toggle-theme").addEventListener("click", function () {
  document.body.classList.toggle("dark");
  this.textContent = document.body.classList.contains("dark") ? "☀️ حالت روز" : "🌙 حالت شب";
});
