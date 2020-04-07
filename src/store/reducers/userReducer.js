import {
  USERS_REDUCER_ACTION_TYPES
} from '../actions/types';
import { fromJS } from 'immutable';

const initialState = fromJS({
  user: null,
  isLoading: false,
  error: null
});

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case USERS_REDUCER_ACTION_TYPES.SET_USER_SUCCEED:
      return state.set("user", fromJS(payload.user));
    case USERS_REDUCER_ACTION_TYPES.LOADING_STATE:
      return state.set("isLoading", fromJS(payload.isLoading));
    case USERS_REDUCER_ACTION_TYPES.ERROR_STATE:
      return state.set("error", fromJS(payload.error));
    default:
      return state;
  }
};



