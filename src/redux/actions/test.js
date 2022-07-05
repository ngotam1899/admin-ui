export const TestActionTypes = {
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

Object.keys(TestActionTypes).forEach((key) => {
  TestActionTypes[key] = `TEST_${TestActionTypes[key]}`
})

const onClearDetail = () => ({
  type: TestActionTypes.CLEAR_DETAIL,
})

const onClearState = () => ({
  type: TestActionTypes.CLEAR_STATE,
})

const onGetList = (payload) => ({
  type: TestActionTypes.GET_LIST,
  payload,
})

const onGetListSuccess = (list, total) => ({
  type: TestActionTypes.GET_LIST_SUCCESS,
  payload: { list, total },
})

const onGetListError = (error) => ({
  type: TestActionTypes.GET_LIST_ERROR,
  payload: error,
})

const onGetDetail = (id) => ({
  type: TestActionTypes.GET_DETAIL,
  id,
})
const onGetDetailSuccess = (data) => ({
  type: TestActionTypes.GET_DETAIL_SUCCESS,
  payload: data,
})
const onGetDetailError = (error) => ({
  type: TestActionTypes.GET_DETAIL_ERROR,
  payload: error,
})

const onCreate = (data, params) => ({
  type: TestActionTypes.CREATE,
  payload: { data, params },
})

const onCreateSuccess = (detail) => ({
  type: TestActionTypes.CREATE_SUCCESS,
  payload: detail,
})

const onCreateError = (error) => ({
  type: TestActionTypes.CREATE_ERROR,
  payload: error,
})

/**
 *
 * update
 */
const onUpdate = (id, data, params) => ({
  type: TestActionTypes.UPDATE,
  payload: { id, data, params },
})

const onUpdateSuccess = (detail) => ({
  type: TestActionTypes.UPDATE_SUCCESS,
  payload: detail,
})

const onUpdateError = (error) => ({
  type: TestActionTypes.UPDATE_ERROR,
  payload: error,
})

/**
 *
 * delete
 */
const onDelete = (id, params) => ({
  type: TestActionTypes.DELETE,
  id,
  params,
})

const onDeleteSuccess = (detail) => ({
  type: TestActionTypes.DELETE_SUCCESS,
  payload: detail,
})

const onDeleteError = (error) => ({
  type: TestActionTypes.DELETE_ERROR,
  payload: error,
})

const TestActions = {
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

export default TestActions
