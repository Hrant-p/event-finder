import {
  USERS_REDUCER_ACTION_TYPES,
  CERTAIN_USER_REDUCER_ACTION_TYPES
} from "./types";

export function getAllUsersRequest() {
  return { type: USERS_REDUCER_ACTION_TYPES.GET_USERS, payload: {} };
}

export function getAllUsersSucceed(data) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.GET_USERS_SUCCEED,
    payload: { data }
  };
}

export function createNewUserRequest(newUsers, history) {
  return {
    type: CERTAIN_USER_REDUCER_ACTION_TYPES.POST_CERTAIN_USER,
    payload: { newUsers, history }
  };
}

export function changeLoadingStateUsers(isLoading) {
  return {
    type: USERS_REDUCER_ACTION_TYPES.LOADING_STATE,
    payload: { isLoading }
  };
}

// export function initialiseUsersState() {
//   return {
//     type: INITIALISE_USERS_REDUCER_ACTION_TYPES.INITIALISE_STORE,
//     payload: {}
//   };
// }

// export function createNewUserSucceed(userForAdd) {
//   return {
//     type: CERTAIN_USER_REDUCER_ACTION_TYPES.POST_CERTAIN_USER_SUCCEED,
//     payload: { userForAdd }
//   };
// }
