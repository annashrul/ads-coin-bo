import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import NotFound from "../common/notfound";
import Login from "../App/Auth/Login/Login";
import Dashboard from "../App/Dashboard/Dashboard";
import Pin from "../App/pin";
import DaftarPaket from "../App/paket/daftar_paket";
import Member from "../App/masterdata/member";
import UserList from "../App/masterdata/indexUserList";
import UserLevel from "../App/masterdata/indexUserLevel";
import Berita from "../App/konten/berita/index";
import Kategori from "../App/kategori/index";
import Deposit from "../App/ewallet/indexDeposit";
import Penarikan from "../App/ewallet/indexPenarikan";
import LaporanTransaksiMember from "../App/laporan/transaksi_member";
import LaporanPaket from "../App/laporan/penjualan/paket";
import LaporanProdukPembelian from "../App/laporan/pembelian";
import Bank from "../App/setting/bank";
import IndexSetting from "../App/setting/umum";
import Promo from "../App/masterdata/promo";

const Routes = (
  <div>
    <Switch>
      <Route path="/login" exact strict component={Login} />

      {/* DASHBOARD SECTION START */}
      <PrivateRoute path="/" exact strict component={Dashboard} />
      {/* DASHBOARD SECTION END */}
      {/* PAKET SECTION START */}
      {/* <PrivateRoute path="/pin" exact strict component={Pin} /> */}
      <PrivateRoute path="/produk" exact strict component={DaftarPaket} />
      <PrivateRoute path="/produk/promo" exact strict component={Promo} />
      <PrivateRoute
        path="/:kategori/kategori"
        exact
        strict
        component={Kategori}
      />
      {/* PAKET SECTION END */}
      {/* MASTERDATA SECTION START */}
      <PrivateRoute path="/pengguna" exact strict component={UserList} />
      <PrivateRoute path="/pengguna/akses" exact strict component={UserLevel} />
      {/* MASTERDATA SECTION END */}
      {/* MANAGEMENT CONTENT SECTION START */}
      <PrivateRoute path="/member" exact strict component={Member} />
      {/* <PrivateRoute path="/berita" exact strict component={Berita} /> */}
      {/* MANAGEMENT CONTENT SECTION END */}
      {/* LAPORAN SECTION START */}
      <PrivateRoute
        path="/laporan/member"
        exact
        strict
        component={LaporanTransaksiMember}
      />
      <PrivateRoute
        path="/laporan/penjualan_produk"
        exact
        strict
        component={LaporanPaket}
      />
      <PrivateRoute
        path="/laporan/pembelian_produk"
        exact
        strict
        component={LaporanProdukPembelian}
      />
      {/* E-WALLET SECTION START */}
      <PrivateRoute path="/ewallet/deposit" exact strict component={Deposit} />
      <PrivateRoute
        path="/ewallet/penarikan"
        exact
        strict
        component={Penarikan}
      />
      {/* E-WALLET SECTION END */}
      {/* LAPORAN SECTION END */}
      <PrivateRoute path="/pengaturan/bank" exact strict component={Bank} />
      <PrivateRoute
        path="/pengaturan/umum"
        exact
        strict
        component={IndexSetting}
      />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
