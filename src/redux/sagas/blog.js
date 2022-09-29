import { takeEvery, fork, all, call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import BlogActions, { BlogActionTypes } from '../actions/blog'
import { getAllBlogs, getDetailBlog, addBlog, updateBlog } from '../apis/blog'

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllBlogs, payload)
    const data = get(result, 'data')
    yield put(BlogActions.onGetListSuccess(data))
  } catch (error) {
    yield put(BlogActions.onGetListError(error))
  }
}

function* handleGetDetail(payload) {
  try {
    const result = yield call(getDetailBlog, payload.id)
    const data = get(result, 'data', {})
    yield put(BlogActions.onGetDetailSuccess(data))
  } catch (error) {
    yield put(BlogActions.onGetDetailError(error))
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {
    const result = yield call(addBlog, payload.data)
    const data = get(result, 'data', {})
    yield put(BlogActions.onCreateSuccess(data))
    yield put(BlogActions.onGetList(payload.params))
  } catch (error) {
    yield put(BlogActions.onCreateError(error))
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updateBlog, payload.data, payload.blog_id)
    var detailResult = yield call(getAllBlogs, payload.params)
    yield put(BlogActions.onUpdateSuccess(get(detailResult, 'data')))
    yield put(BlogActions.onGetList(payload.params))
  } catch (error) {
    yield put(BlogActions.onUpdateError(error))
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(BlogActionTypes.GET_LIST, handleGetList)
}
export function* watchGetDetail() {
  yield takeEvery(BlogActionTypes.GET_DETAIL, handleGetDetail)
}
export function* watchCreate() {
  yield takeEvery(BlogActionTypes.CREATE, handleCreate)
}
export function* watchUpdate() {
  yield takeEvery(BlogActionTypes.UPDATE, handleUpdate)
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchGetDetail), fork(watchCreate), fork(watchUpdate)])
}
