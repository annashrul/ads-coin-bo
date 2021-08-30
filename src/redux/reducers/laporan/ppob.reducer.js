

import {PPOB} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    produk: [],
    operator: [],
    kategori: [],
    edit:[],
    detail:[]
}

export const ppobReducer = (state = initialState, action) => {
    switch (action.type) {
        case PPOB.PRODUK:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                produk: action.data.result,
            });
        case PPOB.KATEGORI:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                kategori: action.data.result,
            });
    case PPOB.OPERATOR:
        return Object.assign({}, state, {
            status: action.data.status,
            msg: action.data.msg,
            operator: action.data.result,
        });
        case PPOB.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case PPOB.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case PPOB.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case PPOB.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case PPOB.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case PPOB.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}