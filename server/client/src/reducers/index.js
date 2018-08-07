import { combineReducers } from 'redux';
import authReducer from './authReducer';
import currenProjectReducer from './currenProjectReducer';
import currenTasksReducer from './currenTasksReducer';
import projectsReducer from './projectsReducer';
import taskReducer from './taskReducer';
import userInfoReducer from './userInfoReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  currentProject: currenProjectReducer,
  currentTasks: currenTasksReducer,
  projects: projectsReducer,
  task: taskReducer,
  userInfo: userInfoReducer,
  users: usersReducer
});
