import axios from "axios";
import Swal from "sweetalert2";
import { PROMO, HEADERS, NOTIF_ALERT } from "../_constants";
import { handleGet } from "../../handle_http";

export function setLoading(load) {
  return {
    type: PROMO.LOADING,
    load,
  };
}

export function setLoadingInvesment(load) {
  return {
    type: PROMO.LOADING_INVESMENT,
    load,
  };
}
export function setLoadingExcelInvesment(load) {
  return {
    type: PROMO.LOADING_EXCEL_INVESMENT,
    load,
  };
}
export function setShowModal(load) {
  return {
    type: PROMO.SHOW_MODAL,
    load,
  };
}

export function setLoadingExcel(load) {
  return {
    type: PROMO.LOADING_EXCEL,
    load,
  };
}

export function setLoadingDetail(load) {
  return {
    type: PROMO.LOADING_DETAIL,
    load,
  };
}
export function setLoadingPost(load) {
  return {
    type: PROMO.LOADING_POST,
    load,
  };
}
export function setIsError(load) {
  return {
    type: PROMO.IS_ERROR,
    load,
  };
}

export function setApproval(data = []) {
  return {
    type: PROMO.APPROVAL,
    data,
  };
}

export function setData(data = []) {
  return {
    type: PROMO.SUCCESS,
    data,
  };
}

export function setDataDetail(data = []) {
  return {
    type: PROMO.SUCCESS_DETAIL,
    data,
  };
}
export function setDataTopKontributor(data = []) {
  return {
    type: PROMO.SUCCESS_TOP_KONTRIBUTOR,
    data,
  };
}
export function setInvesment(data = []) {
  return {
    type: PROMO.DATA_INVESMENT,
    data,
  };
}
export function setExcelInvesment(data = []) {
  return {
    type: PROMO.EXCEL_INVESMENT,
    data,
  };
}
export function setExcel(data = []) {
  return {
    type: PROMO.EXCEL,
    data,
  };
}

export function setDataEdit(data = []) {
  return {
    type: PROMO.EDIT,
    data,
  };
}

export function setDataFailed(data = []) {
  return {
    type: PROMO.FAILED,
    data,
  };
}

export const getPromo = (page = 1, where) => {
  return (dispatch) => {
    let url = "promo";
    if (where) {
      url += `?page=${page}&${where}`;
    }
    handleGet(url, (res) => {
      dispatch(setData(res));
    });
  };
};

export const getExcelPromo = (where) => {
  return (dispatch) => {
    let url = "promo";
    if (where) {
      url += `?${where}`;
    }
    handleGet(url, (res) => {
      dispatch(setExcel(res));
    });
  };
};
export const putPromo = (data, id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Tunggu sebentar.",
      html: NOTIF_ALERT.CHECKING,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      onClose: () => {},
    });

    const url = HEADERS.URL + `promo/${id}`;
    axios
      .put(url, data)
      .then(function (response) {
        setTimeout(function () {
          Swal.close();
          const data = response.data;
          if (data.status === "success") {
            Swal.fire({
              title: "Success",
              icon: "success",
              text: NOTIF_ALERT.SUCCESS,
            });
            dispatch(getPromo(1));
          } else {
            Swal.fire({
              title: "failed",
              icon: "error",
              text: NOTIF_ALERT.FAILED,
            });
          }
          dispatch(getPromo(1));
        }, 800);
      })
      .catch(function (error) {
        Swal.close();
        if (error.message === "Network Error") {
          Swal.fire(
            "Network Failed!.",
            "Please check your connection",
            "error"
          );
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
};
export const postPromo = (data, id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Tunggu sebentar.",
      html: NOTIF_ALERT.CHECKING,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      onClose: () => {},
    });

    const url = HEADERS.URL + `promo`;
    axios
      .post(url, data)
      .then(function (response) {
        setTimeout(function () {
          Swal.close();
          const data = response.data;
          if (data.status === "success") {
            Swal.fire({
              title: "Success",
              icon: "success",
              text: NOTIF_ALERT.SUCCESS,
            });
            dispatch(getPromo(1));
          } else {
            Swal.fire({
              title: "failed",
              icon: "error",
              text: NOTIF_ALERT.FAILED,
            });
          }
          dispatch(getPromo(1));
        }, 800);
      })
      .catch(function (error) {
        Swal.close();
        if (error.message === "Network Error") {
          Swal.fire(
            "Network Failed!.",
            "Please check your connection",
            "error"
          );
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
};

export const deletePromo = (id) => async (dispatch) => {
  Swal.fire({
    title: "Tunggu sebentar.",
    html: NOTIF_ALERT.CHECKING,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    onClose: () => {},
  });

  axios
    .delete(HEADERS.URL + `promo/${id}`)
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
        } else {
          Swal.fire({
            title: "failed",
            icon: "error",
            text: NOTIF_ALERT.FAILED,
          });
        }
        dispatch(setLoading(false));
        dispatch(getPromo(`page=1`));
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
export const detailPromo = (id ) => {
  return (dispatch) => {
    let url = `promo/get/${id}`;
    handleGet(url, (res) => {
      dispatch(setDataDetail(res));
    });
  };
};
