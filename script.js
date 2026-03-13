document.addEventListener('DOMContentLoaded', function() {
  const inputEl = document.getElementById('todo-input');
  const addButton = document.getElementById('add-todo-button');
  const todoListEl = document.getElementById('todo-list');

  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
      addTodoToDOM(todo);
    });
  }

  function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
  }

  function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = todo.text;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', function() {
      todo.completed = !todo.completed;
      li.className = todo.completed ? 'completed' : '';
      saveTodos(getTodos().map(t => (t.text === todo.text ? todo : t)));
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      li.remove();
      saveTodos(getTodos().filter(t => t.text !== todo.text));
    });

    li.appendChild(span);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    todoListEl.appendChild(li);
  }

  addButton.addEventListener('click', function() {
    const todoText = inputEl.value.trim();
    if (todoText) {
      const newTodo = { text: todoText, completed: false };
      addTodoToDOM(newTodo);

      const todos = getTodos();
      todos.push(newTodo);
      saveTodos(todos);
      
      inputEl.value = '';
    }
  });

  loadTodos();
});