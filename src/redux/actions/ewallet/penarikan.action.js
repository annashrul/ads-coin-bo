import axios from "axios";
import Swal from "sweetalert2";
import { PENARIKAN, HEADERS, NOTIF_ALERT } from "../_constants";
import { ModalToggle } from "../modal.action";
import { handleGet } from "../../handle_http";

export function setLoading(load) {
  return {
    type: PENARIKAN.LOADING,
    load,
  };
}
export function setLoadingExcel(load) {
  return {
    type: PENARIKAN.LOADING_EXCEL,
    load,
  };
}

export function setLoadingDetail(load) {
  return {
    type: PENARIKAN.LOADING_DETAIL,
    load,
  };
}
export function setLoadingPost(load) {
  return {
    type: PENARIKAN.LOADING_POST,
    load,
  };
}
export function setIsError(load) {
  return {
    type: PENARIKAN.IS_ERROR,
    load,
  };
}

export function setData(data = []) {
  return {
    type: PENARIKAN.SUCCESS,
    data,
  };
}
export function setDataExcel(data = []) {
  return {
    type: PENARIKAN.EXCEL,
    data,
  };
}

export function setDataEdit(data = []) {
  return {
    type: PENARIKAN.EDIT,
    data,
  };
}
export function setDataDetail(data = []) {
  return {
    type: PENARIKAN.DETAIL,
    data,
  };
}

export function setDataFailed(data = []) {
  return {
    type: PENARIKAN.FAILED,
    data,
  };
}

export const getPenarikan = (where = "") => {
  return (dispatch) => {
    let url = "transaction/withdrawal";
    if (where !== "") {
      url += `?${where}`;
    }
    handleGet(url, (res) => {
      dispatch(setData(res));
    });
  };
};
export const getExcelPenarikan = (where = "") => {
  return (dispatch) => {
    let url = "transaction/withdrawal";
    if (where !== "") {
      url += `?${where}`;
    }
    handleGet(url, (res) => {
      dispatch(setDataExcel(res));
      if (res.result.length === 0)
        Swal.fire("Terjadi Kesalahan", "Data Tidak Tersedia", "error");
    });
  };
};

export const postPenarikan = (data, id) => async (dispatch) => {
  Swal.fire({
    title: "Please Wait.",
    html: NOTIF_ALERT.CHECKING,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    onClose: () => {},
  });
  const url = HEADERS.URL + `transaction/withdrawal/${id}`;
  axios
    .post(url, data)
    .then((response) => {
      setTimeout(function () {
        Swal.close();
        const data = response.data;
        if (data.status === "success") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: NOTIF_ALERT.SUCCESS,
          });
          dispatch(setIsError(true));
          dispatch(ModalToggle(false));
          dispatch(getPenarikan("page=1"));
        } else {
          Swal.fire({
            title: "failed",
            icon: "error",
            text: NOTIF_ALERT.FAILED,
          });
          dispatch(setIsError(false));
          dispatch(ModalToggle(true));
        }
        dispatch(setLoadingPost(false));
      }, 800);
    })
    .catch((error) => {
      Swal.close();
      dispatch(setLoading(false));
      if (error.message === "Network Error") {
        Swal.fire("Network Failed!.", "Please check your connection", "error");
      } else {
        Swal.fire({
          title: "failed",
          icon: "error",
          text: error.response.data.msg,
        });
        if (error.response) {
        }
      }
    });
};
