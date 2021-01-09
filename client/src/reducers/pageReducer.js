import { LANDING_PAGE, MESSAGE_PAGE, LOGIN_PAGE, REGISTER_PAGE } from '../actions/types';

const initialState = {
    status: 'landing'
}

export default function page(state = initialState, action) {
  switch(action.type) {
    case LANDING_PAGE:
      return {
        status: 'landing'
      };
    case MESSAGE_PAGE:
      return {
        status: 'message'
      };
    case LOGIN_PAGE:
      return {
        status: 'login'
      };
    case REGISTER_PAGE:
      return {
        status: 'register'
      };
    default:
      return state;
  }
}