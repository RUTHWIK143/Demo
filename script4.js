
const form       = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const dateInput  = document.getElementById('task-date');
const timeInput  = document.getElementById('task-time');
const listEl     = document.getElementById('task-list');
const emptyMsg   = document.getElementById('empty-msg');


let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');


function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  listEl.innerHTML = '';
  if (tasks.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }
  emptyMsg.style.display = 'none';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-action="toggle" data-index="${index}" />
      <div class="task-info">
        <span class="task-title">${task.title}</span>
        <small>${task.dueDate} ${task.dueTime}</small>
      </div>
      <div class="task-actions">
        <button title="Edit"    data-action="edit"    data-index="${index}" class="edit-btn">✏️</button>
        <button title="Delete"  data-action="delete"  data-index="${index}" class="delete-btn">🗑️</button>
      </div>
    `;
    listEl.appendChild(li);
  });
}


form.addEventListener('submit', e => {
  e.preventDefault();
  const newTask = {
    title:    titleInput.value.trim(),
    dueDate:  dateInput.value,
    dueTime:  timeInput.value,
    completed:false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  form.reset();
});


listEl.addEventListener('click', e => {
  const action = e.target.dataset.action;
  const idx    = +e.target.dataset.index;
  if (action === 'toggle') {
    tasks[idx].completed = e.target.checked;
    saveTasks();
    renderTasks();
  }
  if (action === 'delete') {
    if (confirm('Delete this task?')) {
      tasks.splice(idx, 1);
      saveTasks();
      renderTasks();
    }
  }
  if (action === 'edit') {
    
    const t = tasks[idx];
    titleInput.value = t.title;
    dateInput.value  = t.dueDate;
    timeInput.value  = t.dueTime;
    
    tasks.splice(idx, 1);
    saveTasks();
    renderTasks();
    titleInput.focus();
  }
});


renderTasks();
