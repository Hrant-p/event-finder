import { constructUrl } from "../API/helpers";
import { request } from "../services/requestService";
import { apiConsts } from "../API/keys";
import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  USERS_REDUCER_ACTION_TYPES,
} from "../store/actions/types";

import {
  changeIsAuthState,
  changeLoadingStateUsers,
  setCurrentUser,
} from "../store/actions/userActionCreator";

import {app} from "../API/firebase";

function* loginCurrentUser({ payload: { login, password, history }}) {
  try {
    yield put(changeLoadingStateUsers(true));
    const auth = yield app.auth();
    yield call(auth.signInWithEmailAndPassword, login, password);
    yield put(changeIsAuthState(true));
    yield history.push('/dashboard');
    yield put(changeLoadingStateUsers(false));

  } catch (error) {
    yield put(changeIsAuthState(false));
    yield put(changeLoadingStateUsers(false));
    console.error(error);
  }
}

function* registerNewUser({ payload: { login, password, history } }) {
  try {
    yield put(changeLoadingStateUsers(true));
    const { createUserWithEmailAndPassword } = yield app.auth();
    yield call(createUserWithEmailAndPassword, login, password);
    yield put(changeIsAuthState(true));
    yield history.push('/dashboard');
    yield put(changeLoadingStateUsers(false));

  } catch (error) {
    yield put(changeIsAuthState(false));
    yield put(changeLoadingStateUsers(false));
    console.error(error);
  }
}

function* userLoginSucceed({ payload: { user }}) {
  try {
    yield put(changeLoadingStateUsers(true));
    yield put(setCurrentUser(user));
    yield put(changeLoadingStateUsers(false));

  } catch (e) {
    yield put(changeIsAuthState(false));
    yield put(changeLoadingStateUsers(false));
    console.error(error);
  }
}

export function* usersSaga() {
  yield all([
    takeLatest(USERS_REDUCER_ACTION_TYPES.LOGIN_CURRENT_USER, loginCurrentUser),
    takeLatest(USERS_REDUCER_ACTION_TYPES.REGISTER_NEW_USER, registerNewUser),
    takeLatest(USERS_REDUCER_ACTION_TYPES.LOGIN_USER_SUCCEED, userLoginSucceed),
  ]);
}
