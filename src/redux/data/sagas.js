import {
  takeLatest, takeEvery, call, select, put,
} from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';

import {
  API,
  setAuthToken,
  getHomeContent,
  getTopTracks,
  verifyAuthToken,
  getTracksOfChosenType,
} from '../../services/chuneAPI';
import { DATA_ACTIONS } from './constants';
import { getDataHome, setDataHome } from './actions';

const rehydrate = ({ type, key }) => type === REHYDRATE && key === 'data';

function* getDataHomeWorker() {
  try {
    const name = 'tim2';
    const email = 'tim2@mail.com';
    const password = 'aA12345';
    const user = JSON.stringify({
      // name,
      email,
      password,
    });

    const token = yield select(state => state.auth.token);
    yield call(setAuthToken, token);
    /* const jsonToken = JSON.stringify({ token });
     const rest = yield call(verifyAuthToken, jsonToken);
     console.log('response', rest);
     if (response.status === 400) {
      alert('');
    } else {
      yield call(setAuthToken, token);

      const content = yield call(getHomeContent);
      console.log(content);
     } */
    const { featured, content_feed: contentFeed } = yield call(getHomeContent);
    yield put(setDataHome(featured, contentFeed));
  } catch (err) {
    console.log(err);
  }
}

function* sagas() {
  yield takeLatest(DATA_ACTIONS.GET_DATA_HOME_REQUEST, getDataHomeWorker);
}

export default sagas;
