import {
    GENERAL
} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isError: false,
    status: "",
    msg: "",
    data: [],
    plafon: [],
    karir: [],
    landing: [],
    detail: []
}

export const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GENERAL.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case GENERAL.LANDING:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                landing: action.data.result,
            });
        case GENERAL.PLAFON:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                plafon: action.data.result,
            });
         case GENERAL.KARIR:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                karir: action.data.result,
            });
        case GENERAL.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case GENERAL.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case GENERAL.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case GENERAL.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}