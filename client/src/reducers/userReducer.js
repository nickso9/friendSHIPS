
import { LOGIN_USER, REGISTER_USER } from '../actions/types';

const initialState = {
  user: {}
};

export default function userR(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload
      };
    case REGISTER_USER:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}