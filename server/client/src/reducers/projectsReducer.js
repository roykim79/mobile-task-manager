import _ from 'lodash';
import { CREATE_PROJECT, DELETE_PROJECT, FETCH_PROJECTS } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return _.assign(state, action.payload.data);
    case FETCH_PROJECTS:
      return action.payload.data;
    case DELETE_PROJECT:
      return _.omit(state, action.payload.data);
    default:
      return state;
  }
}

