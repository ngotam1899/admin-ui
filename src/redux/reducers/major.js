import { get } from 'lodash'
import { MajorActionTypes } from '../actions/major'
import { toastError, toastSuccess } from '../../util/toastHelper'

const init = {
  loading: true,
  detail: null,
  processing: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case MajorActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      }
    case MajorActionTypes.CLEAR_STATE:
      return {
        ...init,
      }
    case MajorActionTypes.GET_LIST:
    case MajorActionTypes.CREATE:
      return {
        ...state,
        loading: true,
      }
    case MajorActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, 'payload.total'),
        list: get(action, 'payload.list', []),
      }
    case MajorActionTypes.STATISTIC_ERROR:
    case MajorActionTypes.GET_LIST_ERROR:
    case MajorActionTypes.CREATE_ERROR:
      var { message } = action.payload
      toastError(message)
      return {
        ...state,
        processing: false,
      }
    case MajorActionTypes.STATISTIC:
      return {
        ...state,
        loading: true,
        statistic: [],
      }
    case MajorActionTypes.STATISTIC_SUCCESS:
      return {
        ...state,
        loading: false,
        statistic: get(action, 'payload', []),
      }
    case MajorActionTypes.CREATE_SUCCESS:
      toastSuccess('Thêm thành công')
      return {
        ...state,
        processing: true,
      }
    default:
      return state
  }
}
