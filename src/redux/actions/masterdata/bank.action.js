import axios from "axios";
import Swal from "sweetalert2";
import { handleGet } from "../../handle_http";
import { ModalToggle, ModalType } from "../modal.action";
import { BANK, HEADERS, NOTIF_ALERT } from "../_constants";
export function setLoadingDetail(load) {
  return {
    type: BANK.LOADING_DETAIL,
    load,
  };
}
export function setShowModal(load) {
  return {
    type: BANK.SHOW_MODAL,
    load,
  };
}
export function setDataDetail(data = []) {
  return {
    type: BANK.DETAIL,
    data,
  };
}

export const getDetailBank = (where) => {
  return (dispatch) => {
    dispatch(ModalToggle(false));
    let url = `bank_member?id_member=${where}`;
    handleGet(url, (data) => {
      dispatch(setDataDetail(data));
      if (data.result.length === 0) {
        Swal.fire("Terjadi Kesalahan", "Data Tidak Tersedia", "error");
        dispatch(setShowModal(false));
      } else {
        dispatch(ModalToggle(true));
        dispatch(ModalType("formMemberBank"));
        dispatch(setShowModal(true));
      }
    });
  };
};

export const putMemberBank = (data, id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Tunggu sebentar.",
      html: NOTIF_ALERT.CHECKING,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      onClose: () => {},
    });

    const url = HEADERS.URL + `bank_member/${id}`;
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
          } else {
            Swal.fire({
              title: "failed",
              icon: "error",
              text: NOTIF_ALERT.FAILED,
            });
          }
          window.location.reload();
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
