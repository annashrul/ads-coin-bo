/*****************
 * isLading
 *****************/
export const LOADING = {
  IS_LOADING: "IS_LOADING",
};

/****************
      TOKEN
*****************/
export const TOKEN = {
  GET: "GET_TOKEN",
};

export const NOTIF_ALERT = {
  SUCCESS: "Data Berhasil Disimpan",
  FAILED: "Data Gagal Disimpan",
  CHECKING: "Pengecekan Data",
  NO_DATA: "https://www.mediseller.com/front_assets/img/search.png",
};

export const HEADERS = {
  // URL: "http://192.168.100.9:6704/",
  URL: "http://ptnetindo.com:6703/",
  TOKEN:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwY2RiN2M5OC0wNWNmLTQ4NDgtOGM3Yy0yZTFiYTczZGUwNmYiLCJpYXQiOjE1NzAxNzM0ODYsImV4cCI6MTU3MDc3ODI4Nn0.1NiWtt2luG83am8FJSvWpL5p35Oxd8GSJJTwhFmAdgw",
  USERNAME: "netindo",
  PASSWORD: "$2b$08$hLMU6rEvNILCMaQbthARK.iCmDRO7jNbUB8CcvyRStqsHD4UQxjDO",
  PROJECT_ID: "8123268367ea27e094e71e290"
};

/****************
      MODAL
*****************/
export const MODALS = {
  IS_MODAL_OPEN: "IS_MODAL_OPEN",
  MODAL_TYPE: "MODAL_TYPE",
};

/****************
      AUTH
*****************/
export const AUTH = {
  FETCH_DATAS: "FETCH_DATAS",
  GET_ERRORS: "GET_ERRORS",
  TEST_DISPATCH: "TEST_DISPATCH",
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_LOGGED_USER: "SET_LOGGED_USER",
};

/****************
 DASHBOARD
 *****************/
export const DASHBOARD = {
  LOADING: "SET_DASHBOARD_LOADING",
  SUCCESS: "SET_DASHBOARD_SUCCESS",
  LOADING_BO: "SET_DASHBOARD_LOADING_BO",
  SUCCESS_BO: "SET_DASHBOARD_SUCCESS_BO",
  SUCCESS_NEWEST: "SET_DASHBOARD_SUCCESS_NEWEST",
  FAILED: "SET_DASHBOARD_FAILED",
  DETAIL: "SET_DASHBOARD_DETAIL",
  POST_LOADING: "SET_DASHBOARD_POST_LOADING",
};

/****************
 SITE SECTION
 *****************/
export const SITE = {
  LOADING: "SET_SITE_LOADING",
  SUCCESS: "SET_SITE_SUCCESS",
  SUCCESS_LIST: "SET_SITE_SUCCESS_LIST",
  SUCCESS_FOLDER: "SET_SITE_SUCCESS_FOLDER",
  SUCCESS_TABLES: "SET_SITE_SUCCESS_TABLES",
  FAILED: "SET_SITE_FAILED",
  DETAIL: "SET_SITE_DETAIL",
  SUCCESS_CHECK: "SET_SITE_SUCCESS_CHECK",
  TRIGGER_ECAPS: "SET_TRIGGER_ECAPS",
  DOWNLOAD_TXT: "SET_DOWNLOAD_TXT",
  TRIGGER_MOBILE_ECAPS: "SET_TRIGGER_MOBILE_ECAPS",
};

/****************
 PAKET
 *****************/
let prefPaket = "PAKET";
export const PAKET = {
  LOADING: `SET_${prefPaket}_LOADING`,
  LOADING_POST: `SET_${prefPaket}_LOADING_POST`,
  LOADING_DETAIL: `SET_${prefPaket}_LOADING_DETAIL`,
  IS_ERROR: `SET_${prefPaket}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefPaket}`,
  FAILED: `FAILED_${prefPaket}`,
  DETAIL: `DETAIL_${prefPaket}`,
};

/****************
 KATEGORI
 *****************/
let prefKategori = "KATEGORI";
export const KATEGORI = {
  LOADING: `SET_${prefKategori}_LOADING`,
  LOADING_TESTIMONI: `SET_${prefKategori}_LOADING_TESTIMONI`,
  LOADING_POST: `SET_${prefKategori}_LOADING_POST`,
  IS_ERROR: `SET_${prefKategori}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefKategori}`,
  SUCCESS_TESTIMONI: `SUCCESS_${prefKategori}_TESTIMONI`,
  FAILED: `FAILED_${prefKategori}`,
  DETAIL: `DETAIL_${prefKategori}`,
  EDIT: `EDIT_${prefKategori}`,
};
/****************
     PIN
     *****************/
