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
  getContentForYouFirst,
  getContentForYouSecond,
} from '../../services/chuneAPI';
import { DATA_ACTIONS } from './constants';
import {
  getDataHome,
  setDataHome,
  getDataForYou,
  setDataForYou,
} from './actions';

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

function* getDataForYouWorker() {
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
    let data = yield call(getContentForYouFirst);
    if (
      data[Object.keys(data)[0]].length === 0
      && data[Object.keys(data)[1]].length === 0
    ) {
      data = yield call(getContentForYouSecond);
    }
    const { content_feed: contentFeed } = data;
    yield put(setDataForYou(contentFeed));
  } catch (err) {
    console.log(err);
  }
}

function* sagas() {
  yield takeLatest(DATA_ACTIONS.GET_DATA_HOME_REQUEST, getDataHomeWorker);
  yield takeLatest(DATA_ACTIONS.GET_DATA_FOR_YOU_REQUEST, getDataForYouWorker);
}

export default sagas;
