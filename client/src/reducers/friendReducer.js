import { FRIEND_FAIL, FRIEND_NOTFOUND, FRIEND_SUCCESS, FRIEND_SEARCH, CLEAR_FRIEND_ERROR } from '../actions/types';

const initialState = {
  user: '',
  id: '',
  msg: ''
}

export default function error(state = initialState, action) {
  switch(action.type) { 
    case FRIEND_SEARCH:
        return {
            ...state,
            user: action.payload.user,
            id: action.payload.id,
        }
    case FRIEND_SUCCESS:
        return {
            msg: action.payload.msg,
        };
    case FRIEND_NOTFOUND:
        return {
            ...state,
            msg: action.payload
        };
    case FRIEND_FAIL:
        return {
            ...state,
            msg: action.payload,
        };
    case CLEAR_FRIEND_ERROR:
        return {
            ...state,
            msg: ''
        }
    default:
      return state;
  }
}