export const TestActionTypes = {
  GET_LIST: 'GET_LIST',
  GET_LIST_SUCCESS: 'GET_LIST_SUCCESS',
  GET_LIST_ERROR: 'GET_LIST_ERROR',

  GET_TYPE: 'GET_TYPE',
  GET_TYPE_SUCCESS: 'GET_TYPE_SUCCESS',
  GET_TYPE_ERROR: 'GET_TYPE_ERROR',

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

  STATISTIC_PG: 'STATISTIC_PG',
  STATISTIC_PG_SUCCESS: 'STATISTIC_PG_SUCCESS',
  STATISTIC_PG_ERROR: 'STATISTIC_PG_ERROR',
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

const onGetType = (payload) => ({
  type: TestActionTypes.GET_TYPE,
  payload,
})

const onGetTypeSuccess = (list) => ({
  type: TestActionTypes.GET_TYPE_SUCCESS,
  payload: { list },
})

const onGetTypeError = (error) => ({
  type: TestActionTypes.GET_TYPE_ERROR,
  payload: error,
})

const onGetDetail = (payload) => ({
  type: TestActionTypes.GET_DETAIL,
  payload,
})
const onGetDetailSuccess = (data) => ({
  type: TestActionTypes.GET_DETAIL_SUCCESS,
  payload: data,
})
const onGetDetailError = (error) => ({
  type: TestActionTypes.GET_DETAIL_ERROR,
  payload: error,
})

const onCreate = (payload) => ({
  type: TestActionTypes.CREATE,
  payload,
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
const onUpdate = (payload) => ({
  type: TestActionTypes.UPDATE,
  payload,
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

/**
 *
 * statistic personality group
 */

const onStatisticPG = () => ({
  type: TestActionTypes.STATISTIC_PG,
})

const onStatisticPGSuccess = (payload) => ({
  type: TestActionTypes.STATISTIC_PG_SUCCESS,
  payload,
})

const onStatisticPGError = (error) => ({
  type: TestActionTypes.STATISTIC_PG_ERROR,
  payload: error,
})

const TestActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onGetType,
  onGetTypeSuccess,
  onGetTypeError,

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

  onStatisticPG,
  onStatisticPGSuccess,
  onStatisticPGError,
}

export default TestActions
