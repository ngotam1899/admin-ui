import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import CollegeActions, { CollegeActionTypes } from '../actions/college'
import {
  getAllColleges,
  getDetailCollege,
  addCollege
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
    const result = yield call(addCollege, payload.type_id, payload.data)
    const data = get(result, 'data', {})
    yield put(CollegeActions.onCreateSuccess(data))
    yield put(CollegeActions.onGetList())
  } catch (error) {
    yield put(CollegeActions.onCreateError(error))
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

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
  ])
}
