import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import QuestionActions, { QuestionActionTypes } from '../actions/question'
import { getQuestionByTestID, addQuestionByTestID } from '../apis/question'
import {
  getAllPersonalityGroup,
  getDetailPersonalityGroup,
  addPersonalityGroup,
  updatePersonalityGroup,
  deletePersonalityGroup,
} from '../apis/personalityGroup'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getQuestionByTestID, payload.test_id, payload.params)
    const data = get(result, 'data')
    yield put(QuestionActions.onGetListSuccess(data.data, data.count))
  } catch (error) {
    yield put(QuestionActions.onGetListError(error))
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailPersonalityGroup, id)
    const data = get(result, 'data', {})
    yield put(QuestionActions.onGetDetailSuccess(data.ad))
  } catch (error) {
    yield put(QuestionActions.onGetDetailError(error))
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  console.log(payload)
  try {
    const result = yield call(addQuestionByTestID, payload.test_id, payload.data)
    const data = get(result, 'data', {})
    if (data.code !== 201) throw data
    yield put(QuestionActions.onCreateSuccess(data.ad))
    yield put(QuestionActions.onGetList(payload.params))
  } catch (error) {
    yield put(QuestionActions.onCreateError(error))
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
    if (data.code !== 200) throw data
    var detailResult = yield call(getAllPersonalityGroup, payload.id)
    yield put(QuestionActions.onUpdateSuccess(get(detailResult, 'data.ad')))
    yield put(QuestionActions.onGetList(payload.params))
  } catch (error) {
    yield put(QuestionActions.onUpdateError(error))
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id, params }) {
  try {
    const result = yield call(deletePersonalityGroup, id)
    const data = get(result, 'data', {})
    if (data.code !== 200) throw data
    yield put(QuestionActions.onDeleteSuccess(data))
    yield put(QuestionActions.onGetList(params))
  } catch (error) {
    yield put(QuestionActions.onDeleteError(error))
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(QuestionActionTypes.GET_LIST, handleGetList)
}
export function* watchGetDetail() {
  yield takeEvery(QuestionActionTypes.GET_DETAIL, handleGetDetail)
}
export function* watchCreate() {
  yield takeEvery(QuestionActionTypes.CREATE, handleCreate)
}
export function* watchUpdate() {
  yield takeEvery(QuestionActionTypes.UPDATE, handleUpdate)
}
export function* watchDelete() {
  yield takeEvery(QuestionActionTypes.DELETE, handleDelete)
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
