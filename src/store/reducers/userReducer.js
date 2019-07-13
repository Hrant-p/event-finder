import {
  USERS_REDUCER_ACTION_TYPES
} from '../actions/types';
import { fromJS } from 'immutable';

const initialState = fromJS({
  allUsers: {},
  isLoading: false
});

export default (state = initialState, {type, payload}) => {
    
    switch (type) {
      case USERS_REDUCER_ACTION_TYPES.GET_USERS_SUCCEED:
        return state.set("allUsers", fromJS(payload.data));

      case USERS_REDUCER_ACTION_TYPES.LOADING_STATE:
        return state.set("isLoading", fromJS(payload.isLoading));

      default:
        return state;
    };
};



