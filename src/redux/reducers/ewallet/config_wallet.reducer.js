import { CONFIG_WALLET } from "../../actions/_constants";

const initialState = {
  isLoading: true,
  status: "",
  msg: "",
  data: [],
};

export const configWalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_WALLET.SUCCESS:
      return Object.assign({}, state, {
        status: action.data.status,
        msg: action.data.msg,
        data: action.data.result,
      });

    case CONFIG_WALLET.LOADING:
      return Object.assign({}, state, {
        isLoading: action.load,
      });
    default:
      return state;
  }
};
