import { get } from 'lodash'
import { AnswerActionTypes } from '../actions/answer'
import { toastError, toastSuccess } from '../../util/toastHelper'

const init = {
  loading: true,
  detail: null,
  processing: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case AnswerActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      }
    case AnswerActionTypes.CLEAR_STATE:
      return {
        ...init,
      }
    case AnswerActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      }
    case AnswerActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, 'payload.total'),
        list: get(action, 'payload.list', []),
      }
    case AnswerActionTypes.GET_TYPE:
      return {
        ...state,
        loading: true,
        type: [],
      }
    case AnswerActionTypes.GET_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        type: get(action, 'payload.list', []),
      }
    case AnswerActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      }
    case AnswerActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      }
    case AnswerActionTypes.CREATE:
    case AnswerActionTypes.UPDATE:
    case AnswerActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      }
    case AnswerActionTypes.GET_LIST_ERROR:
    case AnswerActionTypes.GET_TYPE_ERROR:
    case AnswerActionTypes.GET_DETAIL_ERROR:
    case AnswerActionTypes.CREATE_ERROR:
    case AnswerActionTypes.UPDATE_ERROR:
    case AnswerActionTypes.DELETE_ERROR:
      var { message } = action.payload
      toastError(message)
      return {
        ...state,
        processing: false,
      }
    case AnswerActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công')
      return {
        ...state,
        processing: true,
      }
    case AnswerActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công')
      return {
        ...state,
        processing: true,
      }
    case AnswerActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công')
      return {
        ...state,
        processing: false,
      }
    default:
      return state
  }
}
