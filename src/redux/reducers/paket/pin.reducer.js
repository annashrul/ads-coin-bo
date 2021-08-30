

import {PIN} from "../../actions/_constants";

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

export const pinReducer = (state = initialState, action) => {
    switch (action.type) {
        case PIN.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case PIN.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case PIN.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case PIN.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case PIN.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case PIN.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case PIN.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}