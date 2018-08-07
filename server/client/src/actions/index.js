import axios from 'axios';
import { CREATE_ORGANIZATION, CREATE_PROJECT, CREATE_TASK, DELETE_PROJECT, DELETE_TASK, FETCH_PROJECT_TASKS, FETCH_PROJECTS, FETCH_TASK, FETCH_USER, FETCH_USER_INFO, FETCH_USERS, SET_CURRENT_PROJECT, UPDATE_TASK } from './types';

export const createOrganization = (organization, callback) => {
  const req = axios.post('/api/organizations', organization);
  ////////////////////////////////////////////////////////
  req.then(() => callback());

  return { type: CREATE_ORGANIZATION, payload: req };
};

export const createProject = (projectName, callback) => {
  const req = axios.post('/api/projects', projectName);
  
  req.then(() => callback());

  return { type: CREATE_PROJECT, payload: req };
};

export const createTask = (task, callback) => {
  const req = axios.post('/api/tasks', task);
  
  req.then(() => callback());
  
  return { type: CREATE_TASK, payload: req };
};

export const deleteTask = (taskId, callback) => {
  const req = axios.delete(`/api/tasks/${taskId}`);

  req.then(() => callback());

  return { type: DELETE_TASK, payload: req };
};

export const deleteProject = (projectId, callback) => {
  const req = axios.delete(`/api/projects/${projectId}`);

  req.then(() => callback());

  return { type: DELETE_PROJECT, payload: req };
};

// get all Project names
export const fetchProjects = () => {
  const req = axios.get('/api/projects');

  return { type: FETCH_PROJECTS, payload: req };
};

// get all tasks with given projectId
export const fetchProjectTasks = (projectId) => {
  const req = axios.get(`/api/projects/${projectId}/tasks`);

  return { type: FETCH_PROJECT_TASKS, payload: req }
}

export const fetchTask = (taskId) => {
  const req = axios.get(`/api/tasks/${taskId}`);

  return { type: FETCH_TASK, payload: req };
};

export const fetchUser = () => {
  const req = axios.get('/api/current_user');

  return { type: FETCH_USER, payload: req };
};

export const fetchUserInfo = () => {
  const req = axios.get('/api/userInfo');

  return { type: FETCH_USER_INFO, payload: req };
};

export const fetchUsers = () => {
  const req = axios.get('/api/users');

  return { type: FETCH_USERS, payload: req };
};

export const setCurrentProject = (projectId) => {
  const req = axios.get(`/api/projects/${projectId}`);

  return { type: SET_CURRENT_PROJECT, payload: req };
};

export const updateTask = (taskId, task) => {
  const req = axios.put(`/api/tasks/${taskId}`, task);

  return { type: UPDATE_TASK, payload: req }
}
