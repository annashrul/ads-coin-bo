

import {CLAIM} from "../../actions/_constants";

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

export const claimReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLAIM.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case CLAIM.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case CLAIM.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case CLAIM.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case CLAIM.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case CLAIM.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case CLAIM.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}