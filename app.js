document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks(); 
        }
    });

    function addTask(text, completed = false) {
        const li = document.createElement('li');
        li.className = 'task-item';

        const span = document.createElement('span');
        span.textContent = text;
        if (completed) span.classList.add('completed');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✔️';
        completeBtn.addEventListener('click', () => {
            span.classList.toggle('completed');
            saveTasks(); 
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks(); 
        });

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(li => {
            const text = li.querySelector('span').textContent;
            const completed = li.querySelector('span').classList.contains('completed');
            tasks.push({ text, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }

    const filterButtons = document.querySelectorAll('#filter button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            applyFilter(filter);
        });
    });

    function applyFilter(filter) {
        const tasks = document.querySelectorAll('#task-list .task-item');
        tasks.forEach(task => {
            const isCompleted = task.querySelector('span').classList.contains('completed');
            if (filter === 'all') {
                task.style.display = 'flex';
            } else if (filter === 'completed') {
                task.style.display = isCompleted ? 'flex' : 'none';
            } else if (filter === 'pending') {
                task.style.display = !isCompleted ? 'flex' : 'none';
            }
        });
    }

});
