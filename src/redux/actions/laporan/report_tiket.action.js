import { REPORT_TIKET } from "../_constants";
import { handleGet } from "../../handle_http";

export function setLoading(load) {
  return {
    type: REPORT_TIKET.LOADING,
    load,
  };
}
export function setLoadingExcel(load) {
  return {
    type: REPORT_TIKET.LOADING_EXCEL,
    load,
  };
}

export function setData(data = []) {
  return {
    type: REPORT_TIKET.SUCCESS,
    data,
  };
}
export function setExcel(data = []) {
  return {
    type: REPORT_TIKET.EXCEL,
    data,
  };
}

export const getDataReportTiket = (where = "") => {
  return (dispatch) => {
    let url = "transaction/report/pin";
    if (where !== "") url += `?${where}`;
    handleGet(url, (res) => {
      dispatch(setData(res));
    });
  };
};

export const getExcelReportTiket = (where = "") => {
  return (dispatch) => {
    let url = "transaction/report/pin";
    if (where !== "") url += `?${where}`;
    handleGet(url, (res) => {
      dispatch(setExcel(res));
    });
  };
};
