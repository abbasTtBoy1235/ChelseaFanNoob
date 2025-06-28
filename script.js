window.onload = function() {
  loadTasks();
};

// افزودن تسک جدید
function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value.trim();
  if (task === "") return;

  createTaskElement(task, false);
  input.value = "";
  saveTasks();
}

// ساخت عنصر لیست برای هر تسک
function createTaskElement(text, done) {
  let li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("completed");

  // تیک زدن یا برداشتن با کلیک
  li.onclick = function () {
    li.classList.toggle("completed");
    updateRemoveButton(li);
    saveTasks();
  };

  // دکمه حذف
  let btn = document.createElement("button");
  btn.textContent = "حذف";
  btn.className = "remove-btn";

  // حذف فقط وقتی روی دکمه کلیک شه (نه خود لیست)
  btn.onclick = function (e) {
    e.stopPropagation(); // جلوگیری از تیک خوردن
    li.remove();
    saveTasks();
  };

  li.appendChild(btn);
  updateRemoveButton(li);
  document.getElementById("taskList").appendChild(li);
}

// نمایش یا مخفی‌کردن دکمه حذف
function updateRemoveButton(li) {
  let btn = li.querySelector("button");
  if (!btn) return;
  btn.style.display = li.classList.contains("completed") ? "inline-block" : "none";
}

// ذخیره لیست به localStorage
function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      done: li.classList.contains("completed")
    });
  

// بارگذاری از localStorage
function loadTasks() {
  let tasks = [];
  tasks.forEach(task => createTaskElement(task.text, task.done));
}
