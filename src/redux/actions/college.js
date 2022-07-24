export const CollegeActionTypes = {
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

Object.keys(CollegeActionTypes).forEach((key) => {
  CollegeActionTypes[key] = `COLLEGE_${CollegeActionTypes[key]}`
})

const onClearDetail = () => ({
  type: CollegeActionTypes.CLEAR_DETAIL,
})

const onClearState = () => ({
  type: CollegeActionTypes.CLEAR_STATE,
})

const onGetList = (payload) => ({
  type: CollegeActionTypes.GET_LIST,
  payload,
})

const onGetListSuccess = (list, total) => ({
  type: CollegeActionTypes.GET_LIST_SUCCESS,
  payload: { list, total },
})

const onGetListError = (error) => ({
  type: CollegeActionTypes.GET_LIST_ERROR,
  payload: error,
})

const onGetDetail = (id) => ({
  type: CollegeActionTypes.GET_DETAIL,
  id,
})
const onGetDetailSuccess = (data) => ({
  type: CollegeActionTypes.GET_DETAIL_SUCCESS,
  payload: data,
})
const onGetDetailError = (error) => ({
  type: CollegeActionTypes.GET_DETAIL_ERROR,
  payload: error,
})

const onCreate = (payload) => ({
  type: CollegeActionTypes.CREATE,
  payload,
})

const onCreateSuccess = (detail) => ({
  type: CollegeActionTypes.CREATE_SUCCESS,
  payload: detail,
})

const onCreateError = (error) => ({
  type: CollegeActionTypes.CREATE_ERROR,
  payload: error,
})

/**
 *
 * update
 */
const onUpdate = (payload) => ({
  type: CollegeActionTypes.UPDATE,
  payload,
})

const onUpdateSuccess = (detail) => ({
  type: CollegeActionTypes.UPDATE_SUCCESS,
  payload: detail,
})

const onUpdateError = (error) => ({
  type: CollegeActionTypes.UPDATE_ERROR,
  payload: error,
})

/**
 *
 * delete
 */
const onDelete = (id, params) => ({
  type: CollegeActionTypes.DELETE,
  id,
  params,
})

const onDeleteSuccess = (detail) => ({
  type: CollegeActionTypes.DELETE_SUCCESS,
  payload: detail,
})

const onDeleteError = (error) => ({
  type: CollegeActionTypes.DELETE_ERROR,
  payload: error,
})

const CollegeActions = {
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

export default CollegeActions
