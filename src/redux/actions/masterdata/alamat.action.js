import axios from "axios"
import Swal from "sweetalert2";
import {ALAMAT, HEADERS} from "../_constants";



export function setLoadingDetail(load) {
    return {
        type: ALAMAT.LOADING_DETAIL,
        load
    }
}
export function setShowModal(load) {
    return {
        type: ALAMAT.SHOW_MODAL,
        load
    }
}
export function setDataDetail(data = []) {
    return {
        type: ALAMAT.DETAIL,
        data
    }
}


export const getDetailAlamat = (where) => {
    return (dispatch) => {
        dispatch(setLoadingDetail(true));
        dispatch(setShowModal(false));
        let url = `alamat?id_member=${where}`;
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                if(data.result.length===0){
                    Swal.fire(
                        'Terjadi Kesalahan',
                        'Data Tidak Tersedia',
                        'error'
                    );
                    dispatch(setShowModal(false));
                }else{
                    dispatch(setShowModal(true));
                }
                dispatch(setDataDetail(data));
                dispatch(setLoadingDetail(false));
            })
            .catch(function (error) {
                dispatch(setShowModal(false));
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
