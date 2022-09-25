import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import MajorActions, { MajorActionTypes } from '../actions/major'
import { getAllMajor, statisticMajor, addMajor } from '../apis/major'

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
 * create
 */
function* handleCreate({ payload }) {
  try {
    console.log(payload)
    const result = yield call(addMajor, payload.data)
    const data = get(result, 'data', {})
    yield put(MajorActions.onCreateSuccess(data))
    yield put(MajorActions.onGetList(payload.params))
  } catch (error) {
    yield put(MajorActions.onCreateError(error))
  }
}

/**
 *
 * statistic
 */
function* handleStatistic({ payload }) {
  try {
    const result = yield call(statisticMajor, payload)
    const data = get(result, 'data')
    yield put(MajorActions.onStatisticSuccess(data.data))
  } catch (error) {
    yield put(MajorActions.onStatisticError(error))
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(MajorActionTypes.GET_LIST, handleGetList)
}
export function* watchStatistic() {
  yield takeEvery(MajorActionTypes.STATISTIC, handleStatistic)
}
export function* watchCreate() {
  yield takeEvery(MajorActionTypes.CREATE, handleCreate)
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchStatistic), fork(watchCreate)])
}
