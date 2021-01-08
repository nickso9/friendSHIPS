import axios from 'axios'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';


export const loadUser = () => async (dispatch, getState) => {

    dispatch({ type: USER_LOADING });

    try {
        
            const tokenResults = await axios.post(
                'http://localhost:8080/users/tokenIsValid', tokenConfig(getState))
            
            if (tokenResults.data) {
                const userResults = await axios.get('http://localhost:8080/users', 
                tokenConfig(getState));  

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


// export const LogoutUser = () => dispatch => {

//     localStorage.setItem('auth-token', '')

//     dispatch({
//         type: LOGOUT_USER,
//         payload: {
//             user: ''
//         }
//     })

// }


// export const login = ({email, password}) => {

//     const loginResult = await axios.post('http://localhost:8080/users/login', loginInfo)
        
//             localStorage.setItem('auth-token', loginResult.data.token)
//             console.log(loginResult)

//             dispatch({
//                 type: LOGIN_USER,
//                 payload: loginResult.data
//             })

// }



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