let prefPin = "PIN";
export const PIN = {
  LOADING: `SET_${prefPin}_LOADING`,
  LOADING_POST: `SET_${prefPin}_LOADING_POST`,
  IS_ERROR: `SET_${prefPin}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefPin}`,
  FAILED: `FAILED_${prefPin}`,
  DETAIL: `DETAIL_${prefPin}`,
  EDIT: `EDIT_${prefPin}`,
};
/****************
     MEMBER
     *****************/
let prefMember = "MEMBER";
export const MEMBER = {
  LOADING: `SET_${prefMember}_LOADING`,
  LOADING_DETAIL: `SET_${prefMember}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefMember}_LOADING_POST`,
  IS_ERROR: `SET_${prefMember}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefMember}`,
  SUCCESS_TOP_KONTRIBUTOR: `SUCCESS_${prefMember}_TOP_KONTRIBUTOR`,
  APPROVAL: `APPROVAL_${prefMember}`,
  FAILED: `FAILED_${prefMember}`,
  DETAIL: `DETAIL_${prefMember}`,
  EDIT: `EDIT_${prefMember}`,
  LOADING_EXCEL: `SET_${prefMember}_LOADING_EXCEL`,
  EXCEL: `EXCEL_${prefMember}`,
  LOADING_INVESMENT: `SET_${prefMember}_LOADING_INVESMENT`,
  DATA_INVESMENT: `DATA_INVESMENT_${prefMember}`,
  SHOW_MODAL: `SHOW_MODAL_${prefMember}`,
  LOADING_EXCEL_INVESMENT: `SET_${prefMember}_LOADING_EXCEL`,
  EXCEL_INVESMENT: `EXCEL_INVESMENT_${prefMember}`,
};

/****************
     ALAMAT
     *****************/
let prefAlamat = "ALAMAT";
export const ALAMAT = {
  LOADING_DETAIL: `SET_${prefAlamat}_LOADING_DETAIL`,
  DETAIL: `DETAIL_${prefAlamat}`,
  SHOW_MODAL: `SHOW_MODAL_${prefAlamat}`,
};
/****************
     BANK
     *****************/
let prefBank = "BANK";
export const BANK = {
  LOADING_DETAIL: `SET_${prefBank}_LOADING_DETAIL`,
  DETAIL: `DETAIL_${prefBank}`,
  SHOW_MODAL: `SHOW_MODAL_${prefBank}`,
};
/****************
     CONTENT
     *****************/
let prefContent = "CONTENT";
export const CONTENT = {
  LOADING: `SET_${prefContent}_LOADING`,
  LOADING_DETAIL: `SET_${prefContent}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefContent}_LOADING_POST`,
  IS_ERROR: `SET_${prefContent}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefContent}`,
  FAILED: `FAILED_${prefContent}`,
  DETAIL: `DETAIL_${prefContent}`,
  EDIT: `EDIT_${prefContent}`,
};
/****************
     USER_LIST
     *****************/
let prefUserList = "USER_LIST";
export const USER_LIST = {
  LOADING: `SET_${prefUserList}_LOADING`,
  LOADING_DETAIL: `SET_${prefUserList}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefUserList}_LOADING_POST`,
  IS_ERROR: `SET_${prefUserList}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefUserList}`,
  FAILED: `FAILED_${prefUserList}`,
  DETAIL: `DETAIL_${prefUserList}`,
  EDIT: `EDIT_${prefUserList}`,
};
/****************
     USER_LEVEL
     *****************/
let prefUserLevel = "USER_LEVEL";
export const USER_LEVEL = {
  LOADING: `SET_${prefUserLevel}_LOADING`,
  LOADING_DETAIL: `SET_${prefUserLevel}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefUserLevel}_LOADING_POST`,
  IS_ERROR: `SET_${prefUserLevel}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefUserLevel}`,
  FAILED: `FAILED_${prefUserLevel}`,
  DETAIL: `DETAIL_${prefUserLevel}`,
  EDIT: `EDIT_${prefUserLevel}`,
};

