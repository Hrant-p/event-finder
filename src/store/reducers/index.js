import { combineReducers } from 'redux-immutable';
import userReducer from './userReducer';
import eventReducer from './eventReducer';

export default combineReducers({
  userReducer,
  eventReducer
});
