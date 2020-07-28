import React, { createContext, useReducer, useContext } from 'react';

// default project/todos
const today = JSON.parse(JSON.stringify(new Date()));
let defaultTodos = [
  {
    project: "My Project",
    todos: [
      {
        item: "write more todos",
        dueDate: today,
        complete: false,
        priority: "high"
      },
      {
        item: "another todo",
        dueDate: today,
        complete: false,
        priority: "med"
      }
    ]
  },
  {
    project: "Another ToDo list",
    todos: []
  }
]

// grab projects in localStorage or set default 
let storedState = window.localStorage.getItem("projects");
let defaultState = JSON.parse(storedState);
console.log(defaultState)
if (!storedState) {
  defaultState = {
    projects: defaultTodos,
    currentProject: defaultTodos[0],
  }

  window.localStorage.setItem("projects", JSON.stringify(defaultState));
}
console.log(defaultState)

// state reducer - ideally would split up further and combinereducers
function reducer (state = defaultState, action = {}) {
  let updatedTodos, updatedProjects, updatedCurrent, newState;
  
  switch(action.type) {
    case 'ADD_PROJECT': 
      updatedProjects = state.projects.concat(action.nextProject);
      newState = {
        ...state,
        projects: updatedProjects
      };
      window.localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    case 'DEL_PROJECT':
      let index = state.projects.findIndex((project) => project === state.currentProject);
     
      // move currentProject marker if it's deleted
      updatedCurrent=state.projects[Math.abs(index-1)];
      newState = {
        projects: state.projects.filter((proj, index) => index !== action.index), currentProject: updatedCurrent
      };
      window.localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    case 'UPDATE_CURRENT':
      updatedCurrent = state.projects.filter(proj => proj.project === action.clickedProject);

      newState = {
        ...state,
        currentProject: updatedCurrent[0]
      };
      window.localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    case 'UPDATE_COMPLETE':
      updatedTodos = state.currentProject.todos.map((todo, index) => (index === action.index) ? { ...todo, complete: !todo.complete } : todo);
      updatedCurrent = state.currentProject;
      updatedCurrent.todos = updatedTodos;
      updatedProjects = state.projects.map(proj => (proj.project === state.currentProject.project) ? updatedCurrent : proj);

      newState={
        projects: updatedProjects,
        currentProject: updatedCurrent 
      };
      window.localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    case 'ADD_TODO':
      updatedTodos = state.currentProject.todos.concat(action.newTodo);
      updatedCurrent = {...state.currentProject, todos: updatedTodos }
      updatedProjects = state.projects.map((proj) => 
        (proj.project === state.currentProject.project) ? updatedCurrent : proj);
      
      newState={
        projects: updatedProjects,
        currentProject: updatedCurrent 
      };
      window.localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    case 'DEL_TODO': 
      updatedTodos = state.currentProject.todos.filter((todo, index) => index !== action.index);
      updatedCurrent = {...state.currentProject, todos: updatedTodos }
      updatedProjects = state.projects.map((proj) => 
        (proj.project === state.currentProject.project) ? updatedCurrent : proj);
      
      newState={
        projects: updatedProjects,
        currentProject: updatedCurrent
      };
      window.localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    case 'EDIT_TODO':
      updatedTodos = state.currentProject.todos.map((todo, index) => (index === action.index) ? action.editTodo : todo);
      updatedCurrent = state.currentProject
      updatedCurrent.todos = updatedTodos;
      updatedProjects = state.projects.map(proj => (proj.project === state.currentProject.project) ? updatedCurrent : proj)
      
      newState={
        projects: updatedProjects,
        currentProject: updatedCurrent
      };
      window.localStorage.setItem("projects", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, defaultState);
  const value = { state, dispatch }

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);