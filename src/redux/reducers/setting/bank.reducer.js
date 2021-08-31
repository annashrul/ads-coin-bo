

import {BANKS} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    edit:[],
    detail:[],
    list_bank:[],
    meta:{},
}

export const banksReducer = (state = initialState, action) => {
    switch (action.type) {
        case BANKS.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
                meta: action.data.meta,
            });
        case BANKS.LISTBANK:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                list_bank: action.data.result,
            });
        case BANKS.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case BANKS.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case BANKS.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case BANKS.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case BANKS.LOADING_STORE:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case BANKS.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}