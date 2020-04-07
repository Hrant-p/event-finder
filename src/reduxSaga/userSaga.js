import { all, call, put, takeLatest, take } from "redux-saga/effects";

import {
  USERS_REDUCER_ACTION_TYPES,
} from "../store/actions/types";

import {
  changeIsAuthState,
  changeLoadingStateUsers,
  setCurrentUser,
} from "../store/actions/userActionCreator";

import {app} from "../API/firebase";
import {eventChannel, END} from 'redux-saga';
import {cancelled} from "@redux-saga/core/effects";

function getAuthChannel() {
  return eventChannel(emit => {
    return app.auth().onAuthStateChanged(user => emit({ user }));
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

function* loginCurrentUser({ payload: { login, password }}) {
  try {
    yield put(changeLoadingStateUsers(true));
    const auth = yield app.auth();
    yield auth.signInWithEmailAndPassword(login, password);
    yield put(changeIsAuthState(true));
    const token = yield auth.currentUser.getIdToken();
    localStorage.setItem('id', token);
    yield put(changeLoadingStateUsers(false));

  } catch (error) {
    yield put(changeIsAuthState(false));
    yield put(changeLoadingStateUsers(false));
    console.error(error);
  }
}

function* registerNewUser({ payload: { login, password } }) {
  try {
    yield put(changeLoadingStateUsers(true));
    const auth = yield app.auth();
    yield auth.createUserWithEmailAndPassword(login, password);
    yield put(changeIsAuthState(true));
    yield put(changeLoadingStateUsers(false));

  } catch (error) {
    yield put(changeIsAuthState(false));
    yield put(changeLoadingStateUsers(false));
    console.error(error);
  }
}

export function* usersSaga() {
  yield all([
    takeLatest(USERS_REDUCER_ACTION_TYPES.LOGIN_CURRENT_USER, loginCurrentUser),
    takeLatest(USERS_REDUCER_ACTION_TYPES.REGISTER_NEW_USER, registerNewUser),
    takeLatest(USERS_REDUCER_ACTION_TYPES.WATCH_FOR_FIREBASE_AUTH, watchForFirebaseAuth),
  ]);
}
