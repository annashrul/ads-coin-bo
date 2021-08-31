import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import { DateRangePicker } from "react-bootstrap-daterangepicker";
import Paginationq, {
  rangeDate,
  toCurrency,
  toExcel,
} from "../../../../helper";
import { NOTIF_ALERT } from "../../../../redux/actions/_constants";
import moment from "moment";
import {
  getDataReportTiket,
  getExcelReportTiket,
} from "../../../../redux/actions/laporan/report_tiket.action";

class LaporanTiket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      dateFrom: moment(new Date()).format("yyyy-MM-DD"),
      dateTo: moment(new Date()).format("yyyy-MM-DD"),
      data: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.printDocumentXLsx = this.printDocumentXLsx.bind(this);
  }
  handleValidate() {
    let data = this.state;
    let where = `perpage=10&datefrom=${data.dateFrom}&dateto=${data.dateTo}`;
    if (data.any !== null && data.any !== undefined && data.any !== "") {
      where += `&q=${data.any}`;
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
    this.props.dispatch(getDataReportTiket("page=1&" + where));
  }

  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getDataReportTiket("page=1&" + where));
  }
  handlePage(num) {
    let where = this.handleValidate();
    this.props.dispatch(getDataReportTiket(`page=${num}&${where}`));
  }
  handleEvent = (event, picker) => {
    event.preventDefault();
    const from = moment(picker.startDate._d).format("YYYY-MM-DD");
    const to = moment(picker.endDate._d).format("YYYY-MM-DD");
    this.setState({
      dateFrom: from,
      dateTo: to,
    });
    this.props.dispatch(
      getDataReportTiket(`page=1&datefrom=${from}&dateto=${to}`)
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataExcel.data !== this.props.dataExcel.data) {
      this.getExcel(this.props);
    }
  }
  getExcel(props) {
    if (props.dataExcel.data !== undefined) {
      if (props.dataExcel.data.length > 0) {
        let content = [];
        props.dataExcel.data.forEach((v, i) => {
          content.push([
            v.kd_trx,
            v.title,
            v.qty,
            parseFloat(v.total).toFixed(2),
            v.metode_pembayaran,
            v.fullname,
            v.bank_name,
            v.acc_name,
          ]);
        });
        toExcel(
          "LAPORAN TIKET",
          `${this.state.dateFrom} - ${this.state.dateTo}`,
          [
            "KODE TRANSAKSI",
            "NAMA PAKET",
            "QTY",
            "TOTAL (POIN)",
            "METODE PEMBAYARAN",
            "NAMA PEMESAN",
            "BANK TUJUAN",
            "ATAS NAMA",
          ],
          content
        );
      }
    }
  }
  printDocumentXLsx = (e, param) => {
    e.preventDefault();
    let where = `perpage=${param}&datefrom=${this.state.dateFrom}&dateto=${this.state.dateTo}`;
    if (
      this.state.any !== null &&
      this.state.any !== undefined &&
      this.state.any !== ""
    ) {
      where += `&q=${this.state.any}`;
    }
    this.props.dispatch(getExcelReportTiket(where));
  };

  render() {
    const columnStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
      color: "white",
    };

    const { total, per_page, last_page, current_page, data } = this.props.data;
    return (
      <Layout page={"Laporan Penjualan Tiket"}>
        <div className="row">
          <div className="col-md-10">
            <div className="row">
              <div className="col-6 col-xs-6 col-md-3">
                <div className="form-group">
                  <label>Periode </label>
                  <DateRangePicker
                    autoUpdateInput={true}
                    showDropdowns={false}
                    style={{ display: "unset" }}
                    ranges={rangeDate}
                    alwaysShowCalendars={true}
                    showCustomRangeLabel={false}
                    onApply={this.handleEvent}
                  >
                    <input
                      type="text"
                      readOnly={true}
                      className="form-control"
                      value={`${this.state.dateFrom} to ${this.state.dateTo}`}
                    />
                  </DateRangePicker>
                </div>
              </div>

              <div className="col-6 col-xs-6 col-md-3">
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
          <div
            className="col-12 col-xs-12 col-md-2"
            style={{ textAlign: "right" }}
          >
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <button
                    style={{ marginTop: "28px", marginRight: "5px" }}
                    className="btn btn-primary"
                    onClick={this.handleSearch}
                  >
                    <i className="fa fa-search" />
                  </button>
                  <button
                    style={{ marginTop: "28px" }}
                    className="btn btn-primary"
                    onClick={(e) =>
                      this.printDocumentXLsx(e, per_page * last_page)
                    }
                  >
                    <i className="fa fa-print" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div style={{ overflowX: "auto" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th style={columnStyle}>NO</th>
                <th style={columnStyle}>KODE TRANSAKSI</th>
                <th style={columnStyle}>QTY</th>
                <th style={columnStyle}>TOTAL</th>
                <th style={columnStyle}>METODE PEMBAYARAN</th>
                <th style={columnStyle}>BANK</th>
                <th style={columnStyle}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {typeof data === "object" ? (
                data.length > 0 ? (
                  data.map((v, i) => {
                    let status = "";
                    if (v.status === 0) {
                      status = (
                        <span className={"badge badge-warning"}>Pending</span>
                      );
                    }
                    if (v.status === 1) {
                      status = (
                        <span className={"badge badge-success"}>Sukses</span>
                      );
                    }
                    if (v.status === 2) {
                      status = (
                        <span className={"badge badge-danger"}>Gagal</span>
                      );
                    }
                    return (
                      <tr key={i}>
                        <td style={columnStyle}>
                          {i + 1 + 10 * (parseInt(current_page, 10) - 1)}
                        </td>
                        <td style={columnStyle}>{v.kd_trx}</td>
                        <td style={columnStyle}>{v.qty}</td>
                        <td style={columnStyle} className="poin">
                          {toCurrency(v.total)}
                        </td>
                        <td style={columnStyle}>{v.metode_pembayaran}</td>
                        <td style={columnStyle}>
                          {v.bank_name}
                          <br />
                          {v.acc_name}
                        </td>
                        <td style={columnStyle}>{status}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} style={columnStyle}>
                      <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={9} style={columnStyle}>
                    <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div
          style={{ marginTop: "20px", marginBottom: "20px", float: "right" }}
        >
          <Paginationq
            current_page={current_page}
            per_page={per_page}
            total={total}
            callback={this.handlePage}
          />
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.reportTiketReducer.isLoading,
    isLoadingExcel: state.reportTiketReducer.isLoadingExcel,
    isOpen: state.modalReducer,
    data: state.reportTiketReducer.data,
    dataExcel: state.reportTiketReducer.excel,
  };
};

export default connect(mapStateToProps)(LaporanTiket);
