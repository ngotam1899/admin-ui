import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import UserActions, { UserActionTypes } from '../actions/user'
import { getAllUser, getDetailUser } from '../apis/user'
import { getAllAnswersByQuestionID } from '../apis/answer'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllAnswersByQuestionID, payload)
    const data = get(result, 'data')
    yield put(UserActions.onGetListSuccess(data))
  } catch (error) {
    yield put(UserActions.onGetListError(error))
  }
}

function* handleGetDetail({ id }) {
  try {
    const result = yield call(getDetailUser, id)
    const data = get(result, 'data', {})
    yield put(UserActions.onGetDetailSuccess(data))
  } catch (error) {
    yield put(UserActions.onGetDetailError(error))
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
    yield put(UserActions.onCreateSuccess(data.ad))
    yield put(UserActions.onGetList(payload.params))
  } catch (error) {
    yield put(UserActions.onCreateError(error))
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
    yield put(UserActions.onUpdateSuccess(get(detailResult, 'data.ad')))
    yield put(UserActions.onGetList(payload.params))
  } catch (error) {
    yield put(UserActions.onUpdateError(error))
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
    yield put(UserActions.onDeleteSuccess(data))
    yield put(UserActions.onGetList(params))
  } catch (error) {
    yield put(UserActions.onDeleteError(error))
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(UserActionTypes.GET_LIST, handleGetList)
}
export function* watchGetDetail() {
  yield takeEvery(UserActionTypes.GET_DETAIL, handleGetDetail)
}
export function* watchCreate() {
  yield takeEvery(UserActionTypes.CREATE, handleCreate)
}
export function* watchUpdate() {
  yield takeEvery(UserActionTypes.UPDATE, handleUpdate)
}
export function* watchDelete() {
  yield takeEvery(UserActionTypes.DELETE, handleDelete)
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
