import axios from "axios"
import Swal from "sweetalert2";
import {BONUS, HEADERS,NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


export function setLoading(load) {
    return {
        type: BONUS.LOADING,
        load
    }
}


export function setLoadingDetail(load) {
    return {
        type: BONUS.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: BONUS.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: BONUS.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: BONUS.SUCCESS,
        data
    }
}

export function setDataEdit(data = []) {
    return {
        type: BONUS.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: BONUS.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: BONUS.FAILED,
        data
    }
}

export const getBonus = (where='') => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/bonus';
        if(where!==''){
            url+=`?${where}`;
        }
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setData(data));
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                dispatch(setLoading(false));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
            })

    }
};

export const postPenarikanBonus = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        dispatch(setIsError(false));
        const url = HEADERS.URL + `transaction/bonus/withdraw`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: NOTIF_ALERT.SUCCESS,
                    });
                    dispatch(setIsError(true));
                    dispatch(getBonus(`page=1`));
                    dispatch(ModalToggle(false));
                } else {
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
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
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
                else{
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: error.response.data.msg,
                    });

                    if (error.response) {

                    }
                }

            })
    }
}
