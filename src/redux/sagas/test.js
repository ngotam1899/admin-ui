import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import TestActions, { TestActionTypes } from '../actions/test'
import {
  getAllTest,
  getAllType,
  getDetailTest,
  addTest,
  updateTest,
  deleteTest,
  statisticPersonalityGroup,
} from '../apis/test'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllTest, payload)
    const data = get(result, 'data')
    yield put(TestActions.onGetListSuccess(data.data, data.count))
  } catch (error) {
    yield put(TestActions.onGetListError(error))
  }
}

function* handleGetType({ payload }) {
  try {
    const result = yield call(getAllType, payload)
    const data = get(result, 'data')
    yield put(TestActions.onGetTypeSuccess(data))
  } catch (error) {
    yield put(TestActions.onGetTypeError(error))
  }
}

function* handleGetDetail({ payload }) {
  try {
    const result = yield call(getDetailTest, payload)
    const data = get(result, 'data', {})
    yield put(TestActions.onGetDetailSuccess(data))
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
    const result = yield call(addTest, payload.type_id, payload.data)
    const data = get(result, 'data', {})
    yield put(TestActions.onCreateSuccess(data))
    yield put(TestActions.onGetList())
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
    console.log(payload)
    const result = yield call(updateTest, payload.id, payload.data)
    var detailResult = yield call(getAllTest, payload.id)
    yield put(TestActions.onUpdateSuccess(get(detailResult, 'data')))
    yield put(TestActions.onGetList())
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
 * statistic personality group
 */
function* handleStatisticPG() {
  try {
    const result = yield call(statisticPersonalityGroup)
    const data = get(result, 'data')
    yield put(TestActions.onStatisticPGSuccess(data))
  } catch (error) {
    yield put(TestActions.onStatisticPGError(error))
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(TestActionTypes.GET_LIST, handleGetList)
}
export function* watchGetType() {
  yield takeEvery(TestActionTypes.GET_TYPE, handleGetType)
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
export function* watchStatisticPG() {
  yield takeEvery(TestActionTypes.STATISTIC_PG, handleStatisticPG)
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetType),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete),
    fork(watchStatisticPG),
  ])
}
