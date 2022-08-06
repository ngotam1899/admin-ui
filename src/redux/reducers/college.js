import { get } from 'lodash'
import { CollegeActionTypes } from '../actions/college'
import { toastError, toastSuccess } from '../../util/toastHelper'

const init = {
  loading: true,
  detail: null,
  processing: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case CollegeActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      }
    case CollegeActionTypes.CLEAR_STATE:
      return {
        ...init,
      }
    case CollegeActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      }
    case CollegeActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, 'payload.total'),
        list: get(action, 'payload.list', []),
      }
    case CollegeActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      }
    case CollegeActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      }
    case CollegeActionTypes.CREATE:
    case CollegeActionTypes.UPDATE:
    case CollegeActionTypes.UPDATE_SUBJECT_POINT:
    case CollegeActionTypes.ADD_MAJOR:
    case CollegeActionTypes.REMOVE_MAJOR:
      return {
        ...state,
        processing: true,
      }
    case CollegeActionTypes.GET_LIST_ERROR:
    case CollegeActionTypes.GET_DETAIL_ERROR:
    case CollegeActionTypes.CREATE_ERROR:
    case CollegeActionTypes.UPDATE_ERROR:
    case CollegeActionTypes.UPDATE_SUBJECT_POINT_ERROR:
    case CollegeActionTypes.ADD_MAJOR_ERROR:
    case CollegeActionTypes.REMOVE_MAJOR_ERROR:
    case CollegeActionTypes.STATISTIC_ERROR:
      var { message } = action.payload
      toastError(message)
      return {
        ...state,
        processing: false,
      }
    case CollegeActionTypes.UPDATE_SUCCESS:
    case CollegeActionTypes.UPDATE_SUBJECT_POINT_SUCCESS:
    case CollegeActionTypes.ADD_MAJOR_SUCCESS:
    case CollegeActionTypes.REMOVE_MAJOR_SUCCESS:
      toastSuccess('Cập nhật thành công')
      return {
        ...state,
        processing: true,
      }
    case CollegeActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công')
      return {
        ...state,
        processing: true,
      }
    case CollegeActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công')
      return {
        ...state,
        processing: false,
      }
    case CollegeActionTypes.STATISTIC:
      return {
        ...state,
        loading: true,
        statistic: [],
      }
    case CollegeActionTypes.STATISTIC_SUCCESS:
      return {
        ...state,
        loading: false,
        statistic: get(action, 'payload', []),
      }
    default:
      return state
  }
}
