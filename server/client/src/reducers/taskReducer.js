import { FETCH_TASK, UPDATE_TASK } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_TASK:
      return action.payload.data;
    case UPDATE_TASK:
      return action.payload.data;
    default:
      return state;
  }
}

