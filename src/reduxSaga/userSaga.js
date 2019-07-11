import { constructUrl } from "../API/helpers";
import { request } from "../services/requestService";
import { apiConsts } from "../API/keys";
import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  USERS_REDUCER_ACTION_TYPES,
  CERTAIN_USER_REDUCER_ACTION_TYPES
} from "../store/actions/types";

import {
  changeLoadingStateUsers,
  getAllUsersSucceed
} from "../store/actions/userActionCreator";

function* getAllUsers() {
  try {
    yield put(changeLoadingStateUsers(true));

    const { data } = yield call(
      request,
      "GET",
      constructUrl([apiConsts.urlForData, apiConsts.id], {})
    );

    yield put(getAllUsersSucceed(data));
    yield put(changeLoadingStateUsers(false));
  } catch (error) {
    console.log(error);
  }
}

//             `https://www.eventbriteapi.com/v3/events/search/?q=${text}&token=${PRIVATE_API_KEY}&expand=venue&page=${page}`;

// es taki object@ constructUrl-i erkrord argumentna
// {
// q: text,
// token
// }

function* createNewUser({ payload: { newUsers, history } }) {
  try {
    yield put(changeLoadingStateUsers(true));

    yield call(
      request,
      "PUT",
      constructUrl([apiConsts.urlForData, apiConsts.id], {}),
      newUsers
    );

    yield put(changeLoadingStateUsers(false));

    history.push("/dashboard")
  } catch (error) {
    console.log(error);
  }
};

export function* usersSaga() {
  yield all([
    takeLatest(USERS_REDUCER_ACTION_TYPES.GET_USERS, getAllUsers),
    takeLatest(
      CERTAIN_USER_REDUCER_ACTION_TYPES.POST_CERTAIN_USER,
      createNewUser
    )
  ]);
}
