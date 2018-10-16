import {
  takeLatest, takeEvery, call, select, put,
} from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';
import {
  API,
  setAuthToken,
  getTopTracks,
  getChuneSupplyTracks,
} from 'services/chuneAPI';
import Spotify from 'rn-spotify-sdk';
import { setTracks, setCurrentTrack } from './actions';
import { TRACKS_ACTIONS } from './constants';
import { AUTH_ACTIONS } from '../auth/constants';
import { spotifyAuthOptions } from '~services/auth';

const rehydrate = ({ type, key }) => type === REHYDRATE && key === 'player';

function* getTracksWorker() {
  // API.post('token/verify', token)
  // .then(res => console.log(res))
  // .catch(err => console.log(err.response));
  try {
    const token = yield select(state => state.auth.token);
    yield call(setAuthToken, token);
    const topTracks = yield call(getTopTracks);
    const chuneSupply = yield call(getChuneSupplyTracks);
    const tracks = { topTracks, chuneSupply };
    yield put(setTracks(tracks));
  } catch (err) {
    console.log(err);
  }
}

function* setTrackWorker(action) {
  try {
    const isInitialized = yield Spotify.isInitializedAsync();
    const trackUri = action.payload.currentTrack.url.slice(-22);
    console.log('is spotify initialized? ', isInitialized);
    if (isInitialized) {
      yield Spotify.getMe();
      yield Spotify.playURI(`spotify:track:${trackUri}`, 0, 0);
    } else {
      yield Spotify.initialize(spotifyAuthOptions);
      yield Spotify.getMe();
      yield Spotify.playURI(`spotify:track:${trackUri}`, 0, 0);
    }
  } catch (err) {
    console.log(err);
  }
}

function* sagas() {
  yield takeLatest(TRACKS_ACTIONS.GET_TRACKS, getTracksWorker);
  yield takeLatest(TRACKS_ACTIONS.SET_CURRENT_TRACK, setTrackWorker);
  yield takeLatest(rehydrate, getTracksWorker);
}

export default sagas;
