

import {REPORT_REDEEM} from "../../actions/_constants";

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

export const reportRedeemReducer = (state = initialState, action) => {
    switch (action.type) {
        case REPORT_REDEEM.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case REPORT_REDEEM.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case REPORT_REDEEM.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case REPORT_REDEEM.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case REPORT_REDEEM.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case REPORT_REDEEM.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case REPORT_REDEEM.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}