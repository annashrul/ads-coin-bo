import axios from "axios";
import Swal from "sweetalert2";
import { KATEGORI, HEADERS, NOTIF_ALERT } from "../_constants";
import { ModalToggle } from "../modal.action";
import { handleGet } from "../../handle_http";

export function setLoading(load) {
  return {
    type: KATEGORI.LOADING,
    load,
  };
}
export function setLoadingPost(load) {
  return {
    type: KATEGORI.LOADING_POST,
    load,
  };
}
export function setIsError(load) {
  return {
    type: KATEGORI.IS_ERROR,
    load,
  };
}

export function setData(data = []) {
  return {
    type: KATEGORI.SUCCESS,
    data,
  };
}

export function setDataEdit(data = []) {
  return {
    type: KATEGORI.EDIT,
    data,
  };
}
export function setDataDetail(data = []) {
  return {
    type: KATEGORI.DETAIL,
    data,
  };
}

export function setDataFailed(data = []) {
  return {
    type: KATEGORI.FAILED,
    data,
  };
}

export const fetchKategori = (where) => {
  return (dispatch) => {
    let url = `category/${where}`.toLocaleLowerCase();
    handleGet(url, (res) => {
      dispatch(setData(res));
    });
  };
};

export const postKategori = (data, param) => {
  return (dispatch) => {
    dispatch(setLoadingPost(true));
    dispatch(setIsError(false));
    const url = HEADERS.URL + `category`;
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
          dispatch(ModalToggle(false));

          dispatch(setIsError(true));
          dispatch(fetchKategori(`${param}?page=1`));
        } else {
          Swal.fire({
            title: "failed",
            icon: "error",
            text: NOTIF_ALERT.FAILED,
          });
          dispatch(ModalToggle(true));

          dispatch(setIsError(false));
        }
        dispatch(setLoadingPost(false));
      })
      .catch(function (error) {
        dispatch(setLoadingPost(false));
        dispatch(setIsError(false));
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

export const putKategori = (id, data, param) => {
  console.log(param);
  return (dispatch) => {
    dispatch(setLoadingPost(true));
    dispatch(setIsError(false));
    const url = HEADERS.URL + `category/${id}`;
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
          dispatch(fetchKategori(`${param}?page=1`));
          dispatch(ModalToggle(false));
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

export const deleteKategori = (id, param) => async (dispatch) => {
  Swal.fire({
    title: "Tunggu sebentar.",
    html: NOTIF_ALERT.CHECKING,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    onClose: () => {},
  });

  axios
    .delete(HEADERS.URL + `category/${id}`)
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
        dispatch(fetchKategori(`${param}?page=1`));
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
