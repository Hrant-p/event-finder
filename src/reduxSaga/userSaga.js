import { all, call, put, takeLatest, take, cancelled, delay } from "redux-saga/effects";
import { eventChannel } from 'redux-saga';

import {
  USERS_REDUCER_ACTION_TYPES,
} from "../store/actions/types";

import {
  changeLoadingStateUsers,
  errorState,
  setCurrentUser,
} from "../store/actions/userActionCreator";

import { app } from "../API/firebase";

function getAuthChannel() {
  return eventChannel(emit => {
    return app.auth().onAuthStateChanged(user => emit({
      user
    }));
  });
}

function* watchForFirebaseAuth() {
  const authChannel = yield call(getAuthChannel);
  while (true) {
    const { user } = yield take(authChannel);
    yield put(setCurrentUser(user));
    if (yield cancelled()) {
      authChannel.close()
    }
  }
}

function* logOutUser() {
  try {
    yield put(changeLoadingStateUsers(true));
    yield app.auth().signOut();
    localStorage.removeItem('id');
    yield put(changeLoadingStateUsers(false));

  } catch (e) {
    yield put(changeLoadingStateUsers(false));
    yield put(errorState(e));
  } finally {
    yield delay(4000);
    yield put(errorState(null));
  }
}

function* loginCurrentUser({ payload: { login, password }}) {
  try {
    yield put(changeLoadingStateUsers(true));
    const auth = yield app.auth();
    yield auth.signInWithEmailAndPassword(login.trim(), password.trim());
    const token = yield auth.currentUser.getIdToken();
    localStorage.setItem('id', token);
    yield put(changeLoadingStateUsers(false));

  } catch (error) {
    yield put(changeLoadingStateUsers(false));
    yield put(errorState(error));
  } finally {
    yield delay(4000);
    yield put(errorState(null));
  }
}

function* registerNewUser({ payload: { login, password, password2 } }) {
  try {
    if (password !== password2) {
      throw new Error("Passwords doesn't match");
    }
    yield put(changeLoadingStateUsers(true));
    const auth = yield app.auth();
    yield auth.createUserWithEmailAndPassword(login.trim(), password.trim());
    const token = yield auth.currentUser.getIdToken();
    localStorage.setItem('id', token);
    yield put(changeLoadingStateUsers(false));

  } catch (error) {
    yield put(changeLoadingStateUsers(false));
    yield put(errorState(error));
  } finally {
    yield delay(4000);
    yield put(errorState(null));
  }
}

export function* usersSaga() {
  yield all([
    takeLatest(USERS_REDUCER_ACTION_TYPES.LOGIN_CURRENT_USER, loginCurrentUser),
    takeLatest(USERS_REDUCER_ACTION_TYPES.REGISTER_NEW_USER, registerNewUser),
    takeLatest(USERS_REDUCER_ACTION_TYPES.WATCH_FOR_FIREBASE_AUTH, watchForFirebaseAuth),
    takeLatest(USERS_REDUCER_ACTION_TYPES.LOGOUT_USER, logOutUser),
  ]);
}
