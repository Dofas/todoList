import React, { useState } from "react";
import "./AddTodo.css";
import PropTypes from "prop-types";

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (e) => setValue(e.target.value),
    },
    // value:value
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  const input = useInputValue("");

  function submitHandler(e) {
    // щоб не обновляло сторінку
    e.preventDefault();
    // якщо не пуста строка то визивається ф-ція
    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }

  return (
    <form className="formInput" onSubmit={submitHandler}>
      <input {...input.bind} />
      <button className="addBtn" type="submit">
        Add
      </button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
