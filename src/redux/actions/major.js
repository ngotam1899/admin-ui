export const MajorActionTypes = {
    GET_LIST: 'GET_LIST',
    GET_LIST_SUCCESS: 'GET_LIST_SUCCESS',
    GET_LIST_ERROR: 'GET_LIST_ERROR',
  }
  
  Object.keys(MajorActionTypes).forEach((key) => {
    MajorActionTypes[key] = `MAJOR_${MajorActionTypes[key]}`
  })
  
  const onGetList = (payload) => ({
    type: MajorActionTypes.GET_LIST,
    payload,
  })
  
  const onGetListSuccess = (list, total) => ({
    type: MajorActionTypes.GET_LIST_SUCCESS,
    payload: { list, total },
  })
  
  const onGetListError = (error) => ({
    type: MajorActionTypes.GET_LIST_ERROR,
    payload: error,
  })
  
  const MajorActions = {
    onGetList,
    onGetListSuccess,
    onGetListError,
  }
  
  export default MajorActions
  