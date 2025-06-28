// اجرای اولیه
window.onload = function() {
  // اینجا چیزی لود نمی‌کنیم چون localStorage استفاده نمی‌شه
};

// افزودن تسک جدید
function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value.trim();
  if (task === "") return;

  createTaskElement(task, false);
  input.value = "";
}

// ساخت تسک در DOM
function createTaskElement(text, done) {
  let li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("completed");

  li.onclick = function () {
    li.classList.toggle("completed");
    updateRemoveButton(li);
  };

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

// نمایش یا مخفی کردن دکمه حذف
function updateRemoveButton(li) {
  let btn = li.querySelector("button");
  if (!btn) return;
  btn.style.display = li.classList.contains("completed") ? "inline-block" : "none";
}
