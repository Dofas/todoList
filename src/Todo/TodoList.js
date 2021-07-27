import React from "react";
import "./TodoList.css";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

function TodoList(props) {
  return (
    <div>
      <ul className="todoList">
        {props.todos.map((todo) => {
          return (
            <TodoItem todo={todo} key={todo.id} onChange={props.onToggle} />
          );
        })}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoList;
