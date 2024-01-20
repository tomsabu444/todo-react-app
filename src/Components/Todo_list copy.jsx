import React, { useState } from "react";
import "../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function todo_list() {
  const [NewTodoTitle, setNewTodoTitle] = useState();
  const handleTitleChange = (e) => {
    setNewTodoTitle(e.target.value);
  };

  const [NewDescription, setNewDescription] = useState();
  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const [NewReminder, setNewReminder] = useState();
  const handleReminderChange = (date) => {
    setNewReminder(date || null);
  };

  const handleAddNewTodo = () => {
    
  }

  return (
    <div className="App">
      <h1>My Todo's</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="Title">Title :*</label>
            <input
              type="text"
              value={NewTodoTitle}
              onChange={handleTitleChange}
              placeholder="What's the title of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label htmlFor="Description">Description :*</label>
            <input
              type="text"
              value={NewDescription}
              onChange={handleDescriptionChange}
              placeholder="What's the description of your To Do?"
            />
          </div>

          <div className="todo-input-item">
            <label>Reminder:*</label>
            <DatePicker
              selected={NewReminder}
              onChange={handleReminderChange}
              showTimeSelect
              timeFormat="h:mm a"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select a reminder date and time"
            />
          </div>

          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewToDo}
            >
              {editingTodo !== null ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default todo_list;
