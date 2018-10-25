import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import { REHYDRATE } from 'redux-persist/lib/constants';
import {
  signIn,
  signUp,
  setChuneAuthToken,
  clearChuneAuthToken,
  verifyChuneAuthToken,
  refreshChuneAuthToken,
} from '../../services/chuneAPI';
import { AUTH_ACTIONS } from './constants';
import { setChuneToken, successSignInUser, successSignUpUser } from './actions';
import {
  getDataHome,
  getDataForYou,
  getDataArtistsEventsOverall,
} from '../data/actions';
import { toggleGlobalLoading, setError } from '../common/actions';

const rehydrate = ({ type, key }) => type === REHYDRATE && key === 'auth';

function* tokenWorker() {
  const isLoggedIn = yield select(state => state.auth.isLoggedIn);
  if (isLoggedIn) {
    try {
      const token = yield select(state => state.auth.chuneToken);
      yield call(setChuneAuthToken, token);
      const jsonedToken = JSON.stringify({ token });
      const response = yield call(verifyChuneAuthToken, jsonedToken);
      if (response.token === token) {
        console.log('chune token is valid, no need to refresh');
      }
    } catch (err) {
      console.log('chune token invalid');
      console.log(err.response);
    }
  }
}

function* authWorker({ type: actionType, payload: { user } }) {
  const { name = '', email, password } = user;
  const jsonedUser = JSON.stringify({
    name,
    email,
    password,
  });
  yield put(toggleGlobalLoading());
  const isSignUp = actionType === AUTH_ACTIONS.SIGN_UP_REQUEST;
  try {
    const response = yield call(
      isSignUp ? signUp : signIn,
      isSignUp ? user : jsonedUser,
    );
    const token = isSignUp ? response.token : response.data.token;
    yield put(setChuneToken(token));
    yield call(setChuneAuthToken, token);
    yield put(isSignUp ? successSignUpUser() : successSignInUser());
  } catch (err) {
    console.log(err.response);
    const {
      response: { data },
    } = err;
    let msg = '';
    for (key in data) {
      data[key].forEach((item) => {
        if (item === 'This field must be unique.') {
          msg += `This ${key} already in use.\n`;
          return;
        }
        if (item === 'This field may not be blank.') {
          msg += `${key[0].toUpperCase().concat(key.slice(1))} : ${item}\n`;
          return;
        }
        if (item === 'Unable to log in with provided credentials.') {
          msg += 'Email or password is incorrect.';
          return;
        }
        msg += `${item}\n`;
      });
    }
    msg = msg.slice(0, msg.length - 1);
    yield put(setError(msg));
    yield put(toggleGlobalLoading());
  }
}

function* getAppDataWorker() {
  const isGlobalLoading = yield select(state => state.common.loading);
  yield put(getDataHome());
  yield put(getDataForYou());
  yield put(getDataArtistsEventsOverall());
  if (isGlobalLoading) yield put(toggleGlobalLoading());
}

function* logoutWorker() {
  yield call(clearChuneAuthToken);
}

function* authSaga() {
  yield takeLatest(rehydrate, tokenWorker);
  yield takeLatest(AUTH_ACTIONS.LOGOUT, logoutWorker);
  yield takeLatest(AUTH_ACTIONS.SIGN_IN_REQUEST, authWorker);
  yield takeLatest(AUTH_ACTIONS.SIGN_UP_REQUEST, authWorker);
  yield takeLatest(AUTH_ACTIONS.SIGN_IN_SUCCESS, getAppDataWorker);
  yield takeLatest(AUTH_ACTIONS.SIGN_UP_SUCCESS, getAppDataWorker);
}

export default authSaga;
