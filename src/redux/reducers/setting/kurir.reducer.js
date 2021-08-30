import {
    KURIR
} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isError: false,
    status: "",
    msg: "",
    data: [],
    kecamatan: [],
    kota: [],
    provinsi: [],
    detail: []
}

export const kurirReducer = (state = initialState, action) => {
    switch (action.type) {
        case KURIR.KECAMATAN:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                kecamatan: action.data.result,
            });
        case KURIR.KOTA:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                kota: action.data.result,
            });
        case KURIR.PROVINSI:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                provinsi: action.data.result,
            });
        case KURIR.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case KURIR.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case KURIR.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case KURIR.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}