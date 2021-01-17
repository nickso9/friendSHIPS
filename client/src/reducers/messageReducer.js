import { FRIEND_FAIL, FRIEND_NOTFOUND, FRIEND_SUCCESS, FRIEND_SEARCH, CLEAR_FRIEND_ERROR, LOAD_FRIEND, SAVE_MESSAGE, CURRENT_MESSAGE, ADD_TO_PENDING, REMOVE_PENDING, ONLINE_FRIENDS, NEWONLINE_FRIEND, NEWOFFLINE_FRIEND, LOGOUT_MESSAGE } from '../actions/types';

const initialState = {
    user: '',
    id: '',
    msg: '',
    messageWith: {},
    friendsList: [],
    messages: [],
    currentMessages: [],
    friendsOnline: []
}

export default function error(state = initialState, action) {
    switch (action.type) {
        case FRIEND_SEARCH:
            return {
                ...state,
                user: action.payload.user,
                id: action.payload.id,
            }
        case ADD_TO_PENDING:
            return {
                ...state,
                user: '',
                id: '',
                msg: 'Friendship requested.'
            }
        case FRIEND_SUCCESS:
            return {
                ...state,
                user: '',
                id: '',
                friendsList: action.payload
            };
        case ONLINE_FRIENDS:
            return {
                ...state,
                friendsOnline: action.payload
            }
        case NEWONLINE_FRIEND: {
            if (state.friendsOnline.indexOf(action.payload) !== -1) {
                return {
                    ...state,
                }
            }
            const updateFriends = [...state.friendsOnline]
            updateFriends.push(action.payload)
            return {
                ...state,
                friendsOnline: updateFriends
            }
        }
        case NEWOFFLINE_FRIEND: {
            if (state.friendsOnline.indexOf(action.payload) === -1) {
                return {
                    ...state,
                }
            }
            const updateFriends = [...state.friendsOnline].filter(e => e !== action.payload)
            return {
                ...state,
                friendsOnline: updateFriends
            }
        }
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
        case LOGOUT_MESSAGE:
            return {
                user: '',
                id: '',
                msg: '',
                messageWith: {},
                friendsList: [],
                messages: [],
                currentMessages: [],
                friendsOnline: []
            }
        case REMOVE_PENDING:
        default:
            return state;
    }
}