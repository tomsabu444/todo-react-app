import React, { useState, useEffect } from 'react';
import './App.css';
import { MdDelete } from 'react-icons/md';
import { LuCheckCircle } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ParticleBg from './Components/ParticleBg'

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  //notifiy
  const [completednotification, setcompletedNotification] = useState(null);
  const [editNotification, setEditNotification] = useState(null);
  const [deleteNotification, setDeleteNotification] = useState(null);

  //// reminder ~

  const [newReminder, setNewReminder] = useState(null);

  // New state for currently edited to-do item
  const [editingTodo, setEditingTodo] = useState(null);

  const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const compareReminders = (a, b) => {
    if (!a.reminder && !b.reminder) return 0;
    if (!a.reminder) return -1; // Move items without reminders to the end
    if (!b.reminder) return 1; // Move items without reminders to the end

    const reminderA = new Date(a.reminder);
    const reminderB = new Date(b.reminder);

    return reminderA - reminderB;
  };

  const sortedTodos = allTodos.slice().sort(compareReminders); // to sort according to reminder ~

  const handleAddNewToDo = () => {
    if (!newTodoTitle.trim()) {
      alert('Please enter a title for your To Do');
      return;
    }

    if (!newReminder) {
      alert('Please set a reminder for your To Do');
      return;
    }

    //

    let newToDoObj = {
      id: generateUniqueId(), // Add a unique id to each todo item
      title: newTodoTitle,
      description: newDescription,
      reminder: newReminder ? newReminder.toString() : null, //  //
    };


    if (editingTodo !== null) {
      // If editingTodo is not null, it means we are editing an existing to-do
      // Replace the old to-do with the edited one
      // let updatedTodoArr = [...allTodos];
      let updatedTodoArr = allTodos.map(todo => (todo.id === editingTodo.id ? newToDoObj : todo));
      updatedTodoArr[editingTodo] = newToDoObj;
      setAllTodos(updatedTodoArr);
      setEditingTodo(null); // Reset editing state after editing

      // Show a success notification for editing
      setEditNotification(`Task "${newTodoTitle}" edited successfully.`);
      setTimeout(() => setEditNotification(null), 3000); // Clear notification after 3 seconds

    } else {
      // If editingTodo is null, it means we are adding a new to-do
      let updatedTodoArr = [...allTodos, newToDoObj];
      setAllTodos(updatedTodoArr);
    }

    localStorage.setItem('todolist', JSON.stringify(allTodos));
    setNewDescription('');
    setNewTodoTitle('');
    setNewReminder(null);
  };

  const handleEdit = (index) => {
    // Set the editingTodo state to the index of the to-do being edited
    // setEditingTodo(index);
    setEditingTodo(allTodos[index]);

    // Retrieve the details of the to-do being edited
    const todoToEdit = allTodos[index];
    setNewTodoTitle(todoToEdit.title);
    setNewDescription(todoToEdit.description);
    setNewReminder(todoToEdit.reminder ? new Date(todoToEdit.reminder) : null);
  };

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedToDos = JSON.parse(
      localStorage.getItem('completedTodos')
    );
    if (savedTodos) {
      setAllTodos(savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos(savedCompletedToDos);
    }
  }, []);



  const handleToDoDelete = index => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice(index, 1);
    // console.log (index);

    // console.log (reducedTodos);
    localStorage.setItem('todolist', JSON.stringify(reducedTodos));
    setAllTodos(reducedTodos);

    // Show a success notification for deletion
    setDeleteNotification(`Task "${allTodos[index].title}" deleted successfully.`);
    setTimeout(() => setDeleteNotification(null), 3000); // Clear notification after 3 seconds
  };

  const handleCompletedTodoDelete = (index) => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice(index, 1);

    // console.log (reducedCompletedTodos);
    localStorage.setItem(
      'completedTodos',
      JSON.stringify(reducedCompletedTodos)
    );
    setCompletedTodos(reducedCompletedTodos);
  };

  const handleComplete = index => {
    const date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var hh = date.getHours();
    var minutes = date.getMinutes();
    var ss = date.getSeconds();
    var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;


    // Display a notification before completing the task
    const confirmCompletion = window.confirm(
      `Are you sure you want to mark "${allTodos[index].title}" as completed?`
    );

    if (confirmCompletion) {
      let filteredTodo = {
        ...allTodos[index],
        completedOn: finalDate,
      };

      // console.log (filteredTodo);

      let updatedCompletedList = [...completedTodos, filteredTodo];
      console.log(updatedCompletedList);
      setCompletedTodos(updatedCompletedList);
      localStorage.setItem(
        'completedTodos',
        JSON.stringify(updatedCompletedList)
      );
      // console.log (index);

      handleToDoDelete(index);

      // Show a success notification
      setcompletedNotification(`Task "${allTodos[index].title}" marked as completed.`);
      setTimeout(() => setcompletedNotification(null), 3000); // Clear notification after 3 seconds
    }
  };



  return (
    <>
       <ParticleBg/>
    <div className="App">
      <h1>My Todo's</h1>

      <div className="todo-wrapper">

        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:*</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle(e.target.value)}
              placeholder="What's the title of your To Do?"
              
              />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="What's the description of your To Do?"
              
              />
          </div>

          <div className="todo-input-item">
            <label>Reminder:*</label>
            <DatePicker
              selected={newReminder}
              onChange={date => setNewReminder(date)}
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
              onClick={handleAddNewToDo}>
              {editingTodo !== null ? 'Edit' : 'Add'}
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen(false)}
            >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen(true)}
            >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompletedScreen === false &&
            sortedTodos.map((item, index) => (
              <div className="todo-list-item" key={item.id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.reminder && (
                    <p>
                      <strong>Reminder:</strong>{' '}
                      {new Date(item.reminder).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </p>
                  )}
                </div>
                <div>
                  {/* Add an "Edit" button */}
                  <FaEdit
                    title='Edit?'
                    className="edit-icon"
                    onClick={() => handleEdit(index)}
                    />
                  <MdDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete(index)}
                    />
                  <LuCheckCircle
                    title="Completed?"
                    className=" check-icon"
                    onClick={() => handleComplete(index)}
                    />

                </div>
              </div>
            ))}


          {isCompletedScreen === true &&
            completedTodos.map((item, index) => (
              <div className="todo-list-item" key={item.id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p> <i>Completed on: {item.completedOn}</i></p>
                </div>
                <div>
                  <MdDelete
                    className="icon"
                    onClick={() => handleCompletedTodoDelete(index)}
                    />
                </div>
              </div>
            ))}
        </div>
      </div>


      {/* custom notification */}

      {completednotification && (
        <div className="notification-completed">
          {completednotification}
        </div>
      )}

      {editNotification && (
        <div className="notification-edited">
          {editNotification}
        </div>
      )}

      {deleteNotification && (
        <div className="notification-deleted">
          {deleteNotification}
        </div>
      )}

      <div className="maintenance-overlay">
        <p className="maintenance-message">We are currently under maintenance. Please check back later.</p>
      </div>



    </div>

      </>

  );
}

export default App;