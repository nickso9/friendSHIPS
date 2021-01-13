import { FRIEND_FAIL, FRIEND_NOTFOUND, FRIEND_SUCCESS, FRIEND_SEARCH, CLEAR_FRIEND_ERROR, LOAD_FRIEND, SAVE_MESSAGE, CURRENT_MESSAGE, ADD_TO_PENDING } from '../actions/types';

const initialState = {
  user: '',
  id: '',
  msg: '',
  messageWith: {},
  friendsList: [],
  messages: [],
  currentMessages: []
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
            ...state,
            user: '',
            id: '',
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
        return {
            ...state,
            messageWith: action.payload
            }
    case SAVE_MESSAGE:
            if (!state.messages) {
                return {
                    ...state,
                    messages: [action.payload]
                }
            }
        return {
            ...state,
            messages: [
                ...state.messages, action.payload
            ]
        }
    case CURRENT_MESSAGE:  
        const { from, to } = action.payload
        if (!from || !to) {
            return {
                ...state,
                currentMessages: null
            }
        }
        if (from !== state.messageWith.id && to !== state.messageWith.id) {
            return state
        }
        const oldMessages = [...state.messages]
        const currentMessages = oldMessages.filter(message => {
            if (message.from === from && message.to === to) {
                return message
            } 
            
            if (message.from === to && message.to === from) {
                return message
            }
            return ''
        })
        return {
            ...state,
            currentMessages
        };
    case ADD_TO_PENDING:
    default:
      return state;
  }
}