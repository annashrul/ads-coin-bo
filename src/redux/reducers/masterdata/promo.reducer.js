import {PROMO} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isLoadingExcel: false,

    isError: false,

    isLoadingInvesment:true,

    isShowModal:false,

    isLoadingExcelInvesment: false,

    status: "",
    msg: "",
    data: [],
    data_detail: [],
    edit:[],
    detail:[],
    excel:[],
    approval:[],
    invesment:[],
    excelInvesment:[],
    meta:{},
    meta_detail:{},
    data_top_kontributor:[],
    meta_top_kontributor:{},
}

export const promoReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROMO.EXCEL_INVESMENT:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                excelInvesment: action.data.result,
            });
        case PROMO.DATA_INVESMENT:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                invesment: action.data.result,
            });
        case PROMO.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
                meta: action.data.meta,
            });
        case PROMO.SUCCESS_DETAIL:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data_detail: action.data.result,
                meta_detail: action.data.meta,
            });
        case PROMO.SUCCESS_TOP_KONTRIBUTOR:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data_top_kontributor: action.data.result,
                meta_top_kontributor: action.data.meta,
            });
        case PROMO.APPROVAL:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                approval: action.data.result,
            });


        case PROMO.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case PROMO.EXCEL:
            return Object.assign({}, state, {
                excel: action.data.result,
            });
        case PROMO.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case PROMO.SHOW_MODAL:
            return Object.assign({}, state, {
                isShowModal: action.load
            });
        case PROMO.LOADING_INVESMENT:
            return Object.assign({}, state, {
                isLoadingInvesment: action.load
            });
        case PROMO.LOADING_EXCEL_INVESMENT:
            return Object.assign({}, state, {
                isLoadingExcelInvesment: action.load
            });
        case PROMO.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case PROMO.LOADING_EXCEL:
            return Object.assign({}, state, {
                isLoadingExcel: action.load
            });
        case PROMO.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case PROMO.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case PROMO.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}