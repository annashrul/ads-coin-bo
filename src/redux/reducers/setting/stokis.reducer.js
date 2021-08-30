import {
    KONFIGURASI_STOCKIST
} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isError: false,
    status: "",
    msg: "",
    data: [],
    detail: []
}

export const konfigurasiStokisReducer = (state = initialState, action) => {
    switch (action.type) {
        case KONFIGURASI_STOCKIST.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case KONFIGURASI_STOCKIST.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case KONFIGURASI_STOCKIST.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case KONFIGURASI_STOCKIST.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}