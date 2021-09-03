import axios from "axios";
import Swal from "sweetalert2";
import { MEMBER, HEADERS, NOTIF_ALERT } from "../_constants";
import { handleGet } from "../../handle_http";

export function setLoading(load) {
  return {
    type: MEMBER.LOADING,
    load,
  };
}

export function setLoadingInvesment(load) {
  return {
    type: MEMBER.LOADING_INVESMENT,
    load,
  };
}
export function setLoadingExcelInvesment(load) {
  return {
    type: MEMBER.LOADING_EXCEL_INVESMENT,
    load,
  };
}
export function setShowModal(load) {
  return {
    type: MEMBER.SHOW_MODAL,
    load,
  };
}

export function setLoadingExcel(load) {
  return {
    type: MEMBER.LOADING_EXCEL,
    load,
  };
}

export function setLoadingDetail(load) {
  return {
    type: MEMBER.LOADING_DETAIL,
    load,
  };
}
export function setLoadingPost(load) {
  return {
    type: MEMBER.LOADING_POST,
    load,
  };
}
export function setIsError(load) {
  return {
    type: MEMBER.IS_ERROR,
    load,
  };
}

export function setApproval(data = []) {
  return {
    type: MEMBER.APPROVAL,
    data,
  };
}

export function setData(data = []) {
  return {
    type: MEMBER.SUCCESS,
    data,
  };
}
export function setDataTopKontributor(data = []) {
  return {
    type: MEMBER.SUCCESS_TOP_KONTRIBUTOR,
    data,
  };
}
export function setInvesment(data = []) {
  return {
    type: MEMBER.DATA_INVESMENT,
    data,
  };
}
export function setExcelInvesment(data = []) {
  return {
    type: MEMBER.EXCEL_INVESMENT,
    data,
  };
}
export function setExcel(data = []) {
  return {
    type: MEMBER.EXCEL,
    data,
  };
}

export function setDataEdit(data = []) {
  return {
    type: MEMBER.EDIT,
    data,
  };
}
export function setDataDetail(data = []) {
  return {
    type: MEMBER.DETAIL,
    data,
  };
}

export function setDataFailed(data = []) {
  return {
    type: MEMBER.FAILED,
    data,
  };
}

export const getMember = (page = 1, where) => {
  return (dispatch) => {
    let url = "member";
    if (where) {
      url += `?page=${page}&${where}`;
    }
    handleGet(url, (res) => {
      dispatch(setData(res));
    });
  };
};

export const getMemberTopKontributor = (page = 1, where) => {
  return (dispatch) => {
    let url = "member/top_kontributor";
    if (where) {
      url += `?page=${page}&${where}`;
    }
    handleGet(url, (res) => {
      dispatch(setDataTopKontributor(res));
    });
  };
};

export const getExcelMember = (where) => {
  return (dispatch) => {
    let url = "member";
    if (where) {
      url += `?${where}`;
    }
    handleGet(url, (res) => {
      dispatch(setExcel(res));
    });
  };
};
export const getListApproval = (where) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    let url = "member/validasi/ktp";
    if (where) {
      url += `?${where}`;
    }

    axios
      .get(HEADERS.URL + `${url}`)
      .then(function (response) {
        const data = response.data;
        dispatch(setApproval(data));
        dispatch(setLoading(false));
      })
      .catch(function (error) {
        dispatch(setLoading(false));
        if (error.message === "Network Error") {
          Swal.fire(
            "Network Failed!.",
            "Please check your connection",
            "error"
          );
        }
      });
  };
};
export const putMember = (data, id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Tunggu sebentar.",
      html: NOTIF_ALERT.CHECKING,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      onClose: () => {},
    });

    const url = HEADERS.URL + `member/${id}`;
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
            dispatch(getMember(1));
            dispatch(getListApproval());
          } else {
            Swal.fire({
              title: "failed",
              icon: "error",
              text: NOTIF_ALERT.FAILED,
            });
          }
          dispatch(getMember(1));
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
export const getInvesment = (where) => {
  return (dispatch) => {
    let url = "transaction/history/investment";
    if (where) {
      url += `?${where}`;
    }
    console.log(url);
    dispatch(setLoadingInvesment(true));
    handleGet(url, (data) => {
      dispatch(setInvesment(data));
      dispatch(setLoadingInvesment(false));
    });
  };
};
export const getExcelInvesment = (where) => {
  return (dispatch) => {
    dispatch(setLoadingExcelInvesment(true));
    let url = "transaction/history/investment";
    if (where) {
      url += `?${where}`;
    }
    axios
      .get(HEADERS.URL + `${url}`)
      .then(function (response) {
        const data = response.data;
        dispatch(setExcelInvesment(data));
        dispatch(setLoadingExcelInvesment(false));
      })
      .catch(function (error) {
        dispatch(setLoadingExcelInvesment(false));
        if (error.message === "Network Error") {
          Swal.fire(
            "Network Failed!.",
            "Please check your connection",
            "error"
          );
        }
      });
  };
};
