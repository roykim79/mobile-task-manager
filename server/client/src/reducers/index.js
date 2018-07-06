import { combineReducers } from 'redux';
import authReducer from './authReducer';
import currenProjectReducer from './currenProjectReducer';
import projectNamesReducer from './projectNamesReducer';
import tasksReducer from './tasksReducer';
import taskReducer from './taskReducer';
import userInfoReducer from './userInfoReducer';


export default combineReducers({
  auth: authReducer,
  currentProject: currenProjectReducer,
  projectNames: projectNamesReducer,
  tasks: tasksReducer,
  task: taskReducer,
  userInfo: userInfoReducer
});