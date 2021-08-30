import axios from "axios"
import Swal from "sweetalert2";
import {BONUS_SETTING, HEADERS,NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";
import {ToastQ} from "helper"

export function setLoading(load) {
    return {
        type: BONUS_SETTING.LOADING,
        load
    }
}
export function setIsError(load) {
    return {
        type: BONUS_SETTING.IS_ERROR,
        load
    }
}

export function setBonus(data = []) {
    return {
        type: BONUS_SETTING.BONUS,
        data
    }
}

export function setBonusRo(data = []) {
    return {
        type: BONUS_SETTING.BONUS_RO,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: BONUS_SETTING.FAILED,
        data
    }
}

export const fetchBonus = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(HEADERS.URL + `site/bonus`)
            .then(function (response) {
                const data = response.data;
                dispatch(setBonus(data));
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

export const fetchBonusRo = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(HEADERS.URL + `site/bonus_ro`)
            .then(function (response) {
                const data = response.data;
                dispatch(setBonusRo(data));
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


export const updateBonus = (data,id,note) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        dispatch(setIsError(false));
        let url = HEADERS.URL + 'site/bonus/'+id
        axios.put(url, data)
            .then(function (response) {
                const datum = (response.data);
                if (datum.status === 'success') {
                    ToastQ.fire({
                        icon: 'success',
                        title: `Berhasil update ${note}`
                    });
                    dispatch(setIsError(true));
                    
                } else {
                     ToastQ.fire({
                        icon: 'error',
                        title: `Gagal update ${note}`
                    });
                    dispatch(setIsError(false));
                }
                dispatch(setLoading(false));


            })
            .catch(function (error) {
                dispatch(setLoading(false));
                dispatch(setIsError(false));
                dispatch(ModalToggle(true));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                } else {
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

export const updateBonusRo = (data, id, note) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        dispatch(setIsError(false));
        let url = HEADERS.URL + 'site/bonus_ro/' + id
        axios.put(url, data)
            .then(function (response) {
                const datum = (response.data);
                if (datum.status === 'success') {
                    ToastQ.fire({
                        icon: 'success',
                        title: `Berhasil update ${note}`
                    });
                    dispatch(setIsError(true));
                    
                } else {
                    ToastQ.fire({
                        icon: 'error',
                        title: `Gagal update ${note}`
                    });
                    dispatch(setIsError(false));
                }
                dispatch(setLoading(false));


            })
            .catch(function (error) {
                dispatch(setLoading(false));
                dispatch(setIsError(false));
                dispatch(ModalToggle(true));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                } else {
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
