import {
  takeLatest, takeEvery, call, select, put,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { REHYDRATE } from 'redux-persist/lib/constants';

import {
  API,
  searchArtist,
  getTopTracks,
  setAuthToken,
  followArtist,
  getArtistData,
  unfollowArtist,
  getHomeContent,
  verifyAuthToken,
  getArtistEvents,
  getTracksOfChosenType,
  getContentForYouFirst,
  getContentForYouSecond,
  getContentFollowedRecommended,
} from '../../services/chuneAPI';
import { DATA_ACTIONS } from './constants';
import {
  getDataHome,
  setDataHome,
  getDataForYou,
  setDataForYou,
  requestSearchArtist,
  setSearchArtistResult,
  setSearchArtistLoading,
  getDataArtistsEventsSingle,
  setDataArtistsEventsSingle,
  getDataArtistsEventsOverall,
  setDataArtistsEventsOverall,
  artistsEventsControlLoading,
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

function* getDataArtistsEventsSingleWorker({ payload: { artistName } }) {
  try {
    yield put(artistsEventsControlLoading(true));

    /* const name = 'tim2';
    const email = 'tim2@mail.com';
    const password = 'aA12345';
    const user = JSON.stringify({
      name,
      email,
      password,
    }); */

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

    const artistResponse = yield call(getArtistData, artistName);
    const { artist, content: media } = artistResponse;
    const artistEventsResponse = yield call(getArtistEvents, artist.id);
    const { data: events } = artistEventsResponse;
    yield put(
      setDataArtistsEventsSingle(
        artist,
        media.slice(0, 20),
        events.slice(0, 20),
      ),
    );
    yield put(artistsEventsControlLoading(false));
  } catch (err) {
    alert('Error artist data');
    yield put(setDataArtistsEventsSingle(null));
    yield put(artistsEventsControlLoading(false));
  }
}

function* getDataArtistsEventsOverallWorker() {
  try {
    yield put(artistsEventsControlLoading(true));

    const name = 'tim2';
    const email = 'tim2@mail.com';
    const password = 'aA12345';
    const user = JSON.stringify({
      name,
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
    // this.setState({ loading: true });
    const { artists: followed, recommended } = yield call(
      getContentFollowedRecommended,
    );
    yield put(setDataArtistsEventsOverall(followed, recommended.slice(0, 5)));
    yield put(artistsEventsControlLoading(false));
  } catch (err) {
    console.log(err);
  }
}

function* artistFollowingWorker({ type, payload: { artist } }) {
  try {
    yield put(artistsEventsControlLoading(true));
    if (type === DATA_ACTIONS.FOLLOW_ARTIST_REQUEST) {
      const response = yield call(followArtist, artist);
      const successful = response === 'success';
      alert(
        successful
          ? 'Artist has been successfully added to Followed'
          : 'Artist Following Error',
      );
      if (successful) yield put(getDataArtistsEventsOverall());
    } else if (type === DATA_ACTIONS.UNFOLLOW_ARTIST_REQUEST) {
      const response = yield call(unfollowArtist, artist);
      const successful = response === 'success';
      alert(
        successful
          ? 'Artist has been successfully removed from Followed'
          : 'Artist Unfollowing Error',
      );
      if (successful) yield put(getDataArtistsEventsOverall());
    }
    yield put(artistsEventsControlLoading(false));
  } catch (err) {
    yield put(artistsEventsControlLoading(false));
    console.log(err);
  }
}

function* searchArtistWorker({ payload: { artistName } }) {
  try {
    yield delay(300);
    yield put(setSearchArtistLoading(true));
    if (artistName !== '') {
      const token = yield select(state => state.auth.token);
      yield call(setAuthToken, token);
      const response = yield searchArtist(artistName);
      yield put(setSearchArtistResult(response));
    } else {
      yield put(setSearchArtistResult([]));
    }
    yield put(setSearchArtistLoading(false));
  } catch (err) {
    yield put(setSearchArtistResult([]));
    yield put(setSearchArtistLoading(false));
    console.log(err);
  }
}

function* sagas() {
  yield takeLatest(DATA_ACTIONS.GET_DATA_HOME_REQUEST, getDataHomeWorker);
  yield takeLatest(DATA_ACTIONS.GET_DATA_FOR_YOU_REQUEST, getDataForYouWorker);
  yield takeLatest(
    DATA_ACTIONS.GET_DATA_ARTISTS_EVENTS_OVERALL_REQUEST,
    getDataArtistsEventsOverallWorker,
  );
  yield takeLatest(
    DATA_ACTIONS.GET_DATA_ARTISTS_EVENTS_SINGLE_REQUEST,
    getDataArtistsEventsSingleWorker,
  );
  yield takeLatest(DATA_ACTIONS.FOLLOW_ARTIST_REQUEST, artistFollowingWorker);
  yield takeLatest(DATA_ACTIONS.UNFOLLOW_ARTIST_REQUEST, artistFollowingWorker);
  yield takeLatest(DATA_ACTIONS.SEARCH_ARTIST_REQUEST, searchArtistWorker);
  // yield takeLatest(rehydrate, getDataArtistsEventsSingleWorker);
}

export default sagas;
