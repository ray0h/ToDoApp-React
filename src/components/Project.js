import React from 'react';
import { useStore } from '../store-provider';

const Project = ({ project, index }) => {

  const { dispatch, state } = useStore();

  const makeCurrentProj = (event) => {
    let clickedProject = event.target.id;
    dispatch ({ type: 'UPDATE_CURRENT', clickedProject });
  }

  return (
    <span className="form-header">
      <div 
        id={project.project} 
        className={(project.project === state.currentProject.project) ? "project-link active-project" : "project-link"} 
        onClick={makeCurrentProj}
      >
        {project.project}
      </div>
      <div 
        className="x-btn" 
        onClick={() => dispatch({ type: 'DEL_PROJECT', index })}
      >
        {'\u2612'}
      </div>
    </span>
  )
}

export default Project;