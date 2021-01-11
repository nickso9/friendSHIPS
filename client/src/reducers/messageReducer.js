import { FRIEND_FAIL, FRIEND_NOTFOUND, FRIEND_SUCCESS, FRIEND_SEARCH, CLEAR_FRIEND_ERROR, LOAD_FRIEND, SAVE_MESSAGE } from '../actions/types';

const initialState = {
  user: '',
  id: '',
  msg: '',
  messageWith: {},
  friendsList: [],
  messages: []
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
            friendsList: action.payload
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
    case LOAD_FRIEND:
        console.log('hihi')
        return {
            ...state,
            messageWith: action.payload
            }
    case SAVE_MESSAGE:
        return {
            ...state,
            messages: [
                ...state.messages, action.payload
            ]
        }
    default:
      return state;
  }
}