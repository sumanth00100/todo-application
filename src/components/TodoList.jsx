import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, deleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </ul>
  );
}

export default TodoList;