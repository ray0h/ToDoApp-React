import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useStore } from '../store-provider';

const AddTodoForm = ({ showTodoForm, toggleTodoForm }) => {
  const { dispatch } = useStore();
  const [ newItem, setNewItem ] = useState("");
  const [ newDueDate, setNewDueDate ] = useState(format(new Date(), "yyyy-MM-dd")); 
  const [ newPriority, setNewPriority ] = useState("none");

  const submitTodoForm = (event) => {
    event.preventDefault();
    
    let newTodo = {
      item: newItem,
      dueDate: newDueDate,
      complete: false,
      priority: newPriority
    }

    setNewItem("");
    setNewDueDate(format(new Date(), "yyyy-MM-dd"))
    setNewPriority("none");
    
    toggleTodoForm();
    dispatch({ type: 'ADD_TODO', newTodo });
  }

  return (
    <div>
      <form className={showTodoForm ? "new-todo-item" : "hidden new-todo-item"} id="newTodoForm" onSubmit={submitTodoForm}>
        <input 
          type="text"
          id="newItem"
          value={newItem}
          onChange={({target}) => setNewItem(target.value)}
        />
        <input 
          type="date" 
          id="newDueDate"
          value={newDueDate}
          onChange={({target}) => setNewDueDate(format(parseISO(target.value), "yyyy-MM-dd"))}
        />
        <select 
          id="newPriority"
          value={newPriority}
          onChange={({target}) => setNewPriority(target.value)}
        >
          <option value="none">none</option>
          <option value="high">high</option>
          <option value="med">med</option>
          <option value="low">low</option>
        </select>
        <button 
          type="submit"
          className="save-btn" 
        >
          save
        </button>
        <div 
          className="x-btn" 
          onClick={toggleTodoForm}
        >
          {'\u2612'}
        </div>
      </form>
    </div>
  )

}

export default AddTodoForm;