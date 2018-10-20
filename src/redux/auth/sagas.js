import { takeLatest, put, call } from 'redux-saga/effects';
import { setAuthToken } from '../../services/chuneAPI';
import { AUTH_ACTIONS } from './constants';
import {
  getDataHome,
  getDataForYou,
  getDataArtistsEventsOverall,
} from '../data/actions';

function* setToken(action) {
  yield call(setAuthToken, action.payload.token);
  yield put(getDataHome());
  yield put(getDataForYou());
  yield put(getDataArtistsEventsOverall());
  console.log('token for chune api has been set');
}

function* authSaga() {
  yield takeLatest(AUTH_ACTIONS.SET_TOKEN, setToken);
}

export default authSaga;
