import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ addTodo }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input);
    setInput('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;