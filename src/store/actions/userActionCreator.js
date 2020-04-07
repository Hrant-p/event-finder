import {
  USERS_REDUCER_ACTION_TYPES,
} from "./types";

export function loginUser(login, password) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.LOGIN_CURRENT_USER,
    payload: { login, password }
  }
}

export function logOut() {
  return {
    type: USERS_REDUCER_ACTION_TYPES.LOGOUT_USER,
    payload: {}
  }
}

export function setCurrentUser(user) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.SET_USER_SUCCEED,
    payload: { user }
  }
}

export function watchForAuth() {
  return {
    type: USERS_REDUCER_ACTION_TYPES.WATCH_FOR_FIREBASE_AUTH,
    payload: {}
  }
}

export function createNewUserRequest(login, password) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.REGISTER_NEW_USER,
    payload: { login, password }
  };
}

export function changeLoadingStateUsers(isLoading) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.LOADING_STATE,
    payload: { isLoading }
  };
}

export function errorState(error) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.ERROR_STATE,
    payload: { error }
  };
}
