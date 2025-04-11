import React, { useState } from "react";

const ToDoList = () => {
  const [tasksList, setTasksList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTask = () => {
    if (inputValue.trim() === "") return;
    setTasksList([...tasksList, inputValue]);
    setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDeleteData = (indexToDelete) => {
    const newTasksList = tasksList.filter(
      (_, index) => index !== indexToDelete
    );
    setTasksList(newTasksList);
  };

  return (
    <>
      <h1>Your To do list!!!</h1>
      <div>
        <input
          value={inputValue}
          onChange={handleChange}
          type="text"
          placeholder="Your task"
        />
        <button onClick={addTask}>Add new task</button>
      </div>
      <ul>
        <ItemList taskList={tasksList} onSendData={handleDeleteData} />
      </ul>
    </>
  );
};

const ItemList = ({ taskList, onSendData }) => {
  return (
    <>
      {taskList.map((element, index) => (
        <Item key={index} task={element} deleteItem={() => onSendData(index)} />
      ))}
    </>
  );
};

const Item = ({ task, deleteItem }) => {
  const [textDecor, setTextDecor] = useState("");

  const toggleTextDecor = () => {
    setTextDecor((prev) => (prev === "line-through" ? "" : "line-through"));
  };

  return (
    <li style={{ textDecoration: textDecor }} onClick={toggleTextDecor}>
      {task}
      <button onClick={deleteItem}>x</button>
    </li>
  );
};

export default ToDoList;
