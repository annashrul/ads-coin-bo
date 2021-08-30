

import {REPORT_REWARD} from "../../actions/_constants";

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

export const reportRewardReducer = (state = initialState, action) => {
    switch (action.type) {
        case REPORT_REWARD.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case REPORT_REWARD.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case REPORT_REWARD.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case REPORT_REWARD.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case REPORT_REWARD.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case REPORT_REWARD.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case REPORT_REWARD.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}