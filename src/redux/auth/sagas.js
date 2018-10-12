import {
  takeLatest,
} from 'redux-saga/effects';
import { AUTH_ACTIONS } from './constants';

function* setToken() {
  yield console.log('setToken');
}

function* authSaga() {
  yield takeLatest(AUTH_ACTIONS.SET_TOKEN, setToken);
}

export default authSaga;
