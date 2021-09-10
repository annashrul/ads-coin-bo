

import {BONUS} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isLoadingExcel: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    approval: [],
    edit:[],
    detail:[],
}

export const bonusReducer = (state = initialState, action) => {
    switch (action.type) {
        case BONUS.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        
        case BONUS.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });

        case BONUS.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case BONUS.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });

        case BONUS.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case BONUS.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case BONUS.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}