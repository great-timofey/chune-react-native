import { put, call, fork, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

function* startup(action) {

}


export default function* rootSaga() {
  yield fork(startup);
}