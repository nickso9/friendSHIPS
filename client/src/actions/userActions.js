import axios from 'axios'

import { LOGIN_USER, REGISTER_USER } from './types';


export const loginUser = (loginInfo) => async dispatch => {

    try {
        const loginResult = await axios.post('http://localhost:8080/users/login', loginInfo)
        
        localStorage.setItem('auth-token', loginResult.data.token)

        dispatch({
            type: LOGIN_USER,
            payload: loginResult.data
        })

    } catch (err) {
        
        throw new Error('login failed.')
    }

};

export const RegisterUser = (userInfo) => dispatch => {
    dispatch({
        type: REGISTER_USER,
        payload: 'register user'
    })
};