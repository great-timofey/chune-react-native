import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { setAuthToken } from '../../services/chuneAPI';
import { AUTH_ACTIONS } from './constants';
import {
  getDataHome,
  getDataForYou,
  getDataArtistsEventsOverall,
} from '../data/actions';

const rehydrate = ({ type, key }) => type === REHYDRATE && key === 'data';

function* tokenWorker() {
  const token = yield select(state => state.auth.token);
  yield call(setAuthToken, token);
}

function* enterAppWorker(action) {
  yield call(setAuthToken, action.payload.token);
  yield put(getDataHome());
  yield put(getDataForYou());
  yield put(getDataArtistsEventsOverall());
  console.log('token for chune api has been set');
}

function* authSaga() {
  yield takeLatest(AUTH_ACTIONS.SET_TOKEN, enterAppWorker);
  yield takeLatest(rehydrate, tokenWorker);
}

export default authSaga;
