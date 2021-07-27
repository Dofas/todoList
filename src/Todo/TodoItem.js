import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./TodoItem.css";
import Context from "../context";

function TodoItem({ todo, onChange }) {
  const { removeTodo } = useContext(Context);
  const { editTodo } = useContext(Context);
  const { editTextTodo } = useContext(Context);
  const { editingText } = useContext(Context);
  const { todoEditing } = useContext(Context);
  const { editTodoItem } = useContext(Context);

  // Shoto ne ponyatno
  const classes = [];

  if (todo.completed) {
    classes.push("done");
  }

  return (
    <div className="listItem">
      <li>
        {todoEditing === todo.id ? (
          <div>
            <input
              className="changedText"
              type="text"
              value={editingText}
              onChange={(e) => editTextTodo(e.target.value)}
            />
            <button onClick={() => editTodoItem(todo.id)}>Submit edit</button>
          </div>
        ) : (
          <div>
            <div className="">
            <span className={classes.join(" ")}>
              <input
                className="checkboxItem"
                checked={todo.completed}
                type="checkbox"
                onChange={() => onChange(todo.id)}
              />
              <span className="textTodo">{todo.title}</span>
            </span>
            </div>
            <button onClick={() => editTodo(todo.id)} className="editBtn">
              Edit
            </button>
          </div>
        )}
      </li>
      <div className="controllers">
        {/* або кол беком або через байнд щоб не повидалялось зразу */}
        <button onClick={removeTodo.bind(null, todo.id)}>Delete</button>
      </div>
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;
