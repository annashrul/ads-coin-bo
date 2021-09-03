

import {PENARIKAN} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isLoadingExcel: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    edit:[],
    detail:[],
    excel:[],
    meta:{}
}

export const penarikanReducer = (state = initialState, action) => {
    switch (action.type) {
        case PENARIKAN.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
                meta: action.data.meta,
            });
        case PENARIKAN.EXCEL:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                excel: action.data.result,
            });

        case PENARIKAN.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case PENARIKAN.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case PENARIKAN.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case PENARIKAN.LOADING_EXCEL:
            return Object.assign({}, state, {
                isLoadingExcel: action.load
            });
        case PENARIKAN.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case PENARIKAN.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case PENARIKAN.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}