import { authApi } from '@back-end/apis';
import { all, fork, select, call, put, takeLatest } from 'redux-saga/effects';
import { authActions, selectAccessToken } from './authSlice';

function* fetchRefreshToken() {
  const accessToken: string = yield select(selectAccessToken);
  if (!accessToken?.length) {
    yield put(authActions.logout());
    return;
  }

  const { accessToken: refreshToken } = yield call(authApi.fetchRefreshToken);
  yield put(authActions.setToken(refreshToken || ''));
}

function* fetchVisitor() {
  const accessToken: string = yield select(selectAccessToken);
  if (accessToken?.length) {
    const { visitor } = yield call(authApi.fetchVisitor);
    if (visitor?.id) {
      yield put(authActions.setVisitor(visitor));
    } else {
      yield put(authActions.logout());
    }
  } else {
    yield put(authActions.logout());
  }
}

function* watchAuth() {
  yield takeLatest(authActions.setToken.type, fetchVisitor);
}

function* watchRefreshToken() {
  yield takeLatest(authActions.refreshToken.type, fetchRefreshToken);
}

export function* authSaga() {
  yield all([fork(watchAuth), fork(watchRefreshToken)]);
}
