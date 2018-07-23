import { SET_CURRENT_PROJECT } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_PROJECT:
      return action.payload.data;
    default:
      return state;
  }
}
