import axios from "axios"
import Swal from "sweetalert2";
import {REPORT_BARANG, HEADERS,NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


export function setLoading(load) {
    return {
        type: REPORT_BARANG.LOADING,
        load
    }
}
export function setLoadingExcel(load) {
    return {
        type: REPORT_BARANG.LOADING_EXCEL,
        load
    }
}
export function setLoadingDetailExcel(load) {
    return {
        type: REPORT_BARANG.LOADING_DETAIL_EXCEL,
        load
    }
}

export function setLoadingDetail(load) {
    return {
        type: REPORT_BARANG.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: REPORT_BARANG.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: REPORT_BARANG.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: REPORT_BARANG.SUCCESS,
        data
    }
}
export function setExcel(data = []) {
    return {
        type: REPORT_BARANG.EXCEL,
        data
    }
}
export function setDetailExcel(data = []) {
    return {
        type: REPORT_BARANG.DETAIL_EXCEL,
        data
    }
}

export function setDataEdit(data = []) {
    return {
        type: REPORT_BARANG.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: REPORT_BARANG.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: REPORT_BARANG.FAILED,
        data
    }
}

export const getReportBarang = (where = '') => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/penjualan/bybarang';
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
export const getExcelReportBarang = (where = '') => {
    return (dispatch) => {
        dispatch(setLoadingExcel(true));
        let url = 'transaction/penjualan/bybarang';
        if (where !== '') {
            url += `?${where}`;
        }
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setExcel(data));
                dispatch(setLoadingExcel(false));
            })
            .catch(function (error) {
                dispatch(setLoadingExcel(false));
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
export const getDetailReportBarang = (param,where='') => {
    return (dispatch) => {
        dispatch(setLoadingDetail(true));
        let url = 'transaction/penjualan/bybarang/'+btoa(param);
        if(where!==''){
            url+=`?${where}`;
        }
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setDataDetail(data));
                dispatch(setLoadingDetail(false));
            })
            .catch(function (error) {
                dispatch(setLoadingDetail(false));
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
export const getExcelDetailReportBarang = (param,where='') => {
    return (dispatch) => {
        dispatch(setLoadingDetailExcel(true));
        let url = 'transaction/penjualan/bybarang/'+btoa(param);
        if(where!==''){
            url+=`?${where}`;
        }
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setDetailExcel(data));
                dispatch(setLoadingDetailExcel(false));
            })
            .catch(function (error) {
                dispatch(setLoadingDetailExcel(false));
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




