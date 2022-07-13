export const QuestionActionTypes = {
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

Object.keys(QuestionActionTypes).forEach((key) => {
  QuestionActionTypes[key] = `QUESTION_${QuestionActionTypes[key]}`
})

const onClearDetail = () => ({
  type: QuestionActionTypes.CLEAR_DETAIL,
})

const onClearState = () => ({
  type: QuestionActionTypes.CLEAR_STATE,
})

const onGetList = (payload) => ({
  type: QuestionActionTypes.GET_LIST,
  payload,
})

const onGetListSuccess = (list, total) => ({
  type: QuestionActionTypes.GET_LIST_SUCCESS,
  payload: { list, total },
})

const onGetListError = (error) => ({
  type: QuestionActionTypes.GET_LIST_ERROR,
  payload: error,
})

const onGetDetail = (id) => ({
  type: QuestionActionTypes.GET_DETAIL,
  id,
})
const onGetDetailSuccess = (data) => ({
  type: QuestionActionTypes.GET_DETAIL_SUCCESS,
  payload: data,
})
const onGetDetailError = (error) => ({
  type: QuestionActionTypes.GET_DETAIL_ERROR,
  payload: error,
})

const onCreate = (payload) => ({
  type: QuestionActionTypes.CREATE,
  payload,
})

const onCreateSuccess = (detail) => ({
  type: QuestionActionTypes.CREATE_SUCCESS,
  payload: detail,
})

const onCreateError = (error) => ({
  type: QuestionActionTypes.CREATE_ERROR,
  payload: error,
})

/**
 *
 * update
 */
const onUpdate = (payload) => ({
  type: QuestionActionTypes.UPDATE,
  payload,
})

const onUpdateSuccess = (detail) => ({
  type: QuestionActionTypes.UPDATE_SUCCESS,
  payload: detail,
})

const onUpdateError = (error) => ({
  type: QuestionActionTypes.UPDATE_ERROR,
  payload: error,
})

/**
 *
 * delete
 */
const onDelete = (id, params) => ({
  type: QuestionActionTypes.DELETE,
  id,
  params,
})

const onDeleteSuccess = (detail) => ({
  type: QuestionActionTypes.DELETE_SUCCESS,
  payload: detail,
})

const onDeleteError = (error) => ({
  type: QuestionActionTypes.DELETE_ERROR,
  payload: error,
})

const QuestionActions = {
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

export default QuestionActions
