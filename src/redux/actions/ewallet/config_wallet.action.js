import axios from "axios";
import Swal from "sweetalert2";
import { CONFIG_WALLET, HEADERS } from "../_constants";

export function setLoading(load) {
  return {
    type: CONFIG_WALLET.LOADING,
    load,
  };
}

export function setData(data = []) {
  return {
    type: CONFIG_WALLET.SUCCESS,
    data,
  };
}

export const getConfigWallet = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    let url = "transaction/wallet/config";
    axios
      .get(HEADERS.URL + `${url}`)
      .then(function (response) {
        const data = response.data;
        dispatch(setData(data));
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
