import { REPORT_PAKET } from "../_constants";
import { handleGet } from "../../handle_http";

export function setLoading(load) {
  return {
    type: REPORT_PAKET.LOADING,
    load,
  };
}
export function setLoadingExcel(load) {
  return {
    type: REPORT_PAKET.LOADING_EXCEL,
    load,
  };
}

export function setData(data = []) {
  return {
    type: REPORT_PAKET.SUCCESS,
    data,
  };
}
export function setExcel(data = []) {
  return {
    type: REPORT_PAKET.EXCEL,
    data,
  };
}

export const getDataReportPaket = (where = "") => {
  return (dispatch) => {
    let url = "transaction/report/penjualan";
    if (where !== "") url += `?${where}`;
    handleGet(url, (res) => {
      dispatch(setData(res));
    });
  };
};

export const getExcelReportPaket = (where = "") => {
  return (dispatch) => {
    let url = "transaction/report/penjualan";
    if (where !== "") url += `?${where}`;
    handleGet(url, (res) => {
      dispatch(setExcel(res));
    });
  };
};

export const getDataReportPembelian = (where = "") => {
  return (dispatch) => {
    let url = "transaction/report/pembelian";
    if (where !== "") url += `?${where}`;
    handleGet(url, (res) => {
      dispatch(setData(res));
    });
  };
};

export const getExcelReportPembelian = (where = "") => {
  return (dispatch) => {
    let url = "transaction/report/pembelian";
    if (where !== "") url += `?${where}`;
    handleGet(url, (res) => {
      dispatch(setExcel(res));
    });
  };
};
