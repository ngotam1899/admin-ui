import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import MajorActions, { MajorActionTypes } from '../actions/major'
import {
  getAllMajor,
} from '../apis/major'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllMajor, payload)
    const data = get(result, 'data')
    yield put(MajorActions.onGetListSuccess(data.data, data.count))
  } catch (error) {
    yield put(MajorActions.onGetListError(error))
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(MajorActionTypes.GET_LIST, handleGetList)
}

export default function* rootSaga() {
  yield all([fork(watchGetList)])
}