/****************
 DEPOSIT
 *****************/
let prefDeposit = "DEPOSIT";
export const DEPOSIT = {
  LOADING: `SET_${prefDeposit}_LOADING`,
  LOADING_DETAIL: `SET_${prefDeposit}_LOADING_DETAIL`,
  LOADING_EXCEL: `SET_${prefDeposit}_LOADING_EXCEL`,
  LOADING_POST: `SET_${prefDeposit}_LOADING_POST`,
  IS_ERROR: `SET_${prefDeposit}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefDeposit}`,
  FAILED: `FAILED_${prefDeposit}`,
  DETAIL: `DETAIL_${prefDeposit}`,
  EXCEL: `EXCEL_${prefDeposit}`,
};
/****************
     PENARIKAN
     *****************/
let prefPenarikan = "PENARIKAN";
export const PENARIKAN = {
  LOADING: `SET_${prefPenarikan}_LOADING`,
  LOADING_EXCEL: `SET_${prefPenarikan}_LOADING_EXCEL`,
  LOADING_DETAIL: `SET_${prefPenarikan}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefPenarikan}_LOADING_POST`,
  IS_ERROR: `SET_${prefPenarikan}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefPenarikan}`,
  FAILED: `FAILED_${prefPenarikan}`,
  DETAIL: `DETAIL_${prefPenarikan}`,
  EDIT: `EDIT_${prefPenarikan}`,
  EXCEL: `EXCEL_${prefPenarikan}`,
};
/****************
     REPORT_BARANG
     *****************/
let prefReportBarang = "REPORT_BARANG";
export const REPORT_BARANG = {
  LOADING: `SET_${prefReportBarang}_LOADING`,
  LOADING_DETAIL: `SET_${prefReportBarang}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefReportBarang}_LOADING_POST`,
  IS_ERROR: `SET_${prefReportBarang}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefReportBarang}`,
  FAILED: `FAILED_${prefReportBarang}`,
  DETAIL: `DETAIL_${prefReportBarang}`,
  EDIT: `EDIT_${prefReportBarang}`,
  EXCEL: `EXCEL_${prefReportBarang}`,
  LOADING_EXCEL: `SET_${prefReportBarang}_LOADING_EXCEL`,
  DETAIL_EXCEL: `DETAIL_EXCEL_${prefReportBarang}`,
  LOADING_DETAIL_EXCEL: `SET_${prefReportBarang}_LOADING_DETAIL_EXCEL`,
};

/****************
     SETTING
     *****************/
let generalSetting = "GENERAL_SETTING";
export const GENERAL = {
  LOADING: `SET_${generalSetting}_LOADING`,
  LOADING_DETAIL: `SET_${generalSetting}_LOADING_DETAIL`,
  LOADING_POST: `SET_${generalSetting}_LOADING_POST`,
  IS_ERROR: `SET_${generalSetting}_IS_ERROR`,
  SUCCESS: `SUCCESS_${generalSetting}`,
  FAILED: `FAILED_${generalSetting}`,
  DETAIL: `DETAIL_${generalSetting}`,
  EDIT: `EDIT_${generalSetting}`,
  PLAFON: `PLAFON_${generalSetting}`,
  KARIR: `KARIR_${generalSetting}`,
  LANDING: `LANDING_${generalSetting}`,
};

let bonusSetting = "BONUS_SETTING";
export const BONUS_SETTING = {
  LOADING: `SET_${bonusSetting}_LOADING`,
  IS_ERROR: `SET_${bonusSetting}_IS_ERROR`,
  BONUS: `BONUS_${bonusSetting}`,
  BONUS_RO: `BONUS_RO_${bonusSetting}`,
  FAILED: `FAILED_${bonusSetting}`,
  DETAIL: `DETAIL_${bonusSetting}`,
  EDIT: `EDIT_${bonusSetting}`,
};
/****************
     POIN_KELIPATAN_RO
     *****************/
let poinKelipatanRoSetting = "POIN_KELIPATAN_RO";
export const POIN_KELIPATAN_RO = {
  LOADING: `SET_${poinKelipatanRoSetting}_LOADING`,
  IS_ERROR: `SET_${poinKelipatanRoSetting}_IS_ERROR`,
  SUCCESS: `BONUS_${poinKelipatanRoSetting}_SUCCESS`,
  FAILED: `FAILED_${poinKelipatanRoSetting}`,
  EDIT: `EDIT_${poinKelipatanRoSetting}`,
};
/****************
     KONFIGURASI_STOCKIST
     *****************/
