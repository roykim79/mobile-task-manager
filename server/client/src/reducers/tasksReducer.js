import _ from 'lodash';
import { CREATE_TASK } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_TASK:
      return _.assign(state, action.payload.data);
    
    default:
      return state;
  }
}

