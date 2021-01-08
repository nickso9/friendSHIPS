import axios from 'axios'
import {
  USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS,
  LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL
} from '../actions/types';
import { returnErrors } from './errorActions'

export const loadUser = () => async (dispatch, getState) => {
 console.log('asdhkashdkjas')
  dispatch({ type: USER_LOADING });

  try {

    const tokenResults = await axios.post(
      'http://localhost:8080/users/tokenIsValid', null, tokenConfig(getState))
      console.log(tokenResults)
    if (tokenResults.data) {
      const userResults = await axios.get('http://localhost:8080/users',
        tokenConfig(getState));
      console.log(userResults.data)
      dispatch({
        type: USER_LOADED,
        payload: userResults.data
      })

    }

  } catch (err) {
    console.log(err)
    throw new Error('login failed.')
  }

};

// export const RegisterUser = (userInfo) => dispatch => {
//     dispatch({
//         type: REGISTER_USER,
//         payload: 'register user'
//     })
// };


export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};


export const login = ({ email, password }) => dispatch => {

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  axios.post('http://localhost:8080/users/login', body, config)
  .then(res => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  })
  .catch(err => {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
    );
    dispatch({
      type: LOGIN_FAIL
    });
  });

  

}



export const tokenConfig = getState => {

  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};