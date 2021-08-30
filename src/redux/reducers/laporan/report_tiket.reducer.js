import { REPORT_TIKET } from "../../actions/_constants";

const initialState = {
  isLoading: true,
  isLoadingExcel: false,
  isError: false,
  status: "",
  msg: "",
  data: [],
  excel: [],
};

export const reportTiketReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_TIKET.SUCCESS:
      return Object.assign({}, state, {
        status: action.data.status,
        msg: action.data.msg,
        data: action.data.result,
      });
    case REPORT_TIKET.EXCEL:
      return Object.assign({}, state, {
        excel: action.data.result,
      });

    case REPORT_TIKET.LOADING:
      return Object.assign({}, state, {
        isLoading: action.load,
      });
    case REPORT_TIKET.LOADING_EXCEL:
      return Object.assign({}, state, {
        isLoadingExcel: action.load,
      });
    default:
      return state;
  }
};
