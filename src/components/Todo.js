import React from 'react';
import { useStore } from '../store-provider';
import { format, parseISO } from 'date-fns';

const Todo = ({ todo, index, showEditForm, toggleEditForm }) => {
  const { dispatch } = useStore();

  return (
    <div 
      id={"todo-item"+index}
      className={parseInt(showEditForm.match(/\d+/)) === index ? "todo-item hidden" : "todo-item"} 
    >
      <div className={todo.complete ? "complete" : ""}>
        {todo.item}
      </div>
      <div className={todo.complete ? "complete" : ""}>
        {format(parseISO(todo.dueDate), "MM/dd/yyyy")}
      </div>
      <div className={todo.complete ? "complete" : ""}>
        {todo.priority}
      </div>
      <input 
        type="checkbox" 
        id={"check"+index} 
        checked={todo.complete} 
        onChange={() => dispatch({type: 'UPDATE_COMPLETE', index})}
      />
      <div 
        id={"edit"+index} 
        className="edit-btn" 
        onClick={toggleEditForm}
      >
        {'\u270D'}
      </div>
      <div 
        className="x-btn" 
        onClick={() => dispatch({ type: 'DEL_TODO', index })}
      >
        {'\u2612'}
      </div>
    </div>
  )
};

export default Todo;