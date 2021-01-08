import { combineReducers } from 'redux';

import userReducer from './userReducer';
import errorReducer from './errorReducer';
import pageReducer from './pageReducer'

export default combineReducers({
  auth: userReducer,
  error: errorReducer,
  page: pageReducer
});