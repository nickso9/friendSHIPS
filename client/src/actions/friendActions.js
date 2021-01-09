import axios from 'axios'

import { FRIEND_SEARCH, FRIEND_SUCCESS, FRIEND_FAIL, FRIEND_NOTFOUND, CLEAR_FRIEND_ERROR } from './types'


export const searchFriend = (username) => dispatch => {

    console.log(username)
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
  
export const addFriend = (username) => {

};


export const clearFriendError = () => {
    return {
        type: CLEAR_FRIEND_ERROR
    };
}
