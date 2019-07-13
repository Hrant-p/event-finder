import { all, call } from 'redux-saga/effects';
import { usersSaga } from "../../reduxSaga/userSaga";
import { eventSaga } from '../../reduxSaga/eventSaga';

export default function* middleware () {
    yield all([ 
            call(usersSaga),
            call(eventSaga)
        ])
};


