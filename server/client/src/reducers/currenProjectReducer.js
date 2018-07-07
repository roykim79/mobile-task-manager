import _ from 'lodash';
import { CREATE_TASK, DELETE_TASK, FETCH_PROJECT } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_TASK:
      // let updatedProject = _.assign({}, state);
      // updatedProject.tasks = action.payload.data.tasks
      return _.assign(state, action.payload.data);
    case FETCH_PROJECT:
      return action.payload.data;
    case DELETE_TASK:
      return action.payload.data;
    default:
      return state;
  }
}

