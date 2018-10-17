import {
  takeLatest, takeEvery, call, select, put,
} from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';
import Spotify from 'rn-spotify-sdk';
import {
  API,
  setAuthToken,
  getTracksOfChosenType,
  // getTopTracks,
  // getChuneSupplyTracks,
} from '../../services/chuneAPI';
import {
  setTracks,
  setTracksTypes,
  togglePlaying,
  setCurrentTrack,
  getPlaybackData,
  setPlaybackData,
  setCurrentTracks,
} from './actions';
import { TRACKS_ACTIONS } from './constants';
import { AUTH_ACTIONS } from '../auth/constants';
import { spotifyAuthOptions } from '../../services/auth';

const rehydrate = ({ type, key }) => type === REHYDRATE && key === 'player';

function* getTracksWorker() {
  // API.post('token/verify', token)
  // .then(res => console.log(res))
  // .catch(err => console.log(err.response));
  try {
    const token = yield select(state => state.auth.token);
    yield Spotify.initialize(spotifyAuthOptions);
    yield call(setAuthToken, token);
    const isInitialized = yield Spotify.isInitializedAsync();
    // console.log('is spotify initialized? ', isInitialized);
    if (!isInitialized) {
      yield Spotify.initialize(spotifyAuthOptions);
    }
    const firstSectionTracks = yield call(getTracksOfChosenType, 'topTracks');
    const secondSectionTracks = yield call(
      getTracksOfChosenType,
      'chuneSupply',
    );
    const tracks = { firstSectionTracks, secondSectionTracks };
    yield put(setTracks(tracks));
    yield put(getPlaybackData());
  } catch (err) {
    console.log(err);
  }
}

function* setTrackWorker(action) {
  try {
    yield Spotify.playURI(
      `spotify:track:${action.payload.currentTrack.spotify_id}`,
      0,
      0,
    );
    yield put(getPlaybackData());
  } catch (err) {
    console.log(err);
  }
}

function* togglePlayingWorker() {
  try {
    const playbackData = yield select(state => state.player.playbackData);
    yield Spotify.setPlaying(!playbackData.playing);
    yield put(getPlaybackData());
  } catch (err) {
    console.log(err);
  }
}

function* getPlaybackDataWorker() {
  try {
    const playbackData = yield Spotify.getPlaybackStateAsync();
    yield put(setPlaybackData(playbackData));
  } catch (err) {
    console.log(err);
  }
}

function* sagas() {
  yield takeLatest(TRACKS_ACTIONS.TOGGLE_PLAYING, togglePlayingWorker);
  yield takeLatest(TRACKS_ACTIONS.GET_TRACKS, getTracksWorker);
  yield takeLatest(TRACKS_ACTIONS.SET_CURRENT_TRACK, setTrackWorker);
  yield takeLatest(TRACKS_ACTIONS.GET_PLAYBACK_DATA, getPlaybackDataWorker);
  yield takeLatest(rehydrate, getTracksWorker);
}

export default sagas;
