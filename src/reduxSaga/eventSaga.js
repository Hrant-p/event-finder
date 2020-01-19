import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';
import {
  changeLoadingStateEvents,
  searchEventsSucceed,
} from '../store/actions/eventActionCreators';
import { request } from '../services/requestService';
import { constructUrl } from '../API/helpers';
import { eventAPI, apiConsts } from '../API/keys';
import { SEARCH_EVENTS_ACTION_TYPES } from '../store/actions/types';

function* getSearchEventsResult({ payload: { name, location } }) {
  try {
    yield put(changeLoadingStateEvents(true));

    const { data } = yield call(
      request,
      'GET',
      constructUrl([apiConsts.urlForEvent],
        {
          q: name,
          token: eventAPI.PRIVATE_API_KEY,
          expand: 'venue',
          'location.address': location,
        }),
    );

    const eventdata = yield data.events.map(event => ({
      name: event.name.text,
      id: event.id,
      location: {
        lat: event.venue.latitude,
        lng: event.venue.longitude,
      },
    }));


    yield put(searchEventsSucceed(eventdata));
    yield put(changeLoadingStateEvents(false));
  } catch (e) {
    console.log(e);
    yield put(changeLoadingStateEvents(false));
    alert('Wrong search! Type only correct addreses!');
  }
}

export default function* eventSaga() {
  yield all([
    takeLatest(SEARCH_EVENTS_ACTION_TYPES.GET_SEARCH_EVENTS,
      getSearchEventsResult),
  ]);
}
