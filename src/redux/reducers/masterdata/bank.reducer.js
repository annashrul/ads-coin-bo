

import {BANK} from "../../actions/_constants";

const initialState = {
    isLoadingDetail: false,
    isShowModal: false,
    status: "",
    msg: "",
    data: [],
    meta:{},
}

export const bankReducer = (state = initialState, action) => {
    switch (action.type) {
        case BANK.DETAIL:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result.data,
                meta: action.data.meta,
            });
        case BANK.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case BANK.SHOW_MODAL:
            return Object.assign({}, state, {
                isShowModal: action.load
            });
        default:
            return state
    }
}