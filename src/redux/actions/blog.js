export const BlogActionTypes = {
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

Object.keys(BlogActionTypes).forEach((key) => {
  BlogActionTypes[key] = `BLOG_${BlogActionTypes[key]}`
})

const onClearDetail = () => ({
  type: BlogActionTypes.CLEAR_DETAIL,
})

const onClearState = () => ({
  type: BlogActionTypes.CLEAR_STATE,
})

const onGetList = (payload) => ({
  type: BlogActionTypes.GET_LIST,
  payload,
})

const onGetListSuccess = (list, total) => ({
  type: BlogActionTypes.GET_LIST_SUCCESS,
  payload: { list, total },
})

const onGetListError = (error) => ({
  type: BlogActionTypes.GET_LIST_ERROR,
  payload: error,
})

const onGetDetail = (id) => ({
  type: BlogActionTypes.GET_DETAIL,
  id,
})
const onGetDetailSuccess = (data) => ({
  type: BlogActionTypes.GET_DETAIL_SUCCESS,
  payload: data,
})
const onGetDetailError = (error) => ({
  type: BlogActionTypes.GET_DETAIL_ERROR,
  payload: error,
})

const onCreate = (payload) => ({
  type: BlogActionTypes.CREATE,
  payload,
})

const onCreateSuccess = (detail) => ({
  type: BlogActionTypes.CREATE_SUCCESS,
  payload: detail,
})

const onCreateError = (error) => ({
  type: BlogActionTypes.CREATE_ERROR,
  payload: error,
})

/**
 *
 * update
 */
const onUpdate = (payload) => ({
  type: BlogActionTypes.UPDATE,
  payload,
})

const onUpdateSuccess = (detail) => ({
  type: BlogActionTypes.UPDATE_SUCCESS,
  payload: detail,
})

const onUpdateError = (error) => ({
  type: BlogActionTypes.UPDATE_ERROR,
  payload: error,
})

/**
 *
 * delete
 */
const onDelete = (id, params) => ({
  type: BlogActionTypes.DELETE,
  id,
  params,
})

const onDeleteSuccess = (detail) => ({
  type: BlogActionTypes.DELETE_SUCCESS,
  payload: detail,
})

const onDeleteError = (error) => ({
  type: BlogActionTypes.DELETE_ERROR,
  payload: error,
})

const BlogActions = {
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

export default BlogActions
