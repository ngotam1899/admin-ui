export const AnswerActionTypes = {
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

Object.keys(AnswerActionTypes).forEach((key) => {
  AnswerActionTypes[key] = `ANSWER_${AnswerActionTypes[key]}`
})

const onClearDetail = () => ({
  type: AnswerActionTypes.CLEAR_DETAIL,
})

const onClearState = () => ({
  type: AnswerActionTypes.CLEAR_STATE,
})

const onGetList = (payload) => ({
  type: AnswerActionTypes.GET_LIST,
  payload,
})

const onGetListSuccess = (list, total) => ({
  type: AnswerActionTypes.GET_LIST_SUCCESS,
  payload: { list, total },
})

const onGetListError = (error) => ({
  type: AnswerActionTypes.GET_LIST_ERROR,
  payload: error,
})

const onGetDetail = (payload) => ({
  type: AnswerActionTypes.GET_DETAIL,
  payload,
})
const onGetDetailSuccess = (data) => ({
  type: AnswerActionTypes.GET_DETAIL_SUCCESS,
  payload: data,
})
const onGetDetailError = (error) => ({
  type: AnswerActionTypes.GET_DETAIL_ERROR,
  payload: error,
})

const onCreate = (payload) => ({
  type: AnswerActionTypes.CREATE,
  payload,
})

const onCreateSuccess = (detail) => ({
  type: AnswerActionTypes.CREATE_SUCCESS,
  payload: detail,
})

const onCreateError = (error) => ({
  type: AnswerActionTypes.CREATE_ERROR,
  payload: error,
})

/**
 *
 * update
 */
const onUpdate = (payload) => ({
  type: AnswerActionTypes.UPDATE,
  payload,
})

const onUpdateSuccess = (detail) => ({
  type: AnswerActionTypes.UPDATE_SUCCESS,
  payload: detail,
})

const onUpdateError = (error) => ({
  type: AnswerActionTypes.UPDATE_ERROR,
  payload: error,
})

/**
 *
 * delete
 */
const onDelete = (id, params) => ({
  type: AnswerActionTypes.DELETE,
  id,
  params,
})

const onDeleteSuccess = (detail) => ({
  type: AnswerActionTypes.DELETE_SUCCESS,
  payload: detail,
})

const onDeleteError = (error) => ({
  type: AnswerActionTypes.DELETE_ERROR,
  payload: error,
})

const AnswerActions = {
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

export default AnswerActions
