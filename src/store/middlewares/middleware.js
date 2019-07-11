import { all, call } from 'redux-saga/effects';
import { usersSaga } from "../../reduxSaga/userSaga";

export default function* middleware () {
    yield all([ 
            call(usersSaga)
        ])
};

