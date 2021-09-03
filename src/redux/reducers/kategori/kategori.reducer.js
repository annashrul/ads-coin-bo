

import {KATEGORI} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    edit:[],
    detail:[],
    meta:{}
}

export const kategoriReducer = (state = initialState, action) => {
    switch (action.type) {
        case KATEGORI.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
                meta: action.data.meta
            });
        case KATEGORI.EDIT:
            return Object.assign({}, state, {
                edit: action.data.result,
            });
        case KATEGORI.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case KATEGORI.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case KATEGORI.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case KATEGORI.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case KATEGORI.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}