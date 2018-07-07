import axios from 'axios';
import { CREATE_PROJECT, CREATE_TASK, DELETE_TASK, FETCH_PROJECT, FETCH_PROJECT_NAMES, FETCH_TASK, FETCH_USER, FETCH_USER_INFO, UPDATE_TASK } from './types';

export const createProject = (name) => {
  const res = axios.post('/api/projects', name);

  return { type: CREATE_PROJECT, payload: res };
};

export const createTask = (projectId, task) => {
  const res = axios.post(`/api/projects/${projectId}`, task);

  return { type: CREATE_TASK, payload: res };
};

export const deleteTask = (projectId, taskId) => {
  const res = axios.delete(`/api/projects/${projectId}/tasks/${taskId}`);

  return { type: DELETE_TASK, payload: res };
};

// get all Project names
export const fetchProjectNames = () => {
  const res = axios.get('/api/projects/names');

  return { type: FETCH_PROJECT_NAMES, payload: res };
};

// get the Project by id and all its tasks
export const fetchProject = (projectId) => {
  const res = axios.get(`/api/projects/${projectId}`);

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

export const updateTask = (taskId) => {
  const res = axios.put(`/api/tasks/${taskId}`);

  return { type: UPDATE_TASK, payload: res }
}