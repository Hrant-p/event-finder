import {
  SEARCH_EVENTS_ACTION_TYPES
} from "./types";

export function searchEvents(name, location) {
  return {
    type: SEARCH_EVENTS_ACTION_TYPES.GET_SEARCH_EVENTS,
    payload: { name, location }
  };
}

export function searchEventsSucceed(data) {
  return {
    type: SEARCH_EVENTS_ACTION_TYPES.GET_EVENTS_SUCCEED,
    payload: { data }
  };
}

export function changeLoadingStateEvents(isLoading) {
  return {
    type: SEARCH_EVENTS_ACTION_TYPES.LOADING_STATE,
    payload: { isLoading }
  };
};

