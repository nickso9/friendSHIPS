import axios from 'axios'

import { FRIEND_SEARCH, FRIEND_SUCCESS, FRIEND_FAIL, FRIEND_NOTFOUND, CLEAR_FRIEND_ERROR } from './types'


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
  
export const addFriend = (userToAdd, user) => dispatch => {
    axios.post('http://localhost:8080/user/addfriend', {
        body: {
            userToAdd: userToAdd,
            user: user
        }
    })
    .then(user => console.log(user))
    .catch(err => {
        dispatch({
            type: FRIEND_FAIL,
            payload: err.response.data.msg
        })
    })
};


export const clearFriendError = () => {
    return {
        type: CLEAR_FRIEND_ERROR
    };
}
