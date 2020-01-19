import { fromJS } from 'immutable';
import { SEARCH_EVENTS_ACTION_TYPES } from '../actions/types';

const initalState = fromJS({
  findedEvents: [],
  isLoading: false,
});

export default (state = initalState, { type, payload }) => {
  switch (type) {
    case SEARCH_EVENTS_ACTION_TYPES.GET_EVENTS_SUCCEED:
      return state.set('findedEvents', fromJS(payload.data));
    case SEARCH_EVENTS_ACTION_TYPES.LOADING_STATE:
      return state.set('isLoading', fromJS(payload.isLoading));
    default:
      return state;
  }
};
