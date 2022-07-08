import { get } from 'lodash'
import { QuestionTypes } from '../actions/question'
import { toastError, toastSuccess } from '../../util/toastHelper'

const init = {
  loading: true,
  detail: null,
  processing: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case QuestionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      }
    case QuestionTypes.CLEAR_STATE:
      return {
        ...init,
      }
    case QuestionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      }
    case QuestionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, 'payload.total'),
        list: get(action, 'payload.list', []),
      }
    case QuestionTypes.GET_TYPE:
      return {
        ...state,
        loading: true,
        type: [],
      }
    case QuestionTypes.GET_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        type: get(action, 'payload.list', []),
      }
    case QuestionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      }
    case QuestionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      }
    case QuestionTypes.CREATE:
    case QuestionTypes.UPDATE:
    case QuestionTypes.DELETE:
      return {
        ...state,
        processing: true,
      }
    case QuestionTypes.GET_LIST_ERROR:
    case QuestionTypes.GET_TYPE_ERROR:
    case QuestionTypes.GET_DETAIL_ERROR:
    case QuestionTypes.CREATE_ERROR:
    case QuestionTypes.UPDATE_ERROR:
    case QuestionTypes.DELETE_ERROR:
      var { message } = action.payload
      toastError(message)
      return {
        ...state,
        processing: false,
      }
    case QuestionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công')
      return {
        ...state,
        processing: true,
      }
    case QuestionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công')
      return {
        ...state,
        processing: true,
      }
    case QuestionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công')
      return {
        ...state,
        processing: false,
      }
    default:
      return state
  }
}
