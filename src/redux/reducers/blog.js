import { get } from 'lodash'
import { BlogActionTypes } from '../actions/blog'
import { toastError, toastSuccess } from '../../util/toastHelper'

const init = {
  loading: true,
  detail: null,
  processing: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case BlogActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      }
    case BlogActionTypes.CLEAR_STATE:
      return {
        ...init,
      }
    case BlogActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      }
    case BlogActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, 'payload.total'),
        list: get(action, 'payload.list', []),
      }
    case BlogActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      }
    case BlogActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      }
    case BlogActionTypes.CREATE:
    case BlogActionTypes.UPDATE:
    case BlogActionTypes.GET_LIST_ERROR:
    case BlogActionTypes.GET_DETAIL_ERROR:
    case BlogActionTypes.CREATE_ERROR:
    case BlogActionTypes.UPDATE_ERROR:
      var { message } = action.payload
      toastError(message)
      return {
        ...state,
        processing: false,
      }
    case BlogActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công')
      return {
        ...state,
        processing: true,
      }
    case BlogActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công')
      return {
        ...state,
        processing: true,
      }
    case BlogActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công')
      return {
        ...state,
        processing: false,
      }
    default:
      return state
  }
}
