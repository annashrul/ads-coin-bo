

import {ALAMAT} from "../../actions/_constants";

const initialState = {
    isLoadingDetail: false,
    isShowModal: false,
    status: "",
    msg: "",
    data: [],
}

export const alamatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALAMAT.DETAIL:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result.data,
            });
        case ALAMAT.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case ALAMAT.SHOW_MODAL:
            return Object.assign({}, state, {
                isShowModal: action.load
            });
        default:
            return state
    }
}