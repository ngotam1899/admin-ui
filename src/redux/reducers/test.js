import { get } from 'lodash'
import { TestActionTypes } from '../actions/test'
import { toastError, toastSuccess } from '../../util/toastHelper'

const init = {
  loading: true,
  detail: null,
  processing: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case TestActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      }
    case TestActionTypes.CLEAR_STATE:
      return {
        ...init,
      }
    case TestActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      }
    case TestActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, 'payload.total'),
        list: get(action, 'payload.list', []),
      }
    case TestActionTypes.STATISTIC_PG:
      return {
        ...state,
        loading: true,
        pg: [],
      }
    case TestActionTypes.STATISTIC_PG_SUCCESS:
      return {
        ...state,
        loading: false,
        pg: get(action, 'payload', []),
      }
    case TestActionTypes.GET_TYPE:
      return {
        ...state,
        loading: true,
        type: [],
      }
    case TestActionTypes.GET_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        type: get(action, 'payload.list', []),
      }
    case TestActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      }
    case TestActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      }
    case TestActionTypes.CREATE:
    case TestActionTypes.UPDATE:
    case TestActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      }
    case TestActionTypes.GET_LIST_ERROR:
    case TestActionTypes.GET_TYPE_ERROR:
    case TestActionTypes.GET_DETAIL_ERROR:
    case TestActionTypes.CREATE_ERROR:
    case TestActionTypes.UPDATE_ERROR:
    case TestActionTypes.DELETE_ERROR:
    case TestActionTypes.STATISTIC_PG_ERROR:
      var { message } = action.payload
      toastError(message)
      return {
        ...state,
        processing: false,
      }
    case TestActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công')
      return {
        ...state,
        processing: true,
      }
    case TestActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công')
      return {
        ...state,
        processing: true,
      }
    case TestActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công')
      return {
        ...state,
        processing: false,
      }
    default:
      return state
  }
}
