import { AUTH } from "./_constants";
import axios from "axios";
import Swal from "sweetalert2";
import { store, destroy } from "components/model/app.model";
import setAuthToken from "../../utils/setAuthToken";
import { HEADERS } from "./_constants";

// user register

// Login user -- get token
export const loginUser = (userData) => async (dispatch) => {
  Swal.fire({
    title: "Please Wait.",
    html: "Checking your account.",
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    onClose: () => {},
  });

  axios
    .post(HEADERS.URL + "auth/bo", userData)
    .then((res) => {
      setTimeout(function () {
        Swal.close();
        // save token to localStorage
        const token = res.data.result.token;
        localStorage.setItem("ads", btoa(token));
        store("sess", {
          id: res.data.result.id,
          token: token,
          name: res.data.result.name,
          username: res.data.result.username,
          foto: res.data.result.foto,
          level: res.data.result.level,
          access_level: res.data.result.access_level,
          status: res.data.result.status,
        });
        //
        // // Set token to Auth Header
        setAuthToken(token);
        // // decode token to set user data
        dispatch(setCurrentUser(res.data.result));
        dispatch(setLoggedin(true));
      }, 800);
    })
    .catch((err) => {
      Swal.close();
      if (err.message === "Network Error") {
        Swal.fire(
          "Server tidak tersambung!.",
          "Periksa koneksi internet anda.",
          "error"
        );
      } else {
        Swal.fire(err.response.data.msg, "", "error");
        dispatch({ type: AUTH.GET_ERRORS, payload: err.response.data.msg });
      }
    });
};
// set user data
export const setCurrentUser = (decoded) => {
  return {
    type: AUTH.SET_CURRENT_USER,
    payload: decoded,
  };
};

//set loggedin
export const setLoggedin = (decoded) => {
  return {
    type: AUTH.SET_LOGGED_USER,
    payload: decoded,
  };
};
// set logout user
export const logoutUser = () => (dispatch) => {
  // remove jwtToken from localStorage
  // localStorage.removeItem('jwtToken');
  destroy("sess");
  dispatch(setLoggedin(false));
  localStorage.clear();

  // remove auth header for future request
  setAuthToken(false);
  // Set current user to {} and isAuthenticated to false
  dispatch(setCurrentUser({}));
};
