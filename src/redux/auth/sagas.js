import { takeLatest } from 'redux-saga/effects';
import { setAuthToken } from '../../services/chuneAPI';
import { AUTH_ACTIONS } from './constants';

function* setToken(action) {
  yield setAuthToken(action.payload.token);
  console.log('token for chune api has been set');
}

function* authSaga() {
  yield takeLatest(AUTH_ACTIONS.SET_TOKEN, setToken);
}

export default authSaga;
