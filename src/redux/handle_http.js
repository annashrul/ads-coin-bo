import { HEADERS, NOTIF_ALERT } from "./actions/_constants";

import Swal from "sweetalert2";
import Axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

export function handleGet(url, callback, isClear = false) {
  Nprogress.start();
  // if (isClear) {
  //   purgeCache().then((res) => {});
  // }
  Axios.get(HEADERS.URL + url)
    .then(async (api) => {
      const data = api.data;
      callback(data);
      Nprogress.done();
    })
    .catch(function (error) {
      Nprogress.done();
      if (error.message === "Network Error") {
        Swal.fire("Terjadi Kesalahan", "cek koneksi internet anda", "error");
      }
    });
}
export const handlePost = (url, data, callback) => {
  Axios.post(HEADERS.URL + url, data)
    .then(function (response) {
      const data = response.data;
      if (data.status === "success") {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: NOTIF_ALERT.SUCCESS,
        });
        callback(true);
      } else {
        Swal.fire({
          title: "failed",
          icon: "error",
          text: NOTIF_ALERT.FAILED,
        });
        callback(false);
      }
    })
    .catch(function (error) {
      callback(false);
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

export const handlePut = (url, data, callback) => {
  Axios.put(HEADERS.URL + url, data)
    .then(function (response) {
      const data = response.data;
      if (data.status === "success") {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: NOTIF_ALERT.SUCCESS,
        });
        callback(true);
      } else {
        Swal.fire({
          title: "failed",
          icon: "error",
          text: NOTIF_ALERT.FAILED,
        });
        callback(false);
      }
    })
    .catch(function (error) {
      callback(false);
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

export const handleDelete = (url, callback) => {
  Swal.fire({
    title: "Tunggu sebentar.",
    html: NOTIF_ALERT.CHECKING,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    onClose: () => {},
  });

  Axios.delete(HEADERS.URL + url)
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
          callback(true);
        } else {
          Swal.fire({
            title: "failed",
            icon: "error",
            text: NOTIF_ALERT.FAILED,
          });
          callback(false);
        }
      }, 800);
    })
    .catch((error) => {
      Swal.close();
      callback(false);

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
