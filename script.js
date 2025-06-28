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

  li.onclick = function () {
    li.classList.toggle("completed");
    updateRemoveButton(li);
    saveTasks();
  };

  let btn = document.createElement("button");
  btn.textContent = "حذف";
  btn.className = "remove-btn";

  btn.onclick = function (e) {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(btn);
  updateRemoveButton(li);
  document.getElementById("taskList").appendChild(li);
}

// نمایش یا مخفی کردن دکمه حذف
function updateRemoveButton(li) {
  let btn = li.querySelector("button");
  if (!btn) return;
  btn.style.display = li.classList.contains("completed") ? "inline-block" : "none";
}

// ذخیره لیست به localStorage (اگه بخوای حذفش کنی اینو کلش پاک کن)
function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      done: li.classList.contains("completed")
    });
  });
}

// بارگذاری اولیه (اینجا کاری نمی‌کنه چون localStorage خالیه)
function loadTasks() {
  let tasks = []; // هیچ‌چی لود نشه
  tasks.forEach(task => createTaskElement(task.text, task.done));
}
