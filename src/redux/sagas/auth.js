import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import AuthorizationActions, { AuthorizationActionTypes } from '../actions/auth'
import { loginAccount } from '../apis/auth'

/**
 *
 * login
 */

function* handleLogin({ payload }) {
  try {
    const result = yield call(loginAccount, payload)
    const data = get(result, 'data', {})
    if (result.status !== 200) throw data
    localStorage.setItem('AUTH_USER', data.token)
    yield put(AuthorizationActions.onLoginSuccess(data))
  } catch (error) {
    yield put(AuthorizationActions.onLoginError(error))
  }
}

/**
 *
 */

export function* watchLogin() {
  yield takeEvery(AuthorizationActionTypes.LOGIN, handleLogin)
}
export default function* rootSaga() {
  yield all([fork(watchLogin)])
}
