export const SGActionTypes = {
  GET_LIST: 'GET_LIST',
  GET_LIST_SUCCESS: 'GET_LIST_SUCCESS',
  GET_LIST_ERROR: 'GET_LIST_ERROR',
}

Object.keys(SGActionTypes).forEach((key) => {
  SGActionTypes[key] = `SG_${SGActionTypes[key]}`
})

/**
 *
 * get list
 */

const onGetList = (payload) => ({
  type: SGActionTypes.GET_LIST,
  payload,
})

const onGetListSuccess = (list, total) => ({
  type: SGActionTypes.GET_LIST_SUCCESS,
  payload: { list, total },
})

const onGetListError = (error) => ({
  type: SGActionTypes.GET_LIST_ERROR,
  payload: error,
})

const SGActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,
}

export default SGActions
