import { combineReducers } from 'redux';

import userReducer from './userReducer';
import errorReducer from './errorReducer';
import pageReducer from './pageReducer';
import friendReducer from './friendReducer';

export default combineReducers({
  auth: userReducer,
  error: errorReducer,
  page: pageReducer,
  friend: friendReducer
});