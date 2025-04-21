import { all, fork } from 'redux-saga/effects';
import authSaga from './authSaga';
import pageSaga from './pageSaga';

// Root saga
export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(pageSaga),
  ]);
}