import axios from 'axios'

import { FRIEND_SEARCH, FRIEND_SUCCESS, FRIEND_FAIL, FRIEND_NOTFOUND, CLEAR_FRIEND_ERROR,
     LOAD_FRIEND, SAVE_MESSAGE, CURRENT_MESSAGE, ADD_TO_PENDING } from './types'


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
            console.log(err.response.data.msg)
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
    console.log('hihi')
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


export const loadFriend = (id, username) => dispatch => {
    dispatch({
        type: LOAD_FRIEND,
        payload: {
            id: id,
            username: username,
        }
    })
}

export const saveMessages = (from, to, message) => dispatch => {
    dispatch({
        type: SAVE_MESSAGE,
        payload: {
            from,
            to,
            message
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
