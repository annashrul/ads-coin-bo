import {
    BONUS_SETTING
} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isError: false,
    status: "",
    msg: "",
    data: [],
    bonus: [],
    bonus_ro: [],
    detail: []
}

export const bonusSettingReducer = (state = initialState, action) => {
    switch (action.type) {
        case BONUS_SETTING.BONUS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                bonus: action.data.result,
            });
        case BONUS_SETTING.BONUS_RO:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                bonus_ro: action.data.result,
            });
        case BONUS_SETTING.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case BONUS_SETTING.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case BONUS_SETTING.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case BONUS_SETTING.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}