let konfigurasiStockist = "KONFIGURASI_STOCKIST";
export const KONFIGURASI_STOCKIST = {
  LOADING: `SET_${konfigurasiStockist}_LOADING`,
  IS_ERROR: `SET_${konfigurasiStockist}_IS_ERROR`,
  SUCCESS: `BONUS_${konfigurasiStockist}_SUCCESS`,
  FAILED: `FAILED_${konfigurasiStockist}`,
  EDIT: `EDIT_${konfigurasiStockist}`,
};

/****************
 KURIR
 *****************/
let kurir = "KURIR";
export const KURIR = {
  LOADING: `SET_${kurir}_LOADING`,
  IS_ERROR: `SET_${kurir}_IS_ERROR`,
  SUCCESS: `SUCCESS_${kurir}`,
  KECAMATAN: `KECAMATAN_${kurir}`,
  KOTA: `KOTA_${kurir}`,
  PROVINSI: `PROVINSI_${kurir}`,
  FAILED: `FAILED_${kurir}`,
};
/****************
     KURIR
     *****************/
let mbank = "BANKS";
export const BANKS = {
  LOADING: `SET_${mbank}_LOADING`,
  LOADING_STORE: `SET_${mbank}_LOADING_STORE`,
  IS_ERROR: `SET_${mbank}_IS_ERROR`,
  SUCCESS: `SUCCESS_${mbank}`,
  LISTBANK: `LISTBANK_${mbank}`,
  FAILED: `FAILED_${mbank}`,
};
/****************
     CONFIG WALLET
     *****************/
let configWallet = "CONFIG_WALLET";
export const CONFIG_WALLET = {
  LOADING: `SET_${configWallet}_LOADING`,
  SUCCESS: `SUCCESS_${configWallet}`,
  FAILED: `FAILED_${configWallet}`,
};

/****************
     REPORT_TRANSAKSI
     *****************/
let prefReportTransaksiMember = "REPORT_TRANSAKSI_MEMBER";
export const REPORT_TRANSAKSI_MEMBER = {
  LOADING: `SET_${prefReportTransaksiMember}_LOADING`,
  LOADING_DETAIL: `SET_${prefReportTransaksiMember}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefReportTransaksiMember}_LOADING_POST`,
  IS_ERROR: `SET_${prefReportTransaksiMember}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefReportTransaksiMember}`,
  FAILED: `FAILED_${prefReportTransaksiMember}`,
  DETAIL: `DETAIL_${prefReportTransaksiMember}`,
  EDIT: `EDIT_${prefReportTransaksiMember}`,
  EXCEL: `EXCEL_${prefReportTransaksiMember}`,
  LOADING_EXCEL: `SET_${prefReportTransaksiMember}_LOADING_EXCEL`,
};

/****************
     REPORT_PAKET
     *****************/
let prefReportPaket = "REPORT_PAKET";
export const REPORT_PAKET = {
  LOADING: `SET_${prefReportPaket}_LOADING`,
  SUCCESS: `SUCCESS_${prefReportPaket}`,

  LOADING_DETAIL: `SET_${prefReportPaket}_LOADING_DETAIL`,
  DETAIL: `DETAIL_${prefReportPaket}`,

  LOADING_EXCEL: `SET_${prefReportPaket}_LOADING_EXCEL`,
  EXCEL: `EXCEL_${prefReportPaket}`,

  LOADING_POST: `SET_${prefReportPaket}_LOADING_POST`,
};

/****************
     REPORT_TIKET
     *****************/
let prefReportTiket = "REPORT_TIKET";
export const REPORT_TIKET = {
  LOADING: `SET_${prefReportTiket}_LOADING`,
  SUCCESS: `SUCCESS_${prefReportTiket}`,

  LOADING_DETAIL: `SET_${prefReportTiket}_LOADING_DETAIL`,
  DETAIL: `DETAIL_${prefReportTiket}`,

  LOADING_EXCEL: `SET_${prefReportTiket}_LOADING_EXCEL`,
  EXCEL: `EXCEL_${prefReportTiket}`,

  LOADING_POST: `SET_${prefReportTiket}_LOADING_POST`,
};
