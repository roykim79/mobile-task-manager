import _ from 'lodash';
import { CREATE_TASK, DELETE_TASK, FETCH_PROJECT_TASKS } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_TASK:
      return _.assign(state, action.payload.data);
    case FETCH_PROJECT_TASKS:
      return action.payload.data;
    case DELETE_TASK:
      return _.omit(state, action.payload.data);
    default:
      return state;
  }
}
