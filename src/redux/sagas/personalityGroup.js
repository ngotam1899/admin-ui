import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import PGActions, { PGActionTypes } from '../actions/personalityGroup'
import {
  getAllPersonalityGroup,
  getDetailPersonalityGroup,
  addPersonalityGroup,
  updatePersonalityGroup,
  deletePersonalityGroup,
} from '../apis/personalityGroup'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllPersonalityGroup, payload)
    const data = get(result, 'data')
    yield put(PGActions.onGetListSuccess(data.data, data.count))
  } catch (error) {
    yield put(PGActions.onGetListError(error))
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailPersonalityGroup, id)
    const data = get(result, 'data', {})
    yield put(PGActions.onGetDetailSuccess(data))
  } catch (error) {
    yield put(PGActions.onGetDetailError(error))
  }
}
/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updatePersonalityGroup, payload.data, payload.id)
    const data = get(result, 'data', {})
    var detailResult = yield call(getAllPersonalityGroup, payload.id)
    yield put(PGActions.onUpdateSuccess(get(detailResult, 'data.ad')))
    yield put(PGActions.onGetList(payload.params))
  } catch (error) {
    yield put(PGActions.onUpdateError(error))
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(PGActionTypes.GET_LIST, handleGetList)
}
export function* watchGetDetail() {
  yield takeEvery(PGActionTypes.GET_DETAIL, handleGetDetail)
}
export function* watchUpdate() {
  yield takeEvery(PGActionTypes.UPDATE, handleUpdate)
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchGetDetail), fork(watchUpdate)])
}
