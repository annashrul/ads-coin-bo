

import {USER_LEVEL} from "../../actions/_constants";

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

export const userLevelReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LEVEL.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
                meta: action.data.meta,
            });

        case USER_LEVEL.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case USER_LEVEL.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case USER_LEVEL.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case USER_LEVEL.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case USER_LEVEL.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case USER_LEVEL.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}