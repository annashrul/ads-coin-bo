import axios from "axios"
import Swal from "sweetalert2";
import {REPORT_REWARD, HEADERS,NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


export function setLoading(load) {
    return {
        type: REPORT_REWARD.LOADING,
        load
    }
}


export function setLoadingDetail(load) {
    return {
        type: REPORT_REWARD.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: REPORT_REWARD.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: REPORT_REWARD.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: REPORT_REWARD.SUCCESS,
        data
    }
}

export function setDataEdit(data = []) {
    return {
        type: REPORT_REWARD.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: REPORT_REWARD.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: REPORT_REWARD.FAILED,
        data
    }
}

export const getReportReward = (where = '') => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/reward/report';
        if (where !== '') {
            url += `?${where}`;
        }
        console.log(url);
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


