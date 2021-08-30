import {
    POIN_KELIPATAN_RO
} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isError: false,
    status: "",
    msg: "",
    data: [],
    detail: []
}

export const poinKelipatanRoReducer = (state = initialState, action) => {
    switch (action.type) {
        case POIN_KELIPATAN_RO.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case POIN_KELIPATAN_RO.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case POIN_KELIPATAN_RO.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case POIN_KELIPATAN_RO.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case POIN_KELIPATAN_RO.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}