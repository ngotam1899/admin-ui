import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import TestActions, { TestActionTypes } from '../actions/test'
import { getAllTest, getDetailTest, addTest, updateTest, deleteTest } from '../apis/test'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllTest, payload)
    const data = get(result, 'data')
    yield put(TestActions.onGetListSuccess(data.data, data.count))
  } catch (error) {
    yield put(TestActions.onGetListError(error))
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailTest, id)
    const data = get(result, 'data', {})
    yield put(TestActions.onGetDetailSuccess(data.ad))
  } catch (error) {
    yield put(TestActions.onGetDetailError(error))
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addTest, payload.data)
    const data = get(result, 'data', {})
    if (data.code !== 201) throw data
    yield put(TestActions.onCreateSuccess(data.ad))
    yield put(TestActions.onGetList(payload.params))
  } catch (error) {
    yield put(TestActions.onCreateError(error))
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateTest, payload.data, payload.id)
    const data = get(result, 'data', {})
    if (data.code !== 200) throw data
    var detailResult = yield call(getAllTest, payload.id)
    yield put(TestActions.onUpdateSuccess(get(detailResult, 'data.ad')))
    yield put(TestActions.onGetList(payload.params))
  } catch (error) {
    yield put(TestActions.onUpdateError(error))
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id, params }) {
  try {
    const result = yield call(deleteTest, id)
    const data = get(result, 'data', {})
    if (data.code !== 200) throw data
    yield put(TestActions.onDeleteSuccess(data))
    yield put(TestActions.onGetList(params))
  } catch (error) {
    yield put(TestActions.onDeleteError(error))
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(TestActionTypes.GET_LIST, handleGetList)
}
export function* watchGetDetail() {
  yield takeEvery(TestActionTypes.GET_DETAIL, handleGetDetail)
}
export function* watchCreate() {
  yield takeEvery(TestActionTypes.CREATE, handleCreate)
}
export function* watchUpdate() {
  yield takeEvery(TestActionTypes.UPDATE, handleUpdate)
}
export function* watchDelete() {
  yield takeEvery(TestActionTypes.DELETE, handleDelete)
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete),
  ])
}
