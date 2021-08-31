

import {MEMBER} from "../../actions/_constants";

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
    edit:[],
    detail:[],
    excel:[],
    approval:[],
    invesment:[],
    excelInvesment:[],
    meta:{},
}

export const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEMBER.EXCEL_INVESMENT:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                excelInvesment: action.data.result,
            });
        case MEMBER.DATA_INVESMENT:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                invesment: action.data.result,
            });
        case MEMBER.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
                meta: action.data.meta,
            });
        case MEMBER.APPROVAL:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                approval: action.data.result,
            });


        case MEMBER.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case MEMBER.EXCEL:
            return Object.assign({}, state, {
                excel: action.data.result,
            });
        case MEMBER.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case MEMBER.SHOW_MODAL:
            return Object.assign({}, state, {
                isShowModal: action.load
            });
        case MEMBER.LOADING_INVESMENT:
            return Object.assign({}, state, {
                isLoadingInvesment: action.load
            });
        case MEMBER.LOADING_EXCEL_INVESMENT:
            return Object.assign({}, state, {
                isLoadingExcelInvesment: action.load
            });
        case MEMBER.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case MEMBER.LOADING_EXCEL:
            return Object.assign({}, state, {
                isLoadingExcel: action.load
            });
        case MEMBER.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case MEMBER.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case MEMBER.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}