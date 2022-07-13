import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import AnswerActions, { AnswerActionTypes } from '../actions/answer'
import {
  getAllAnswersByQuestionID,
  getDetailAnswer,
  addAnswerByQuestionID,
  updateAnswer,
} from '../apis/answer'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllAnswersByQuestionID, payload)
    const data = get(result, 'data')
    yield put(AnswerActions.onGetListSuccess(data))
  } catch (error) {
    yield put(AnswerActions.onGetListError(error))
  }
}

function* handleGetDetail({ payload }) {
  try {
    const result = yield call(getDetailAnswer, payload)
    const data = get(result, 'data', {})
    yield put(AnswerActions.onGetDetailSuccess(data))
  } catch (error) {
    yield put(AnswerActions.onGetDetailError(error))
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addAnswerByQuestionID, payload.question_id, payload.data)
    const data = get(result, 'data', {})
    yield put(AnswerActions.onCreateSuccess(data))
    yield put(AnswerActions.onGetList(payload.question_id))
  } catch (error) {
    yield put(AnswerActions.onCreateError(error))
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateAnswer, payload.answer_id, payload.data)
    const data = get(result, 'data', {})
    var detailResult = yield call(getAllAnswersByQuestionID, payload.question_id)
    yield put(AnswerActions.onUpdateSuccess(get(detailResult, 'data')))
    yield put(AnswerActions.onGetList(payload.question_id))
  } catch (error) {
    yield put(AnswerActions.onUpdateError(error))
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
    yield put(AnswerActions.onDeleteSuccess(data))
    yield put(AnswerActions.onGetList(params))
  } catch (error) {
    yield put(AnswerActions.onDeleteError(error))
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(AnswerActionTypes.GET_LIST, handleGetList)
}
export function* watchGetDetail() {
  yield takeEvery(AnswerActionTypes.GET_DETAIL, handleGetDetail)
}
export function* watchCreate() {
  yield takeEvery(AnswerActionTypes.CREATE, handleCreate)
}
export function* watchUpdate() {
  yield takeEvery(AnswerActionTypes.UPDATE, handleUpdate)
}
export function* watchDelete() {
  yield takeEvery(AnswerActionTypes.DELETE, handleDelete)
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
