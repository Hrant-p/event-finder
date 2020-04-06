import {
  USERS_REDUCER_ACTION_TYPES,
} from "./types";

export function loginUser(login, password, history) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.LOGIN_CURRENT_USER,
    payload: { login, password, history }
  }
}

export function setCurrentUser(user) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.LOGIN_USER_SUCCEED,
    payload: { user }
  }
}

export function changeIsAuthState(isAuth) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.IS_AUTH_STATE,
    payload: { isAuth }
  }
}

export function createNewUserRequest(login, password, history) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.REGISTER_NEW_USER,
    payload: { login, password, history }
  };
}

export function changeLoadingStateUsers(isLoading) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.LOADING_STATE,
    payload: { isLoading }
  };
}
