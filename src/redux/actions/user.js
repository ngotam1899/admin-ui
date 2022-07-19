export const UserActionTypes = {
  GET_LIST: 'GET_LIST',
  GET_LIST_SUCCESS: 'GET_LIST_SUCCESS',
  GET_LIST_ERROR: 'GET_LIST_ERROR',

  GET_DETAIL: 'GET_DETAIL',
  GET_DETAIL_SUCCESS: 'GET_DETAIL_SUCCESS',
  GET_DETAIL_ERROR: 'GET_DETAIL_ERROR',

  CREATE: 'CREATE',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_ERROR: 'CREATE_ERROR',

  UPDATE: 'UPDATE',
  UPDATE_SUCCESS: 'UPDATE_SUCCESS',
  UPDATE_ERROR: 'UPDATE_ERROR',

  DELETE: 'DELETE',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_ERROR: 'DELETE_ERROR',

  CLEAR_DETAIL: 'CLEAR_DETAIL',
  CLEAR_STATE: 'CLEAR_STATE',
}

Object.keys(UserActionTypes).forEach((key) => {
  UserActionTypes[key] = `USER_${UserActionTypes[key]}`
})

const onClearDetail = () => ({
  type: UserActionTypes.CLEAR_DETAIL,
})

const onClearState = () => ({
  type: UserActionTypes.CLEAR_STATE,
})

const onGetList = (payload) => ({
  type: UserActionTypes.GET_LIST,
  payload,
})

const onGetListSuccess = (list, total) => ({
  type: UserActionTypes.GET_LIST_SUCCESS,
  payload: { list, total },
})

const onGetListError = (error) => ({
  type: UserActionTypes.GET_LIST_ERROR,
  payload: error,
})

const onGetDetail = (id) => ({
  type: UserActionTypes.GET_DETAIL,
  id,
})
const onGetDetailSuccess = (data) => ({
  type: UserActionTypes.GET_DETAIL_SUCCESS,
  payload: data,
})
const onGetDetailError = (error) => ({
  type: UserActionTypes.GET_DETAIL_ERROR,
  payload: error,
})

const onCreate = (data, params) => ({
  type: UserActionTypes.CREATE,
  payload: { data, params },
})

const onCreateSuccess = (detail) => ({
  type: UserActionTypes.CREATE_SUCCESS,
  payload: detail,
})

const onCreateError = (error) => ({
  type: UserActionTypes.CREATE_ERROR,
  payload: error,
})

/**
 *
 * update
 */
const onUpdate = (payload) => ({
  type: UserActionTypes.UPDATE,
  payload,
})

const onUpdateSuccess = (detail) => ({
  type: UserActionTypes.UPDATE_SUCCESS,
  payload: detail,
})

const onUpdateError = (error) => ({
  type: UserActionTypes.UPDATE_ERROR,
  payload: error,
})

/**
 *
 * delete
 */
const onDelete = (id, params) => ({
  type: UserActionTypes.DELETE,
  id,
  params,
})

const onDeleteSuccess = (detail) => ({
  type: UserActionTypes.DELETE_SUCCESS,
  payload: detail,
})

const onDeleteError = (error) => ({
  type: UserActionTypes.DELETE_ERROR,
  payload: error,
})

const UserActions = {
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
}

export default UserActions
