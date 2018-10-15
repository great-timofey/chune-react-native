import {
  takeLatest, takeEvery, call, select,
} from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';
import {
  API,
  setAuthToken,
  getTopTracks,
  getChuneSupplyTracks,
} from 'services/chuneAPI';
import { TRACKS_ACTIONS } from './constants';
import { AUTH_ACTIONS } from '../auth/constants';
// import { getTopTracks, getChuneSupplyTracks } from './requests';
import { setTracks } from './actions';

const rehydrate = ({ type, key }) => type === REHYDRATE && key === 'player';

function* getTracksWorker() {
  console.log('sdf');
  const token = yield select(state => state.auth.token);
  // API.post('token/verify', token)
  // .then(res => console.log(res))
  // .catch(err => console.log(err.response));
  // yield call()
  yield call(setAuthToken, token);
  const res = yield call(getTopTracks);
  console.log(1, res);
  // API.get('tracks/sources/1/')
  // .then(res => console.log(res))
  // .then(_ => API.get('tracks/sources/2/'))
  // .then(res => console.log(res))
  // .then(res => this.setState({ chuneSupply: res.data }))
  // .then(res => this.setState({ loading: false }))
  // .catch(err => console.log(err.response));
  // try {
  // const token = yield select(state => state.auth.token);
  // yield call(setAuthToken, token);
  // console.log(token);
  // const top = yield call(getTopTracks);
  // const supply = yield call(getChuneSupplyTracks);
  // yield setTracks([top, supply]);
  // } catch (err) {
  // console.log(err);
  // }
  // .then(res => this.setState({ topTracks: res.data }))
  // .then(_ => API.get('tracks/sources/2/'))
  // .then(res => this.setState({ chuneSupply: res.data }))
  // .then(res => this.setState({ loading: false }))
  // .catch(err => console.log(err.response));
}

function* sagas() {
  yield takeLatest(TRACKS_ACTIONS.GET_TRACKS, getTracksWorker);
  yield takeLatest(rehydrate, getTracksWorker);
}

export default sagas;
