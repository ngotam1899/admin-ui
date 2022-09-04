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
}

Object.keys(MajorActionTypes).forEach((key) => {
  MajorActionTypes[key] = `MAJOR_${MajorActionTypes[key]}`
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
 * statistic personality group
 */

const onStatistic = (payload) => ({
  type: MajorActionTypes.STATISTIC,
  payload
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
}

export default MajorActions
