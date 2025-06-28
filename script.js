function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  const category = document.getElementById("categorySelect").value;

  if (text === "") return;

  createTaskElement(text, category, false);
  input.value = "";
  updateTaskCounts();
}

function createTaskElement(text, category, done) {
  const li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("completed");

  li.onclick = function () {
    li.classList.toggle("completed");
    updateRemoveButton(li);
  };

  const btn = document.createElement("button");
  btn.textContent = "حذف";
  btn.className = "remove-btn";
  btn.onclick = function (e) {
    e.stopPropagation();
    li.remove();
    updateTaskCounts();
  };

  li.appendChild(btn);
  updateRemoveButton(li);

  const ul = document.querySelector(`#${category}Tasks ul`);
  ul.appendChild(li);
}

function updateRemoveButton(li) {
  const btn = li.querySelector("button");
  if (!btn) return;
  btn.style.display = li.classList.contains("completed") ? "inline-block" : "none";
}

document.getElementById("toggle-theme").addEventListener("click", function () {
  document.body.classList.toggle("dark");
  this.textContent = document.body.classList.contains("dark") ? "☀️ حالت روز" : "🌙 حالت شب";
});

function updateTaskCounts() {
  const categories = ['study', 'work', 'personal'];
  categories.forEach(cat => {
    const count = document.querySelector(`#${cat}Tasks ul`).children.length;
    document.getElementById(`count-${cat}`).textContent = count;
  });
}
