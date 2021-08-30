import axios from "axios"
import Swal from "sweetalert2";
import {CLAIM, HEADERS,NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


export function setLoading(load) {
    return {
        type: CLAIM.LOADING,
        load
    }
}


export function setLoadingDetail(load) {
    return {
        type: CLAIM.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: CLAIM.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: CLAIM.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: CLAIM.SUCCESS,
        data
    }
}

export function setDataEdit(data = []) {
    return {
        type: CLAIM.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: CLAIM.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: CLAIM.FAILED,
        data
    }
}

export const fetchData = (where='') => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/reward/report';
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
export const approval = (kd_trx, status) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/reward/approval/' + btoa(kd_trx);
        axios.put(HEADERS.URL + url, {
                status
            })
            .then(function (response) {
                const data = response.data;
                dispatch(fetchData('page=1'))
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