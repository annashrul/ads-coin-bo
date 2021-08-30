import axios from "axios";
import Swal from "sweetalert2";
import { PIN, HEADERS, NOTIF_ALERT } from "../_constants";
import { ModalToggle } from "../modal.action";
import { handleGet } from "../../handle_http";

export function setLoading(load) {
  return {
    type: PIN.LOADING,
    load,
  };
}

export function setLoadingPost(load) {
  return {
    type: PIN.LOADING_POST,
    load,
  };
}
export function setIsError(load) {
  return {
    type: PIN.IS_ERROR,
    load,
  };
}

export function setData(data = []) {
  return {
    type: PIN.SUCCESS,
    data,
  };
}

export const getPin = (where) => {
  return (dispatch) => {
    let url = "pin";
    if (where) {
      url += `?${where}`;
    }
    handleGet(url, (res) => {
      dispatch(setData(res));
    });
  };
};

export const generatePin = (data) => {
  return (dispatch) => {
    dispatch(setLoadingPost(true));
    dispatch(setIsError(false));
    const url = HEADERS.URL + `pin`;
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
          dispatch(getPin("page=1"));
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
