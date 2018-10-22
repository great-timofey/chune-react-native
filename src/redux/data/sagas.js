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
import { tabNavigate, toggleGlobalLoading } from '../common/actions';

const rehydrate = ({ type, key }) => type === REHYDRATE && key === 'data';

function* getDataHomeWorker() {
  try {
    const { featured, content_feed: contentFeed } = yield call(getHomeContent);
    yield put(setDataHome(featured, contentFeed));
  } catch (err) {
    console.log(err);
  }
}

function* getDataForYouWorker() {
  try {
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
  const isLoading = yield select(state => state.common.loading);
  const currentTabIndex = yield select(state => state.common.activeTabIndex);
  const isNeedOfGlobalLoading = currentTabIndex !== 2;
  try {
    if (isNeedOfGlobalLoading) {
      yield put(toggleGlobalLoading());
    } else {
      yield put(artistsEventsControlLoading(true));
    }

    const artistResponse = yield call(getArtistData, artistName);
    const { artist, content: media } = artistResponse;
    const artistEventsResponse = yield call(getArtistEvents, artist.id);
    const { data: events } = artistEventsResponse;
    // console.log(artistResponse);
    // console.log(artistEventsResponse);
    yield put(
      setDataArtistsEventsSingle(
        artist,
        media.slice(0, 20),
        events.slice(0, 20),
      ),
    );
    if (currentTabIndex !== 2) {
      yield put(tabNavigate(2));
    }
    if (isNeedOfGlobalLoading) {
      yield put(toggleGlobalLoading());
    } else {
      yield put(artistsEventsControlLoading(false));
    }
  } catch (err) {
    alert('Error artist data');
    if (isNeedOfGlobalLoading && isLoading) {
      yield put(toggleGlobalLoading());
    } else {
      yield put(artistsEventsControlLoading(false));
    }
  }
}

function* getDataArtistsEventsOverallWorker() {
  try {
    const isAuthIn = yield select(state => state.auth.isLoggedIn);
    if (isAuthIn) {
      yield put(artistsEventsControlLoading(true));
      const { artists: followed, recommended } = yield call(
        getContentFollowedRecommended,
      );
      yield put(setDataArtistsEventsOverall(followed, recommended.slice(0, 5)));
      yield put(artistsEventsControlLoading(false));
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(artistsEventsControlLoading(false));
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
  } catch (err) {
    console.log(err);
  } finally {
    yield put(artistsEventsControlLoading(false));
  }
}

function* searchArtistWorker({ payload: { artistName } }) {
  try {
    yield delay(300);
    yield put(setSearchArtistLoading(true));
    if (artistName !== '') {
      const response = yield searchArtist(artistName);
      yield put(setSearchArtistResult(response));
    } else {
      yield put(setSearchArtistResult([]));
    }
  } catch (err) {
    yield put(setSearchArtistResult([]));
    console.log(err);
  } finally {
    yield put(setSearchArtistLoading(false));
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
  yield takeLatest(rehydrate, getDataArtistsEventsOverallWorker);
}

export default sagas;
