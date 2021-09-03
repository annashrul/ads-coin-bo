import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import { DateRangePicker } from "react-bootstrap-daterangepicker";
import Paginationq, { rangeDate, toExcel, myDate, toRp } from "../../../helper";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";
import moment from "moment";
import * as Swal from "sweetalert2";
import { getExcelPenarikan, getPenarikan, postPenarikan } from "../../../redux/actions/ewallet/penarikan.action";
import Select from "react-select";
import { getConfigWallet } from "../../../redux/actions/ewallet/config_wallet.action";

class IndexPenarikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      dateFrom: moment(new Date()).format("yyyy-MM-DD"),
      dateTo: moment(new Date()).format("yyyy-MM-DD"),
      kolom_data: [
        { value: "kd_trx", label: "kode transaksi" },
        { value: "full_name", label: "nama" },
        { value: "status", label: "status" },
      ],
      kolom: "",
      status_data: [
        { value: "", label: "semua status" },
        { value: "0", label: "pending" },
        { value: "1", label: "sukses" },
        { value: "2", label: "gagal" },
      ],
      status: "",
      data: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleChangeKolom = this.handleChangeKolom.bind(this);
    this.handleApproval = this.handleApproval.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }
  handleValidate() {
    let where = "";
    let data = this.state;
    if (data.dateFrom !== null && data.dateFrom !== undefined && data.dateFrom !== "") {
      where += `&datefrom=${data.dateFrom}&dateto=${data.dateTo}`;
    }
    if (data.kolom !== null && data.kolom !== undefined && data.kolom !== "") {
      where += `&searchby=${data.kolom}`;
    }
    if (data.any !== null && data.any !== undefined && data.any !== "") {
      where += `&q=${btoa(data.any)}`;
    }
    return where;
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  componentWillMount() {
    let where = this.handleValidate();
    this.props.dispatch(getPenarikan(`page=1&${where}`));
    this.props.dispatch(getConfigWallet());
  }

  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getPenarikan(`page=1&${where}`));
  }
  handlePage(num) {
    let where = this.handleValidate();
    this.props.dispatch(getPenarikan(`page=${num}&${where}`));
  }
  handleChangeStatus(val) {
    this.setState({
      status: val.value,
    });
    let where = this.handleValidate();
    if (val.value !== "") {
      this.props.dispatch(getPenarikan(`page=1&status=${val.value}${where}`));
    } else {
      this.props.dispatch(getPenarikan(`page=1${where}`));
    }
  }
  handleChangeKolom(val) {
    this.setState({
      kolom: val.value,
    });
  }
  handleEvent = (event, picker) => {
    event.preventDefault();
    const from = moment(picker.startDate._d).format("YYYY-MM-DD");
    const to = moment(picker.endDate._d).format("YYYY-MM-DD");
    this.setState({
      dateFrom: from,
      dateTo: to,
    });
    this.props.dispatch(getPenarikan(`page=1&datefrom=${from}&dateto=${to}`));
  };

  handleApproval(e, id, status) {
    e.preventDefault();
    Swal.fire({
      title: "Perhatian !!!",
      text: `anda yakin akan ${status === 1 ? "menerima" : "membatalkan"} penarikan ini ??`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Oke, ${status === 1 ? "terima" : "batalkan"} sekarang!`,
      cancelButtonText: "keluar",
    }).then((result) => {
      if (result.value) {
        let parsedata = { status: status };
        // let where = this.handleValidate();
        this.props.dispatch(postPenarikan(parsedata, btoa(id)));
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataExcel.data !== this.props.dataExcel.data) {
      this.getExcel(this.props);
    }
  }
  getExcel(props) {
    if (props.dataExcel.data !== undefined) {
      if (props.dataExcel.data.length > 0) {
        let content = [];
        let total = 0;
        props.dataExcel.data.forEach((v, i) => {
          let konv = parseInt(this.props.configWallet.konversi_poin, 10);
          total = total + parseFloat(v.amount) * konv;

          let status = "";
          if (v.status === 0) {
            status = "Pending";
          }
          if (v.status === 1) {
            status = "Sukses";
          }
          if (v.status === 2) {
            status = "Gagal";
          }
          content.push([v.kd_trx, v.fullname, v.bank_name, v.acc_name, v.acc_no, parseFloat(v.amount) * konv, parseFloat(v.charge) * konv, status, myDate(v.created_at)]);
        });
        toExcel(
          "LAPORAN PENARIKAN",
          `${this.state.dateFrom} - ${this.state.dateTo}`,
          ["KODE TRANSAKSI", "NAMA", "BANK", "ATAS NAMA", "NO REKENING", "JUMLAH", "BIAYA ADMIN", "STATUS", "TANGGAL"],
          content,
          [[""], [""], ["TOTAL", "", "", "", "", total]]
        );
      }
    }
  }
  printDocumentXLsx = (e, param) => {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getExcelPenarikan(`page=1&perpage=${param}&${where}`));
  };
  render() {
    const columnStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
    };
    const numStyle = {
      verticalAlign: "middle",
      textAlign: "right",
      whiteSpace: "nowrap",
    };
    const strStyle = {
      verticalAlign: "middle",
      textAlign: "left",
      whiteSpace: "nowrap",
    };
    // const data = this.state.data;
    let totAmountPoint = 0;
    let totAmountRp = 0;
    const { data } = this.props.res;
    const { total, per_page, last_page, current_page } = this.props.res.meta;
    return (
      <Layout page={"Laporan Penarikan"}>
        <div className="row">
          <div className="col-12 col-xs-12 col-md-10">
            <div className="row">
              <div className="col-6 col-xs-6 col-md-3">
                <div className="form-group">
                  <label>Periode </label>
                  <DateRangePicker autoUpdateInput={true} showDropdowns={true} style={{ display: "unset" }} ranges={rangeDate} alwaysShowCalendars={true} onApply={this.handleEvent}>
                    <input type="text" readOnly={true} className="form-control" value={`${this.state.dateFrom} to ${this.state.dateTo}`} />
                  </DateRangePicker>
                </div>
              </div>
              <div className="col-6 col-xs-6 col-md-3">
                <div className="form-group">
                  <label>Kolom</label>
                  <Select
                    options={this.state.kolom_data}
                    placeholder="Pilih Kolom"
                    onChange={this.handleChangeKolom}
                    value={this.state.kolom_data.find((op) => {
                      return op.value === this.state.kolom;
                    })}
                  />
                </div>
              </div>
              <div
                className="col-12 col-xs-12 col-md-3"
                style={{
                  display: this.state.kolom === "status" ? "block" : "none",
                }}
              >
                <div className="form-group">
                  <label>Status</label>
                  <Select
                    options={this.state.status_data}
                    placeholder="Pilih Kolom"
                    onChange={this.handleChangeStatus}
                    value={this.state.status_data.find((op) => {
                      return op.value === this.state.status;
                    })}
                  />
                </div>
              </div>
              <div
                className="col-12 col-xs-12 col-md-3"
                style={{
                  display: this.state.kolom !== "status" ? "block" : "none",
                }}
              >
                <div className="form-group">
                  <label>Cari</label>
                  <input
                    type="text"
                    className="form-control"
                    name="any"
                    placeholder={"cari disini"}
                    value={this.state.any}
                    onChange={this.handleChange}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        this.handleSearch(event);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-xs-12 col-md-2" style={{ textAlign: "right" }}>
            <div className="form-group">
              <button style={{ marginTop: "28px", marginRight: "5px" }} className="btn btn-primary" onClick={(e) => this.handleSearch(e)}>
                <i className="fa fa-search" />
              </button>
              <button style={{ marginTop: "28px" }} className="btn btn-primary" onClick={(e) => this.printDocumentXLsx(e, per_page * last_page)}>
                <i className="fa fa-print" />
              </button>
            </div>
          </div>
        </div>
        <br />
        <div style={{ overflowX: "auto" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th rowSpan="2" style={columnStyle}>
                  NO
                </th>
                <th rowSpan="2" style={columnStyle}>
                  #
                </th>
                <th rowSpan="2" style={columnStyle}>
                  KODE TRANSAKSI
                </th>
                <th rowSpan="2" style={columnStyle}>
                  NAMA
                </th>
                <th rowSpan="2" style={columnStyle}>
                  BANK
                </th>
                <th rowSpan="2" style={columnStyle}>
                  JUMLAH
                </th>

                <th rowSpan="2" style={columnStyle}>
                  BIAYA ADMIN
                </th>
                <th rowSpan="2" style={columnStyle}>
                  STATUS
                </th>
                <th rowSpan="2" style={columnStyle}>
                  TANGGAL DIBUAT
                </th>
              </tr>
            </thead>

            <tbody>
              {typeof data === "object" ? (
                data.length > 0 ? (
                  data.map((v, i) => {
                    totAmountPoint = totAmountPoint + parseFloat(v.amount);
                    let nomRp = 0;
                    let konv = 0;
                    if (this.props.configWallet !== undefined) {
                      konv = parseInt(this.props.configWallet.konversi_poin);
                      nomRp = parseFloat(v.amount) * konv;
                      totAmountRp = totAmountRp + parseFloat(v.amount) * konv;
                    }
                    let badge = "";
                    let txt = "";
                    if (v.status === 0) {
                      badge = "badge-warning";
                      txt = "Pending";
                    }
                    if (v.status === 1) {
                      badge = "badge-success";
                      txt = "Success";
                    }
                    if (v.status === 2) {
                      badge = "badge-danger";
                      txt = "Cancel";
                    }
                    return (
                      <tr key={i}>
                        <td style={columnStyle}>
                          <span className="circle">{i + 1 + 10 * (parseInt(current_page, 10) - 1)}</span>
                        </td>
                        <td style={columnStyle}>
                          <button style={{ marginRight: "5px" }} className={"btn btn-primary"} disabled={v.status === 1 || v.status === 2} onClick={(e) => this.handleApproval(e, v.id, 1)}>
                            <i className={"fa fa-check"} />
                          </button>
                          <button style={{ marginRight: "5px" }} className={"btn btn-primary"} disabled={v.status === 1 || v.status === 2} onClick={(e) => this.handleApproval(e, v.id, 2)}>
                            <i className={"fa fa-close"} />
                          </button>
                        </td>
                        <td style={columnStyle}>{v.kd_trx}</td>
                        <td style={columnStyle}>{v.fullname}</td>
                        <td style={strStyle}>
                          {v.acc_name}
                          <br />
                          {v.bank_name} ({v.acc_no})
                        </td>
                        <td style={numStyle} className="txtGreen">
                          Rp {toRp(parseFloat(nomRp).toFixed(2))} .-
                        </td>
                        <td style={numStyle} className="txtGreen">
                          Rp {toRp(parseFloat(v.charge).toFixed(2) * konv)} .-
                        </td>
                        <td style={columnStyle}>
                          <span className={`span ${badge}`}>{txt}</span>
                        </td>
                        <td style={columnStyle}>{myDate(v.created_at)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={12} style={columnStyle}>
                      <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={11} style={columnStyle}>
                    <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="">
              <tr>
                <th colSpan={5}>TOTAL PERHALAMAN</th>
                <th colSpan={1} style={numStyle} className="txtGreen">
                  Rp {toRp(parseFloat(`${totAmountRp}`).toFixed(2))} .-
                </th>
                <th colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
        <div style={{ marginTop: "20px", marginBottom: "20px", float: "right" }}>
          <Paginationq current_page={current_page} per_page={per_page} total={total} callback={this.handlePage} />
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.penarikanReducer.isLoading,
    isOpen: state.modalReducer,
    data: state.penarikanReducer.data,
    res: state.penarikanReducer,
    isLoadingExcel: state.penarikanReducer.isLoadingExcel,
    dataExcel: state.penarikanReducer.excel,
    configWallet: state.configWalletReducer.data,
  };
};

export default connect(mapStateToProps)(IndexPenarikan);
