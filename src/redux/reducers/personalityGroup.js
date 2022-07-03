import { get } from "lodash";
import { PGActionTypes } from "../actions/personalityGroup";
import { toastError, toastSuccess } from '../../util/toastHelper';

const init = {
  loading: true,
  detail: null,
  processing: false,
};

export default function(state = init, action) {
  switch (action.type) {
    case PGActionTypes.CLEAR_DETAIL:
      return {
        ...state,
        detail: null,
        loadingDetail: true,
      };
    case PGActionTypes.CLEAR_STATE:
      return {
        ...init,
      };
    case PGActionTypes.GET_LIST:
      return {
        ...state,
        loading: true,
      };
    case PGActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        total: get(action, "payload.total"),
        list: get(action, "payload.list", []),
      };
    case PGActionTypes.GET_DETAIL:
      return {
        ...state,
        loadingDetail: true,
        detail: null,
      };
    case PGActionTypes.GET_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
        detail: action.payload,
      };
    case PGActionTypes.CREATE:
    case PGActionTypes.UPDATE:
    case PGActionTypes.DELETE:
      return {
        ...state,
        processing: true,
      };
    case PGActionTypes.GET_LIST_ERROR:
    case PGActionTypes.GET_DETAIL_ERROR:
    case PGActionTypes.CREATE_ERROR:
    case PGActionTypes.UPDATE_ERROR:
    case PGActionTypes.DELETE_ERROR:
      var { message } = action.payload;
      toastError(message);
      return {
        ...state,
        processing: false,
      };
    case PGActionTypes.UPDATE_SUCCESS:
      toastSuccess('Cập nhật thành công');
      return {
        ...state,
        processing: true,
      };
    case PGActionTypes.CREATE_SUCCESS:
      toastSuccess('Tạo mới thành công');
      return {
        ...state,
        processing: true,
      };
    case PGActionTypes.DELETE_SUCCESS:
      toastSuccess('Xóa thành công');
      return {
        ...state,
        processing: false,
      };
    default:
      return state;
  }
}
