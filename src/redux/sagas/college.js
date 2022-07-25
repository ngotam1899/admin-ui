import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import CollegeActions, { CollegeActionTypes } from '../actions/college'
import {
  getAllColleges,
  getDetailCollege,
  addCollege,
  updateCollege,
  updateSubjectPoint
} from '../apis/college'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllColleges, payload)
    const data = get(result, 'data')
    yield put(CollegeActions.onGetListSuccess(data.data, data.count))
  } catch (error) {
    yield put(CollegeActions.onGetListError(error))
  }
}

function* handleGetDetail({ payload }) {
  try {
    const result = yield call(getDetailCollege, payload)
    const data = get(result, 'data', {})
    yield put(CollegeActions.onGetDetailSuccess(data))
  } catch (error) {
    yield put(CollegeActions.onGetDetailError(error))
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addCollege, payload.data)
    const data = get(result, 'data', {})
    yield put(CollegeActions.onCreateSuccess(data))
    yield put(CollegeActions.onGetList(payload.params))
  } catch (error) {
    yield put(CollegeActions.onCreateError(error))
  }
}


/**
 *
 * update
 */
 function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateCollege, payload.data)
    var detailResult = yield call(getAllColleges, payload.params)
    yield put(CollegeActions.onUpdateSuccess(get(detailResult, 'data')))
    yield put(CollegeActions.onGetList(payload.params))
  } catch (error) {
    yield put(CollegeActions.onUpdateError(error))
  }
}

/**
 *
 * update subject point
 */
 function* handleUpdateSubjectPoint({ payload }) {
  try {
    const result = yield call(updateSubjectPoint, payload.data)
    yield put(CollegeActions.onUpdateSubjectPointSuccess(result))
    yield put(CollegeActions.onGetDetail(payload.college_id))
  } catch (error) {
    yield put(CollegeActions.onUpdateSubjectPointSuccess(error))
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(CollegeActionTypes.GET_LIST, handleGetList)
}
export function* watchGetDetail() {
  yield takeEvery(CollegeActionTypes.GET_DETAIL, handleGetDetail)
}
export function* watchCreate() {
  yield takeEvery(CollegeActionTypes.CREATE, handleCreate)
}
export function* watchUpdate() {
  yield takeEvery(CollegeActionTypes.UPDATE, handleUpdate)
}
export function* watchUpdateSubjectPoint() {
  yield takeEvery(CollegeActionTypes.UPDATE_SUBJECT_POINT, handleUpdateSubjectPoint)
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchUpdateSubjectPoint),
  ])
}
