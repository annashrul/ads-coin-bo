

import {PENJUALAN} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    edit:[],
    detail:[]
}

export const laporanPenjualanReducer = (state = initialState, action) => {
    switch (action.type) {
        case PENJUALAN.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case PENJUALAN.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case PENJUALAN.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case PENJUALAN.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case PENJUALAN.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case PENJUALAN.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case PENJUALAN.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}