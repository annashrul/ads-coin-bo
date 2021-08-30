import { combineReducers } from "redux";
import { modalReducer, modalTypeReducer } from "./modal.reducer";
import { dashboardReducer } from "./dashboard/dashboard.reducer";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import { siteReducer } from "./site.reducer";
import { kategoriReducer } from "./kategori/kategori.reducer";
import { pinReducer } from "./paket/pin.reducer";
import { paketReducer } from "./paket/paket.reducer";
import { memberReducer } from "./masterdata/member.reducer";
import { alamatReducer } from "./masterdata/alamat.reducer";
import { bankReducer } from "./masterdata/bank.reducer";
import { contentReducer } from "./konten/konten.reducer";
import { userListReducer } from "./masterdata/user_list.reducer";
import { userLevelReducer } from "./masterdata/user_level.reducer";
import { depositReducer } from "./ewallet/deposit.reducer";
import { configWalletReducer } from "./ewallet/config_wallet.reducer";
import { penarikanReducer } from "./ewallet/penarikan.reducer";
import { reportTransaksiMemberReducer } from "./laporan/report_transaksi_member.reducer";
import { reportPaketReducer } from "./laporan/report_paket.reducer";
import { reportTiketReducer } from "./laporan/report_tiket.reducer";
import { generalReducer } from "./setting/general.reducer";
import { banksReducer } from "./setting/bank.reducer";

export default combineReducers({
  modalReducer,
  modalTypeReducer,
  dashboardReducer,
  siteReducer,
  pinReducer,
  paketReducer,
  memberReducer,
  alamatReducer,
  bankReducer,
  userListReducer,
  userLevelReducer,
  kategoriReducer,
  contentReducer,
  depositReducer,
  configWalletReducer,
  penarikanReducer,
  reportTransaksiMemberReducer,
  reportPaketReducer,
  reportTiketReducer,
  generalReducer,
  banksReducer,
  auth: authReducer,
  errors: errorsReducer,
});
