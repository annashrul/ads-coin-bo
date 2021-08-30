import { PAKET } from "../../actions/_constants";

const initialState = {
  isLoading: true,
  isLoadingDetail: true,
  isLoadingPost: false,
  isError: false,
  status: "",
  msg: "",
  data: [],
  edit: [],
  detail: [],
};

export const paketReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAKET.SUCCESS:
      return Object.assign({}, state, {
        status: action.data.status,
        msg: action.data.msg,
        data: action.data.result,
      });

    case PAKET.DETAIL:
      return Object.assign({}, state, {
        detail: action.data.result,
      });
    case PAKET.FAILED:
      return Object.assign({}, state, {
        status: action.data.status,
        msg: action.data.msg,
        data: action.data.data,
      });
    case PAKET.LOADING:
      return Object.assign({}, state, {
        isLoading: action.load,
      });
    case PAKET.LOADING_DETAIL:
      return Object.assign({}, state, {
        isLoadingDetail: action.load,
      });
    case PAKET.LOADING_POST:
      return Object.assign({}, state, {
        isLoadingPost: action.load,
      });
    case PAKET.IS_ERROR:
      return Object.assign({}, state, {
        isError: action.load,
      });
    default:
      return state;
  }
};
