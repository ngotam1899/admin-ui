import { takeEvery, fork, all, call, put } from "redux-saga/effects";
import { get } from "lodash";
import PGActions, { PGActionTypes } from "../actions/personalityGroup";
import { getAllPersonalityGroup, getDetailPersonalityGroup, addPersonalityGroup, updatePersonalityGroup, deletePersonalityGroup } from "../apis/personalityGroup";

function* handleGetList({ payload }) {
  try {
    const result = yield call(getAllPersonalityGroup, payload);
    //const data = get(result, "data");
    console.log(result)
    yield put(PGActions.onGetListSuccess(result, null));
  } catch (error) {
    yield put(PGActions.onGetListError(error));
  }
}

function* handleGetDetail({ filters, id }) {
  try {
    const result = yield call(getDetailPersonalityGroup, id);
    const data = get(result, "data", {});
    yield put(PGActions.onGetDetailSuccess(data.ad));
  } catch (error) {
    yield put(PGActions.onGetDetailError(error));
  }
}

/**
 *
 * create
 */
function* handleCreate({ payload }) {
  try {

    const result = yield call(addPersonalityGroup, payload.data);
    const data = get(result, "data", {});
    if (data.code !== 201) throw data;
    yield put(PGActions.onCreateSuccess(data.ad));
    yield put(PGActions.onGetList(payload.params));
  } catch (error) {
    yield put(PGActions.onCreateError(error));
  }
}

/**
 *
 * update
 */
function* handleUpdate({ payload }) {
  try {
    const result = yield call(updatePersonalityGroup, payload.data, payload.id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    var detailResult = yield call(getAllPersonalityGroup, payload.id);
    yield put(PGActions.onUpdateSuccess(get(detailResult, "data.ad")));
    yield put(PGActions.onGetList(payload.params));
  } catch (error) {
    yield put(PGActions.onUpdateError(error));
  }
}

/**
 *
 * delete
 */
function* handleDelete({ id, params }) {
  try {
    const result = yield call(deletePersonalityGroup, id);
    const data = get(result, "data", {});
    if (data.code !== 200) throw data;
    yield put(PGActions.onDeleteSuccess(data));
    yield put(PGActions.onGetList(params));
  } catch (error) {
    yield put(PGActions.onDeleteError(error));
  }
}

/**
 *
 */

export function* watchGetList() {
  yield takeEvery(PGActionTypes.GET_LIST, handleGetList);
}
export function* watchGetDetail() {
  yield takeEvery(PGActionTypes.GET_DETAIL, handleGetDetail);
}
export function* watchCreate() {
  yield takeEvery(PGActionTypes.CREATE, handleCreate);
}
export function* watchUpdate() {
  yield takeEvery(PGActionTypes.UPDATE, handleUpdate);
}
export function* watchDelete() {
  yield takeEvery(PGActionTypes.DELETE, handleDelete);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetDetail),
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDelete),
  ]);
}
