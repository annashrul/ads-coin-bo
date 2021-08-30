

import {CONTENT} from "../../actions/_constants";

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

export const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTENT.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case CONTENT.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case CONTENT.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case CONTENT.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case CONTENT.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case CONTENT.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case CONTENT.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}