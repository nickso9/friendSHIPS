import axios from 'axios'
import moment from 'moment';

import {
    FRIEND_SEARCH, FRIEND_SUCCESS, FRIEND_FAIL, FRIEND_NOTFOUND, CLEAR_FRIEND_ERROR,
    LOAD_FRIEND, SAVE_MESSAGE, CURRENT_MESSAGE, ADD_TO_PENDING, REMOVE_PENDING,
    ONLINE_FRIENDS, NEWONLINE_FRIEND, NEWOFFLINE_FRIEND, LOGOUT_MESSAGE, UNLOAD_FRIEND,
    REMOVE_NEW_MESSAGE, SET_USER_ID
} from './types'


export const searchFriend = (username) => dispatch => {

    axios.get('http://localhost:8080/user/search', {
        params: {
            user: username
        }
    })
        .then(res => {
            dispatch({
                type: FRIEND_SEARCH,
                payload: res.data
            })
        })
        .catch(err => {
            if (err.response.status === 400) {

                dispatch({
                    type: FRIEND_NOTFOUND,
                    payload: err.response.data.msg
                })

            } else {

                dispatch({
                    type: FRIEND_FAIL,
                    payload: err.response.data.msg
                })
            }

        })

};

export const addPending = (userToAdd, user, usernameToAdd, image) => dispatch => {

    axios.post('http://localhost:8080/user/pendingfriend', {
        body: {
            userToAdd: userToAdd,
            user: user,
            usernameToAdd,
            image
        }
    })
        .then(() => {
            dispatch({
                type: ADD_TO_PENDING
            })
        })
        .catch(err => {
            dispatch({
                type: FRIEND_FAIL,
                payload: err.response.data.msg
            })
        })

}

export const addFriend = (userToAdd, user) => dispatch => {

    axios.post('http://localhost:8080/user/addfriend', {
        body: {
            userToAdd: userToAdd,
            user: user
        }
    })
        .then(user => {
            dispatch({
                type: FRIEND_SUCCESS,
                payload: user.data.friends
            })
        })
        .catch(err => {
            dispatch({
                type: FRIEND_FAIL,
                payload: err.response.data.msg
            })
        })
};


export const removeFriend = (userToRemove, user) => dispatch => {

    axios.delete('http://localhost:8080/user/removefriend', {
        data: {
            userToRemove: userToRemove,
            user: user
        }
    })
        .then(user => {
            dispatch({
                type: FRIEND_SUCCESS,
                payload: user.data.friends
            })
        })
        .catch(err => {
            dispatch({
                type: FRIEND_FAIL,
                payload: err.response.data.msg
            })
        })
};

export const removePending = (userToRemove, user) => dispatch => {

    axios.put('http://localhost:8080/user/removepending', {
        data: {
            id: user,
            userToRemove
        }
    })
        .then(() => {
            dispatch({
                type: REMOVE_PENDING
            })
        })
        .catch(err => {
            dispatch({
                type: FRIEND_FAIL,
                payload: err.response.data.msg
            })
        })

}

export const loadFriend = (id, username, image) => dispatch => {
    dispatch({
        type: LOAD_FRIEND,
        payload: {
            id: id,
            username: username,
            image: image
        }
    })
}

export const unloadFriend = () => dispatch => {
    dispatch({
        type: UNLOAD_FRIEND
    })
}

export const saveMessages = (from, to, message) => dispatch => {
    const d = new Date()
    const timeOfMessage = moment(d).format('MM/DD, h:mm a')

    dispatch({
        type: SAVE_MESSAGE,
        payload: {
            timeOfMessage,
            from,
            to,
            message,
        }
    })
}

export const getCurrentMessages = (from, to) => dispatch => {
    dispatch({
        type: CURRENT_MESSAGE,
        payload: {
            from,
            to,
        }
    })
}

export const clearFriendError = () => {
    return {
        type: CLEAR_FRIEND_ERROR
    };
}

export const setOnlineFriends = (friendsArr) => {
    return {
        type: ONLINE_FRIENDS,
        payload: friendsArr
    }
}

export const newOnlineFriend = (id) => {
    return {
        type: NEWONLINE_FRIEND,
        payload: id
    }
}

export const newOfflineFriend = (id) => {
    return {
        type: NEWOFFLINE_FRIEND,
        payload: id
    }
}

export const logoutMessage = () => {
    return {
        type: LOGOUT_MESSAGE
    }
}

export const removeNewMessage = (id) => dispatch => {
    dispatch({
        type: REMOVE_NEW_MESSAGE,
        payload: id
    })
}

export const setUserId = (id) => dispatch => {
    dispatch({
        type: SET_USER_ID,
        payload: id
    })
}