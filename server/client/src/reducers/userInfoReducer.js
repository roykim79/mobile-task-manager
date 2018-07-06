import _ from 'lodash';
import { FETCH_USER_INFO } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER_INFO:
      return action.payload.data;
    default:
      return state;
  }
}

