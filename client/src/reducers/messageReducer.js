import { SET_USER_ID, FRIEND_FAIL, FRIEND_NOTFOUND, FRIEND_SUCCESS, FRIEND_SEARCH, CLEAR_FRIEND_ERROR, LOAD_FRIEND, SAVE_MESSAGE, CURRENT_MESSAGE, ADD_TO_PENDING, REMOVE_PENDING, ONLINE_FRIENDS, NEWONLINE_FRIEND, NEWOFFLINE_FRIEND, LOGOUT_MESSAGE, UNLOAD_FRIEND, REMOVE_NEW_MESSAGE } from '../actions/types';

const initialState = {
    user: '',
    id: '',
    msg: '',
    messageWith: {},
    friendsList: [],
    messages: [],
    currentMessages: [],
    friendsOnline: [],
    newMessages: [],
    me: ''
}

export default function error(state = initialState, action) {
    switch (action.type) {
        case SET_USER_ID:
            return {
                ...state,
                me: action.payload
            }
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
                user: '',
                id: '',
                msg: ''
            }
        case LOAD_FRIEND:
            return {
                ...state,
                messageWith: action.payload
            }
        case UNLOAD_FRIEND:
            return {
                ...state,
                messageWith: {}
            }
        case SAVE_MESSAGE:


            if (action.payload.from === state.me) {
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
            }

            let messageCheck = false

            if (state.newMessages) {
                messageCheck = [...state.newMessages].some(e => e === action.payload.from)
            }

            if (!messageCheck) {

                if (!state.messages) {
                    if (state.messageWith.id !== action.payload.from) {

                        if (!state.newMessages) {
                            return {
                                ...state,
                                newMessages: [action.payload.from],
                                messages: [action.payload]
                            }
                        } else {
                            return {
                                ...state,
                                newMessages: [
                                    ...state.newMessages,
                                    action.payload.from
                                ],
                                messages: [action.payload]
                            }
                        }

                    }
                    return {
                        ...state,
                        messages: [action.payload]
                    }
                }

                if (state.messageWith.id !== action.payload.from) {

                    if (!state.newMessages) {

                        return {
                            ...state,
                            newMessages: [action.payload.from],
                            messages: [
                                ...state.messages, action.payload
                            ]
                        }
                    } else {

                        return {
                            ...state,
                            newMessages: [
                                ...state.newMessages,
                                action.payload.from
                            ],
                            messages: [
                                ...state.messages, action.payload
                            ]
                        }
                    }
                }

            }
            return {
                ...state,
                messages: [
                    ...state.messages, action.payload
                ]
            }
        case REMOVE_NEW_MESSAGE:
            if (!state.newMessages) {
                return {
                    ...state,
                }
            }

            const updatedNewMessage = [...state.newMessages].filter(e => e !== action.payload)
            return {
                ...state,
                newMessages: updatedNewMessage
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