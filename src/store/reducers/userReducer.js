import {
  USERS_REDUCER_ACTION_TYPES
} from '../actions/types';
import { fromJS } from 'immutable';

const initialState = fromJS({
  user: {},
  isAuth: false,
  isLoading: false
});

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case USERS_REDUCER_ACTION_TYPES.LOGIN_USER_SUCCEED:
      return state.set("user", fromJS(payload.user));
    case USERS_REDUCER_ACTION_TYPES.IS_AUTH_STATE:
      return state.set("isAuth", fromJS(payload.isAuth));
    case USERS_REDUCER_ACTION_TYPES.LOADING_STATE:
      return state.set("isLoading", fromJS(payload.isLoading));

    default:
      return state;
  }
};



