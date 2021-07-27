import React, { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";
import CX from 'classnames';

function App() {
  const [todos, setTodos] = useState([]);

  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [choose, setChoose] = useState(0);
  const [updTodos, setUpdTodos] = useState([]);

  // міняє чекбокс в самому масиві

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  // видаляє якщо ід збігається

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // додає новий елемент

  function addTodo(title) {
    //або через ...
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  // хуй знає кароче вже запутався

  function editTodo(id) {
    setTodoEditing(id);
  }

  // текст який міняєм

  function editTextTodo(value) {
    setEditingText(value);
  }

  // добавляєм в наш масив то шо поміняли

  function editTodoItem(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.title = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  useEffect(() => {
    if (choose === 1) {
      setUpdTodos(todos);
    }

    if (choose === 2) {
      const completedTodos = todos.filter((todo) => todo.completed !== true);
      setUpdTodos(completedTodos);
    }

    if (choose === 3) {
      const completedTodos = todos.filter((todo) => todo.completed !== false);
      setUpdTodos(completedTodos);
    }
  }, [choose]);


  return (
    <Context.Provider
      value={{
        removeTodo,
        editTodo,
        editTextTodo,
        editingText,
        todoEditing,
        editTodoItem,
      }}
    >
      <div className="container">
        <div className="header">What need's to be done?</div>
        <AddTodo onCreate={addTodo} />
        <div className="showbtns">
          <button className={CX({'redButton': choose ===1})} onClick={() => setChoose(1)}>Show all tasks</button>
          <button className={CX({'redButton': choose ===2})} onClick={() => setChoose(2)}>Show active tasks</button>
          <button className={CX({'redButton': choose ===3})} onClick={() => setChoose(3)}>Show completed tasks</button>
        </div>
        <div>
          <TodoList todos={updTodos} onToggle={toggleTodo} />
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
