export const PGActionTypes = {
  GET_LIST: "GET_LIST",
  GET_LIST_SUCCESS: "GET_LIST_SUCCESS",
  GET_LIST_ERROR: "GET_LIST_ERROR",

  GET_DETAIL: "GET_DETAIL",
  GET_DETAIL_SUCCESS: "GET_DETAIL_SUCCESS",
  GET_DETAIL_ERROR: "GET_DETAIL_ERROR",

  CREATE: "CREATE",
  CREATE_SUCCESS: "CREATE_SUCCESS",
  CREATE_ERROR: "CREATE_ERROR",

  UPDATE: "UPDATE",
  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_ERROR: "UPDATE_ERROR",

  DELETE: "DELETE",
  DELETE_SUCCESS: "DELETE_SUCCESS",
  DELETE_ERROR: "DELETE_ERROR",

  CLEAR_DETAIL: "CLEAR_DETAIL",
  CLEAR_STATE: "CLEAR_STATE",
};

Object.keys(PGActionTypes).forEach((key) => {
  PGActionTypes[
    key
  ] = `AD_${PGActionTypes[key]}`;
});

const onClearDetail = () => ({
  type: PGActionTypes.CLEAR_DETAIL,
});

const onClearState = () => ({
  type: PGActionTypes.CLEAR_STATE,
});

const onGetList = (payload) => ({
  type: PGActionTypes.GET_LIST,
  payload,
});

const onGetListSuccess = (list, total) => ({
  type: PGActionTypes.GET_LIST_SUCCESS,
  payload: {list, total},
});

const onGetListError = (error) => ({
  type: PGActionTypes.GET_LIST_ERROR,
  payload: error,
});

const onGetDetail = (id) => ({
  type: PGActionTypes.GET_DETAIL,
  id
});
const onGetDetailSuccess = (data) => ({
  type: PGActionTypes.GET_DETAIL_SUCCESS,
  payload: data
});
const onGetDetailError = (error) => ({
  type: PGActionTypes.GET_DETAIL_ERROR,
  payload: error
});

const onCreate = (data, params) => ({
  type: PGActionTypes.CREATE,
  payload: {data, params},
});

const onCreateSuccess = (detail) => ({
  type: PGActionTypes.CREATE_SUCCESS,
  payload: detail,
});

const onCreateError = (error) => ({
  type: PGActionTypes.CREATE_ERROR,
  payload: error,
});

/**
 *
 * update
 */
const onUpdate = (id, data, params) => ({
  type: PGActionTypes.UPDATE,
  payload: { id, data, params },
});

const onUpdateSuccess = (detail) => ({
  type: PGActionTypes.UPDATE_SUCCESS,
  payload: detail,
});

const onUpdateError = (error) => ({
  type: PGActionTypes.UPDATE_ERROR,
  payload: error,
});

/**
 *
 * delete
 */
const onDelete = (id, params) => ({
  type: PGActionTypes.DELETE,
  id, params
});

const onDeleteSuccess = (detail) => ({
  type: PGActionTypes.DELETE_SUCCESS,
  payload: detail,
});

const onDeleteError = (error) => ({
  type: PGActionTypes.DELETE_ERROR,
  payload: error,
});

const PGActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onClearDetail,
  onClearState,

  onGetDetail,
  onGetDetailSuccess,
  onGetDetailError,

  onCreate,
  onCreateSuccess,
  onCreateError,

  onUpdate,
  onUpdateSuccess,
  onUpdateError,

  onDelete,
  onDeleteSuccess,
  onDeleteError,
};

export default PGActions;
