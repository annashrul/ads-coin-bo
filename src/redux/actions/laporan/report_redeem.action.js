import axios from "axios"
import Swal from "sweetalert2";
import {REPORT_REDEEM, HEADERS,NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


export function setLoading(load) {
    return {
        type: REPORT_REDEEM.LOADING,
        load
    }
}


export function setLoadingDetail(load) {
    return {
        type: REPORT_REDEEM.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: REPORT_REDEEM.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: REPORT_REDEEM.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: REPORT_REDEEM.SUCCESS,
        data
    }
}

export function setDataEdit(data = []) {
    return {
        type: REPORT_REDEEM.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: REPORT_REDEEM.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: REPORT_REDEEM.FAILED,
        data
    }
}

export const getReportRedeem = (where = '') => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/redeem/report';
        if (where !== '') {
            url += `?${where}`;
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

export const putReportRedeem = (id,data,where) => async dispatch =>{
    Swal.fire({
        title: 'Tunggu sebentar.',
        html: NOTIF_ALERT.CHECKING,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
        onClose: () => {}
    })

    axios.put(HEADERS.URL+`transaction/redeem/resi/${id}`,data)
        .then(response=>{
            setTimeout(
                function () {
                    Swal.close() ;
                    const data = (response.data);
                    if (data.status === 'success') {
                        Swal.fire({
                            title: 'Success',
                            icon: 'success',
                            text: NOTIF_ALERT.SUCCESS,
                        });
                    } else {
                        Swal.fire({
                            title: 'failed',
                            icon: 'error',
                            text: NOTIF_ALERT.FAILED,
                        });
                    }
                    dispatch(setLoading(false));
                    dispatch(getReportRedeem(where));
                },800)

        }).catch(error =>{
        Swal.close()
        dispatch(setLoading(false));
        if (error.message === 'Network Error') {
            Swal.fire(
                'Network Failed!.',
                'Please check your connection',
                'error'
            );
        }
        else {
            Swal.fire({
                title: 'failed',
                icon: 'error',
                text: error.response.data.msg,
            });
            if (error.response) {

            }
        }

    });
}



