document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(text) {
        const li = document.createElement('li');
        li.className = 'task-item';

        const span = document.createElement('span');
        span.textContent = text;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✔️';
        completeBtn.addEventListener('click', () => {
            span.classList.toggle('completed');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
});

