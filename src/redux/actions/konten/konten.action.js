import axios from "axios";
import Swal from "sweetalert2";
import { CONTENT, HEADERS, NOTIF_ALERT } from "../_constants";
import { ModalToggle } from "../modal.action";
import { handleGet } from "../../handle_http";
export function setLoading(load) {
  return {
    type: CONTENT.LOADING,
    load,
  };
}

export function setLoadingDetail(load) {
  return {
    type: CONTENT.LOADING_DETAIL,
    load,
  };
}
export function setLoadingPost(load) {
  return {
    type: CONTENT.LOADING_POST,
    load,
  };
}
export function setIsError(load) {
  return {
    type: CONTENT.IS_ERROR,
    load,
  };
}

export function setData(data = []) {
  return {
    type: CONTENT.SUCCESS,
    data,
  };
}

export function setDataEdit(data = []) {
  return {
    type: CONTENT.EDIT,
    data,
  };
}
export function setDataDetail(data = []) {
  return {
    type: CONTENT.DETAIL,
    data,
  };
}

export function setDataFailed(data = []) {
  return {
    type: CONTENT.FAILED,
    data,
  };
}

export const getContent = (content, where) => {
  return (dispatch) => {
    let url = `content/${content}`;
    if (where) {
      url += `?${where}`;
    }
    handleGet(url, (res) => {
      dispatch(setData(res));
    });
  };
};

export const postContent = (data, param) => {
  return (dispatch) => {
    dispatch(setLoadingPost(true));
    dispatch(setIsError(false));
    const url = HEADERS.URL + `content`;
    axios
      .post(url, data)
      .then(function (response) {
        const data = response.data;
        if (data.status === "success") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: NOTIF_ALERT.SUCCESS,
          });
          dispatch(setIsError(true));
          dispatch(ModalToggle(false));
          dispatch(getContent(param, `page=1`));
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
      })
      .catch(function (error) {
        dispatch(setLoadingPost(false));
        dispatch(setIsError(false));
        dispatch(ModalToggle(true));
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

export const putContent = (id, data, param) => {
  return (dispatch) => {
    dispatch(setLoadingPost(true));
    dispatch(setIsError(false));
    const url = HEADERS.URL + `content/${id}`;
    axios
      .put(url, data)
      .then(function (response) {
        const data = response.data;
        if (data.status === "success") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: NOTIF_ALERT.SUCCESS,
          });
          dispatch(setIsError(true));
          dispatch(ModalToggle(false));
          dispatch(getContent(param, `page=1`));
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
      })
      .catch(function (error) {
        dispatch(setLoadingPost(false));
        dispatch(setIsError(false));
        dispatch(ModalToggle(true));
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

export const deleteContent = (id, param) => async (dispatch) => {
  Swal.fire({
    title: "Tunggu sebentar.",
    html: NOTIF_ALERT.CHECKING,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    onClose: () => {},
  });

  axios
    .delete(HEADERS.URL + `content/${id}`)
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
        dispatch(getContent(param, `page=1`));
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
