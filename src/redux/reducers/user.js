import { get } from 'lodash'
import { UserActionTypes } from '../actions/user'
import { toastError, toastSuccess } from '../../util/toastHelper'

const init = {
  loading: true,
  detail: null,
  processing: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case UserActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      }
    case UserActionTypes.CLEAR_STATE:
      return {
        ...init,
      }
    case UserActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      }
    case UserActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, 'payload.total'),
        list: get(action, 'payload.list', []),
      }
    case UserActionTypes.GET_TYPE:
      return {
        ...state,
        loading: true,
        type: [],
      }
    case UserActionTypes.GET_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        type: get(action, 'payload.list', []),
      }
    case UserActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      }
    case UserActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      }
    case UserActionTypes.CREATE:
    case UserActionTypes.UPDATE:
    case UserActionTypes.UPDATE_ROLE:
    case UserActionTypes.CREATE_CONNECTOR:
      return {
        ...state,
        processing: true,
      }
    case UserActionTypes.GET_LIST_ERROR:
    case UserActionTypes.GET_TYPE_ERROR:
    case UserActionTypes.GET_DETAIL_ERROR:
    case UserActionTypes.CREATE_ERROR:
    case UserActionTypes.UPDATE_ERROR:
    case UserActionTypes.UPDATE_ROLE_ERROR:
    case UserActionTypes.CREATE_CONNECTOR_ERROR:
      var { message } = action.payload
      toastError(message)
      return {
        ...state,
        processing: false,
      }
    case UserActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công')
      return {
        ...state,
        processing: true,
      }
    case UserActionTypes.CREATE_SUCCESS:
    case UserActionTypes.CREATE_CONNECTOR_SUCCESS:
      toastSuccess('Tạo mới thành công')
      return {
        ...state,
        processing: true,
      }
    case UserActionTypes.UPDATE_ROLE_SUCCESS:
      toastSuccess('Cập nhật role thành công')
      return {
        ...state,
        processing: false,
      }
    default:
      return state
  }
}
