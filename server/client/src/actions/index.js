import axios from 'axios';
import { CREATE_PROJECT, CREATE_TASK, DELETE_PROJECT, DELETE_TASK, FETCH_PROJECT, FETCH_PROJECTS, FETCH_TASK, FETCH_USER, FETCH_USER_INFO, FETCH_USERS, SET_CURRENT_PROJECT, UPDATE_TASK } from './types';

export const createProject = (name) => {
  const res = axios.post('/api/projects', name);

  return { type: CREATE_PROJECT, payload: res };
};

export const createTask = (task) => {
  const res = axios.post('/api/tasks', task);

  return { type: CREATE_TASK, payload: res };
};

export const deleteTask = (taskId) => {
  const res = axios.delete(`/api/tasks/${taskId}`);

  return { type: DELETE_TASK, payload: res };
};

export const deleteProject = (projectId) => {
  const res = axios.delete(`/api/projects/${projectId}`);

  return { type: DELETE_PROJECT, payload: res };
};

// get all Project names
export const fetchProjects = () => {
  const res = axios.get('/api/projects');

  return { type: FETCH_PROJECTS, payload: res };
};

// get all tasks with given projectId
export const fetchProject = (projectId) => {
  const res = axios.get(`/api/projects/${projectId}/tasks`);

  return { type: FETCH_PROJECT, payload: res }
}

export const fetchTask = (taskId) => {
  const res = axios.get(`/api/tasks/${taskId}`);

  return { type: FETCH_TASK, payload: res };
};

export const fetchUser = () => {
  const res = axios.get('/api/current_user');

  return { type: FETCH_USER, payload: res };
};

export const fetchUserInfo = () => {
  const res = axios.get('/api/userInfo');

  return { type: FETCH_USER_INFO, payload: res };
};

export const fetchUsers = () => {
  const res = axios.get('/api/users');

  return { type: FETCH_USERS, payload: res };
};

export const setCurrentProject = (project) => {

  return { type: SET_CURRENT_PROJECT, payload: project };
};

export const updateTask = (taskId) => {
  const res = axios.put(`/api/tasks/${taskId}`);

  return { type: UPDATE_TASK, payload: res }
}