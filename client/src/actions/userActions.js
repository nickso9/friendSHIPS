import axios from 'axios'
import {
  USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS,
  LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL,
  USER_UPDATER
} from '../actions/types';
import { returnErrors } from './errorActions'

export const loadUser = () => async (dispatch, getState) => {
 
  dispatch({ type: USER_LOADING });

  try {

    const tokenResults = await axios.post(
      '/users/tokenIsValid', null, tokenConfig(getState))
      

    if (tokenResults.data) {
      const userResults = await axios.get('/users',tokenConfig(getState));
      
      dispatch({
        type: USER_LOADED,
        payload: userResults.data
      })

    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
        type: AUTH_ERROR
    });
  }

};


export const register = ({ name, email, password, confirmPassword, username, image }) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let passwordCheck = confirmPassword

  const body = JSON.stringify({ name, email, password, passwordCheck, username, image });

  axios.post('/users/register', body, config)
    .then(res =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const friendListUpdater = (id) => dispatch => {
  axios.get('/user/updatefriend',{
    params: {
      id: id
    }
  })
  .then(res => {
    dispatch({
      type: USER_UPDATER,
      payload: res.data
    })
  })
  .catch(err => console.log(err))
}


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

  axios.post('/users/login', body, config)
  .then(res => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  })
  .catch(err => {
    console.log(err)
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