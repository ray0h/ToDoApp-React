import React, { useState } from 'react';
import { useStore } from '../store-provider';

const AddProjectForm = ({ showProjectForm, toggleProjectForm }) => {
  const { dispatch } = useStore();
  const [ newProject, setNewProject ] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    let nextProject = {
      project: newProject,
      todos: []
    }

    setNewProject("");
    toggleProjectForm();
    dispatch({ type: 'ADD_PROJECT', nextProject })
  }

  return (
    <div>
      <form 
        id="newProjectForm" 
        className={showProjectForm ? "form-header" : "hidden form-header"} 
        onSubmit={submitForm}
      >
        <span>
          <input 
            id="newProject" 
            style={{ width:"9em" }}
            value={newProject}
            onChange={({ target }) => setNewProject(target.value)}
          />
          <button 
            type="submit"
            className="save-btn" 
          >
            save
          </button>
        </span>
        <div 
          className="x-btn" 
          onClick={() => {
            setNewProject("");
            toggleProjectForm()
          }}
        >
          {'\u2612'}
        </div>
      </form>
    </div>
  )

}

export default AddProjectForm;
