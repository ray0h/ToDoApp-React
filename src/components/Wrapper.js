import React from 'react';
import { useStore } from '../store-provider';
import ProjectContainer from './ProjectContainer';
import TodoContainer from './TodoContainer';

const Wrapper = () => {
  const { state } = useStore();

  return (
    <div id="app-container">
      <h1>To Do App</h1>
      <div id="container">
        <ProjectContainer projects={state.projects}/>
        <TodoContainer project={state.currentProject}/>
      </div>
    </div>
  )
}

export default Wrapper;