import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import UserActions, { UserActionTypes } from '../actions/user'
import { getAllUser, getDetailUser, updateUser, updateRoleUser, createConnector } from '../apis/user'
import {
  addTest,
} from '../apis/test'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllUser, payload)
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
    const result = yield call(updateUser, payload.data)
    var detailResult = yield call(getAllUser, payload)
    yield put(UserActions.onUpdateSuccess(get(detailResult, 'data')))
    yield put(UserActions.onGetList(payload.params))
  } catch (error) {
    yield put(UserActions.onUpdateError(error))
  }
}

/**
 *
 * update role
 */
function* handleUpdateRole({ payload }) {
  console.log(payload)
  try {
    const result = yield call(updateRoleUser, payload.account_id, payload.role_id, payload.college_id)
    
    var detailResult = yield call(getAllUser, payload)
    yield put(UserActions.onUpdateRoleSuccess(get(detailResult, 'data')))
    yield put(UserActions.onGetList(payload.params))
  } catch (error) {
    yield put(UserActions.onUpdateRoleError(error))
  }
}

/**
 *
 * create connector
 */
 function* handleCreateConnector({ payload }) {
  try {
    const result = yield call(createConnector, payload.data)
    const data = get(result, 'data', {})
    yield put(UserActions.onCreateConnectorSuccess(data))
    yield put(UserActions.onGetList())
  } catch (error) {
    yield put(UserActions.onCreateConnectorError(error))
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
export function* watchUpdateRole() {
  yield takeEvery(UserActionTypes.UPDATE_ROLE, handleUpdateRole)
}
export function* watchCreateConnector() {
  yield takeEvery(UserActionTypes.CREATE_CONNECTOR, handleCreateConnector)
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchUpdateRole),
    fork(watchCreateConnector)
  ])
}
