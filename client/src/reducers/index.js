import { combineReducers } from 'redux';

import userReducer from './userReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: userReducer,
  error: errorReducer
});