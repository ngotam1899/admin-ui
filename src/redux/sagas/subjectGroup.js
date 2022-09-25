import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import SGActions, { SGActionTypes } from '../actions/subjectGroup'
import { getAllSubjectGroup } from '../apis/subjectGroup'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllSubjectGroup, payload)
    const data = get(result, 'data')
    yield put(SGActions.onGetListSuccess(data.data, data.count))
  } catch (error) {
    yield put(SGActions.onGetListError(error))
  }
}
/**
 *
 */

export function* watchGetList() {
  yield takeEvery(SGActionTypes.GET_LIST, handleGetList)
}

export default function* rootSaga() {
  yield all([fork(watchGetList)])
}
