import React, { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Typography } from '@material-ui/core';

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
  const [todos, setTodos]= useState([]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(todo) {
    setTodos([todo,...todos]);
  }
  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  return (
    <div className="App" style={{backgroundColor: "#bfbaf8"}}>
      <Typography variant="h2">✨TODO✨</Typography>
      <Typography style={{ padding: 6}} variant="h6">by Dasha</Typography>
      <TodoForm addTodo={addTodo}/>
      <TodoList 
        todos={todos} 
        toggleComplete={toggleComplete} 
        removeTodo={removeTodo}
        />
    </div>
  );
}

export default App;
