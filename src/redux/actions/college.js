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

  UPDATE_SUBJECT_POINT: 'UPDATE_SUBJECT_POINT',
  UPDATE_SUBJECT_POINT_SUCCESS: 'UPDATE_SUBJECT_POINT_SUCCESS',
  UPDATE_SUBJECT_POINT_ERROR: 'UPDATE_SUBJECT_POINT_ERROR',

  ADD_MAJOR: 'ADD_MAJOR',
  ADD_MAJOR_SUCCESS: 'ADD_MAJOR_SUCCESS',
  ADD_MAJOR_ERROR: 'ADD_MAJOR_ERROR',

  REMOVE_MAJOR: 'REMOVE_MAJOR',
  REMOVE_MAJOR_SUCCESS: 'REMOVE_MAJOR_SUCCESS',
  REMOVE_MAJOR_ERROR: 'REMOVE_MAJOR_ERROR',

  STATISTIC: 'STATISTIC',
  STATISTIC_SUCCESS: 'STATISTIC_SUCCESS',
  STATISTIC_ERROR: 'STATISTIC_ERROR',

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

/**
 *
 * get list
 */

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

/**
 *
 * get detail
 */

const onGetDetail = (payload) => ({
  type: CollegeActionTypes.GET_DETAIL,
  payload,
})
const onGetDetailSuccess = (data) => ({
  type: CollegeActionTypes.GET_DETAIL_SUCCESS,
  payload: data,
})
const onGetDetailError = (error) => ({
  type: CollegeActionTypes.GET_DETAIL_ERROR,
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
 * UPDATE SUBJECT POINT
 */
const onUpdateSubjectPoint = (payload) => ({
  type: CollegeActionTypes.UPDATE_SUBJECT_POINT,
  payload
})

const onUpdateSubjectPointSuccess = (detail) => ({
  type: CollegeActionTypes.UPDATE_SUBJECT_POINT_SUCCESS,
  payload: detail,
})

const onUpdateSubjectPointError = (error) => ({
  type: CollegeActionTypes.UPDATE_SUBJECT_POINT_ERROR,
  payload: error,
})

/**
 *
 * add major
 */
 const onAddMajor = (payload) => ({
  type: CollegeActionTypes.ADD_MAJOR,
  payload
})

const onAddMajorSuccess = (detail) => ({
  type: CollegeActionTypes.ADD_MAJOR_SUCCESS,
  payload: detail,
})

const onAddMajorError = (error) => ({
  type: CollegeActionTypes.ADD_MAJOR_ERROR,
  payload: error,
})

/**
 *
 * remove major
 */
 const onRemoveMajor = (payload) => ({
  type: CollegeActionTypes.REMOVE_MAJOR,
  payload
})

const onRemoveMajorSuccess = (detail) => ({
  type: CollegeActionTypes.REMOVE_MAJOR_SUCCESS,
  payload: detail,
})

const onRemoveMajorError = (error) => ({
  type: CollegeActionTypes.REMOVE_MAJOR_ERROR,
  payload: error,
})

/**
 *
 * statistic personality group
 */

const onStatistic = (payload) => ({
  type: CollegeActionTypes.STATISTIC,
  payload
})

const onStatisticSuccess = (payload) => ({
  type: CollegeActionTypes.STATISTIC_SUCCESS,
  payload,
})

const onStatisticError = (error) => ({
  type: CollegeActionTypes.STATISTIC_ERROR,
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

  onUpdateSubjectPoint,
  onUpdateSubjectPointSuccess,
  onUpdateSubjectPointError,

  onAddMajor,
  onAddMajorSuccess,
  onAddMajorError,

  onRemoveMajor,
  onRemoveMajorSuccess,
  onRemoveMajorError,

  onStatistic,
  onStatisticSuccess,
  onStatisticError,
}

export default CollegeActions
