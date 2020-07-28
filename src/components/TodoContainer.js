import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import AddTodoForm from './AddTodoForm';
import EditTodoForm from './EditTodoForm';

const TodoContainer = ({ project }) => {
  
  const [ showProject, setShowProject ] = useState(project.todos);
  const [ priority, setPriority ] = useState("all");
  const [ showEditForm, setShowEditForm ] = useState("");
  const [ showTodoForm, setShowTodoForm ] = useState(false);

  useEffect(() => {
    if (priority !== "all" && priority !== "priority") {
      setShowProject(project.todos.filter((todo) => todo.priority === priority));
    } else {
      setShowProject(project.todos);
    }
  }, [priority, project.todos])

  const toggleTodoForm = () => {
    setShowTodoForm(!showTodoForm);
  }

  const toggleEditForm = (event) => {
    let index = parseInt(event.target.id.match(/\d+/));
    if (showEditForm) {
      setShowEditForm("");
    } else {
      setShowEditForm("editForm"+index);
    }
  }

  const changePriority = (event) => {
    setPriority(event.target.value);
    if (priority !== "all" && priority !== "priority") {
      setShowProject(project.todos.filter((todo) => todo.priority === priority));
    } else {
      setShowProject(project.todos)
    }
  }

  return (
    <div id="todo-container"> 
      <div id="centering">
        <div className="todo-header">
          <div>Item</div>
          <div>Due Date</div>
          <div>
            <select defaultValue="priority" id="prioritySelect" onChange={changePriority}>
              <option value="priority" disabled="disabled">priority</option>
              <option value="all">all</option>
              <option value="high">high</option>
              <option value="med">med</option>
              <option value="low">low</option>
              <option value="none">none</option>
            </select>
          </div>
          <div></div>
          <div className="edit-btn"></div>
          <div className="x-btn"></div>
        </div>
        <div id="todos">
          { showProject 
            ? showProject.map((todo, index) =>  
              <div key={index}>
                <Todo todo={todo} index={index} showEditForm={showEditForm} toggleEditForm={toggleEditForm}/>
                <EditTodoForm todo={todo} index={index} showEditForm={showEditForm} toggleEditForm={toggleEditForm}/>
              </div>
            )
            : ""
          }
        <AddTodoForm showTodoForm={showTodoForm} toggleTodoForm={toggleTodoForm}/>
        </div>
        <button 
          className={showTodoForm ? "addFormBtn hidden" : "addFormBtn"}
          onClick={toggleTodoForm}
        >
          Add New Todo
        </button>
      </div>
    </div>
  )

}

export default TodoContainer;