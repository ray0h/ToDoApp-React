import React, { useState } from 'react';
import Project from './Project';
import AddProjectForm from './AddProjectForm';

const ProjectContainer = ({ projects }) => {

  const [ showProjectForm, setShowProjectForm ] = useState(false);

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm);
  }
 
  return (
    <div id="project-container">
      <div className="project-header">Projects</div> 
      <div id="project-list">
        { projects 
          ? projects.map((project, ind) => 
            <Project 
              key = {ind} 
              project = {project} 
              index =  {ind}
            />
            )
          : ""}
        <AddProjectForm showProjectForm={showProjectForm} toggleProjectForm={toggleProjectForm}/>
      </div>
      <button 
        className={showProjectForm ? "addFormBtn hidden" : "addFormBtn"}
        onClick={toggleProjectForm}
      >
        Add New Project
      </button>
    </div>
  );
}

export default ProjectContainer;