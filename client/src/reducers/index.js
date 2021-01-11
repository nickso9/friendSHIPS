import { combineReducers } from 'redux';

import userReducer from './userReducer';
import errorReducer from './errorReducer';
import pageReducer from './pageReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  auth: userReducer,
  error: errorReducer,
  page: pageReducer,
  friend: messageReducer
});