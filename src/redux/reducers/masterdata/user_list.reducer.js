

import {USER_LIST} from "../../actions/_constants";

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
    meta:{},
}

export const userListReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LIST.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
                meta: action.data.meta,
            });

        case USER_LIST.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case USER_LIST.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case USER_LIST.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case USER_LIST.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case USER_LIST.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case USER_LIST.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}