

import {REPORT_BARANG} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingExcel: false,
    isLoadingDetailExcel: false,
    isLoadingDetail: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    edit:[],
    detail:[],
    excel:[],
    detailExcel:[],
}

export const reportBarangReducer = (state = initialState, action) => {
    switch (action.type) {
        case REPORT_BARANG.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case REPORT_BARANG.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case REPORT_BARANG.EXCEL:
            return Object.assign({}, state, {
                excel: action.data.result,
            });
        case REPORT_BARANG.DETAIL_EXCEL:
            return Object.assign({}, state, {
                detailExcel: action.data.result,
            });

        case REPORT_BARANG.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case REPORT_BARANG.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case REPORT_BARANG.LOADING_DETAIL_EXCEL:
            return Object.assign({}, state, {
                isLoadingDetailExcel: action.load
            });
        case REPORT_BARANG.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case REPORT_BARANG.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case REPORT_BARANG.LOADING_EXCEL:
            return Object.assign({}, state, {
                isLoadingExcel: action.load
            });
        case REPORT_BARANG.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}