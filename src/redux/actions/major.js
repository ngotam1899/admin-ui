export const MajorActionTypes = {
  GET_LIST: 'GET_LIST',
  GET_LIST_SUCCESS: 'GET_LIST_SUCCESS',
  GET_LIST_ERROR: 'GET_LIST_ERROR',

  CREATE: 'CREATE',
  CREATE_SUCCESS: 'CREATE_SUCCESS',
  CREATE_ERROR: 'CREATE_ERROR',

  STATISTIC: 'STATISTIC',
  STATISTIC_SUCCESS: 'STATISTIC_SUCCESS',
  STATISTIC_ERROR: 'STATISTIC_ERROR',

  CLEAR_DETAIL: 'CLEAR_DETAIL',
  CLEAR_STATE: 'CLEAR_STATE',
}

Object.keys(MajorActionTypes).forEach((key) => {
  MajorActionTypes[key] = `MAJOR_${MajorActionTypes[key]}`
})

const onClearDetail = () => ({
  type: MajorActionTypes.CLEAR_DETAIL,
})

const onClearState = () => ({
  type: MajorActionTypes.CLEAR_STATE,
})

/**
 *
 * get list
 */

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

/**
 *
 * create
 */
const onCreate = (payload) => ({
  type: MajorActionTypes.CREATE,
  payload,
})

const onCreateSuccess = (detail) => ({
  type: MajorActionTypes.CREATE_SUCCESS,
  payload: detail,
})

const onCreateError = (error) => ({
  type: MajorActionTypes.CREATE_ERROR,
  payload: error,
})

/**
 *
 * statistic personality group
 */

const onStatistic = (payload) => ({
  type: MajorActionTypes.STATISTIC,
  payload,
})

const onStatisticSuccess = (payload) => ({
  type: MajorActionTypes.STATISTIC_SUCCESS,
  payload,
})

const onStatisticError = (error) => ({
  type: MajorActionTypes.STATISTIC_ERROR,
  payload: error,
})

const MajorActions = {
  onGetList,
  onGetListSuccess,
  onGetListError,

  onStatistic,
  onStatisticSuccess,
  onStatisticError,

  onCreate,
  onCreateSuccess,
  onCreateError,

  onClearDetail,
  onClearState,
}

export default MajorActions
