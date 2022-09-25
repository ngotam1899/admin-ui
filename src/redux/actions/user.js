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

  UPDATE_ROLE: 'UPDATE_ROLE',
  UPDATE_ROLE_SUCCESS: 'UPDATE_ROLE_SUCCESS',
  UPDATE_ROLE_ERROR: 'UPDATE_ROLE_ERROR',

  CREATE_CONNECTOR: 'CREATE_CONNECTOR',
  CREATE_CONNECTOR_SUCCESS: 'CREATE_CONNECTOR_SUCCESS',
  CREATE_CONNECTOR_ERROR: 'CREATE_CONNECTOR_ERROR',

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
 * update role
 */
 const onUpdateRole = (payload) => ({
  type: UserActionTypes.UPDATE_ROLE,
  payload,
})

const onUpdateRoleSuccess = (detail) => ({
  type: UserActionTypes.UPDATE_ROLE_SUCCESS,
  payload: detail,
})

const onUpdateRoleError = (error) => ({
  type: UserActionTypes.UPDATE_ROLE_ERROR,
  payload: error,
})

/**
 *
 * create connector
 */
 const onCreateConnector = (payload) => ({
  type: UserActionTypes.CREATE_CONNECTOR,
  payload,
})

const onCreateConnectorSuccess = (detail) => ({
  type: UserActionTypes.CREATE_CONNECTOR_SUCCESS,
  payload: detail,
})

const onCreateConnectorError = (error) => ({
  type: UserActionTypes.CREATE_CONNECTOR_ERROR,
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

  onUpdateRole,
  onUpdateRoleSuccess,
  onUpdateRoleError,

  onCreateConnector,
  onCreateConnectorSuccess,
  onCreateConnectorError,
}

export default UserActions
