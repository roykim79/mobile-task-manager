import { FETCH_PROJECT_NAMES } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PROJECT_NAMES:
      return action.payload.data;
    default:
      return state;
  }
}

