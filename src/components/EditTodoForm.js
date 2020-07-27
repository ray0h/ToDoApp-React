import React, { useState, useEffect } from 'react';
import { useStore } from '../store-provider';
import { format, parseISO } from 'date-fns';

const EditTodoForm = ({ index, todo, showEditForm, toggleEditForm }) => {
  const { dispatch } = useStore();
  const [ itemEdit, setItemEdit ] = useState(todo.item);
  const [ dueDateEdit, setDueDateEdit ] = useState(format(parseISO(todo.dueDate), "yyyy-MM-dd"));
  const [ priorityEdit, setPriorityEdit ] = useState(todo.priority);

  // refresh form values when project/todos change
  useEffect(()=> {
    setItemEdit(todo.item);
    setDueDateEdit(format(parseISO(todo.dueDate), "yyyy-MM-dd"));
    setPriorityEdit(todo.priority);
  }, [todo])

  const submitEdit = (event) => {
    event.preventDefault();
    let index = parseInt(event.target.id.match(/\d+/));
    let editTodo = {
      item: itemEdit,
      dueDate: dueDateEdit,
      complete: todo.complete,
      priority: priorityEdit
    };

    toggleEditForm(event);
    dispatch({ type: 'EDIT_TODO', editTodo, index });
  }

  return (
    <form 
      id={"editForm"+index} onSubmit={submitEdit}
      className={showEditForm === "editForm"+index ? "new-todo-item" : "new-todo-item hidden"} 
    >
      <input 
        type="text"
        id={"itemEdit"+index}
        value={itemEdit}
        onChange={({target}) => setItemEdit(target.value)}
      />
      <input 
        type="date"
        id={"dueDateEdit"+index}
        value={dueDateEdit}
        onChange={({target}) => setDueDateEdit(format(parseISO(target.value), "yyyy-MM-dd"))}
      />
      <select 
        id={"priorityEdit"+index} 
        value={priorityEdit}
        onChange={({target}) => setPriorityEdit(target.value)}
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
        onClick={toggleEditForm}
      >
        {'\u2612'}
      </div>
    </form>
  )
}

export default EditTodoForm;