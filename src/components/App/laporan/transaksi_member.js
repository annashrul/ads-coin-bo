import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import { DateRangePicker } from "react-bootstrap-daterangepicker";
import Paginationq, { rangeDate, toCurrency, toExcel } from "../../../helper";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";
import moment from "moment";
import { ModalToggle, ModalType } from "../../../redux/actions/modal.action";
import {
  getDataReportTransaksi,
  getExcelReportTransaksi,
} from "../../../redux/actions/laporan/report_transaksi_member.action";
import DetailReportTransaksiMember from "../modals/laporan/detail_report_transaksi_member";
import { Button, Icon } from "rsuite";

class LaporanTransaksiMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      dateFrom: moment(new Date()).format("yyyy-MM-DD"),
      dateTo: moment(new Date()).format("yyyy-MM-DD"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.printDocumentXLsx = this.printDocumentXLsx.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
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
    this.props.dispatch(getDataReportTransaksi("page=1&" + where));
  }

  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getDataReportTransaksi("page=1&" + where));
  }
  handlePage(num) {
    let where = this.handleValidate();
    this.props.dispatch(getDataReportTransaksi(`page=${num}&${where}`));
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
      getDataReportTransaksi(`page=1&datefrom=${from}&dateto=${to}`)
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
            v.fullname,
            parseFloat(v.saldo_awal).toFixed(2),
            parseFloat(v.trx_in).toFixed(2),
            parseFloat(v.trx_out).toFixed(2),
            parseFloat(v.saldo_akhir).toFixed(2),
          ]);
        });
        toExcel(
          "LAPORAN TRASANSAKSI MEMBER",
          `${this.state.dateFrom} - ${this.state.dateTo}`,
          ["NAMA", "SALDO AWAL", "SALDO MASUK", "SALDO KELUAR", "SALDO AKHIR"],
          content,
          [
            [""],
            [""],
            [
              "TOTAL",
              props.dataExcel.summary === undefined
                ? 0
                : parseFloat(props.dataExcel.summary.saldo_awal).toFixed(2),
              props.dataExcel.summary === undefined
                ? 0
                : parseFloat(props.dataExcel.summary.trx_in).toFixed(2),
              props.dataExcel.summary === undefined
                ? 0
                : parseFloat(props.dataExcel.summary.trx_out).toFixed(2),
              props.dataExcel.summary === undefined
                ? 0
                : parseFloat(props.dataExcel.summary.saldo_akhir).toFixed(2),
            ],
          ]
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

    this.props.dispatch(getExcelReportTransaksi(where));
  };
  handleDetail(e, id, nama) {
    e.preventDefault();
    this.setState({
      detail: {
        id: id,
        nama: nama,
        tgl: `datefrom=${this.state.dateFrom}&dateto=${this.state.dateTo}`,
      },
    });
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("detailReportTransaksiMember"));
  }

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
    let totPlafon = 0;
    let totSaldoAwal = 0;
    let totSaldoAkhir = 0;
    let totTrxIn = 0;
    let totTrxOut = 0;
    const {
      total,
      per_page,
      last_page,
      current_page
    } = this.props.res.meta;
    const {
      data
    } = this.props.res;
    const summary = this.props.res.total;
    return (
      <Layout page={"Laporan Transaksi"}>
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
                      className="form-control form-control-lg"
                      value={`${this.state.dateFrom} to ${this.state.dateTo}`}
                      onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        this.handleSearch(event);
                      }
                    }}
                    />
                  </DateRangePicker>
                </div>
              </div>

              <div className="col-6 col-xs-6 col-md-3">
                <div className="form-group">
                  <label>Cari</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
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

        </div>
        <br />
        <div style={{ overflowX: "auto" }}>
          <table className="table table-hover  table-noborder">
            <thead>
              <tr>
                <th rowSpan="2" style={{...columnStyle, width:'1%'}}>
                  NO
                </th>
                <th rowSpan="2" style={{...columnStyle, width:'1%'}}>
                  #
                </th>
                <th rowSpan="2" style={columnStyle}>
                  NAMA
                </th>
                <th colSpan="4" style={{...columnStyle}}>
                  SALDO
                </th>
              </tr>
              <tr>
                <th style={{...columnStyle}}>AWAL</th>
                <th style={{...columnStyle}}>MASUK</th>
                <th style={{...columnStyle}}>KELUAR</th>
                <th style={{...columnStyle}}>AKHIR</th>
              </tr>
            </thead>
            <tbody>
              {typeof data === "object" ? (
                data.length > 0 ? (
                  data.map((v, i) => {
                    totPlafon = totPlafon + parseFloat(v.plafon);
                    totSaldoAwal = totSaldoAwal + parseFloat(v.saldo_awal);
                    totSaldoAkhir = totSaldoAkhir + parseFloat(v.saldo_akhir);
                    totTrxIn = totTrxIn + parseFloat(v.trx_in);
                    totTrxOut = totTrxOut + parseFloat(v.trx_out);
                    return (
                      <tr key={i}>
                        <td style={columnStyle}>
                          {i + 1 + 10 * (parseInt(current_page, 10) - 1)}
                        </td>
                        <td style={columnStyle}>
                          <Button
                            size="sm"
                            color="cyan"
                            appearance="subtle"
                            className="" onClick={(e) => this.handleDetail(e, v.id, v.fullname)}>
                            <Icon icon="eye" />
                          </Button>
                        </td>

                        <td>{v.fullname}</td>
                        <td className={"coin"} style={columnStyle}>
                          {toCurrency(`${parseFloat(v.saldo_awal).toFixed(2)}`)}
                        </td>
                        <td className={"coin"} style={columnStyle}>
                          {toCurrency(`${parseFloat(v.trx_in).toFixed(2)}`)}
                        </td>
                        <td className={"coin"} style={columnStyle}>
                          {toCurrency(`${parseFloat(v.trx_out).toFixed(2)}`)}
                        </td>
                        <td className={"coin"} style={columnStyle}>
                          {toCurrency(`${parseFloat(v.saldo_akhir).toFixed(2)}`)}
                        </td>
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
            <tfoot className="">
              <tr>
                <th colSpan={3}>TOTAL PERHALAMAN</th>
                <th className={"coin"} style={columnStyle}>
                  {toCurrency(`${totSaldoAwal.toFixed(2)}`)}
                </th>
                <th className={"coin"} style={columnStyle}>
                  {toCurrency(`${totTrxIn.toFixed(2)}`)}
                </th>
                <th className={"coin"} style={columnStyle}>
                  {toCurrency(`${totTrxOut.toFixed(2)}`)}
                </th>
                <th className={"coin"} style={columnStyle}>
                  {toCurrency(`${totSaldoAkhir.toFixed(2)}`)}
                </th>
              </tr>

              <tr>
                <th colSpan={3}>TOTAL KESELURUHAN</th>
                <th className={"coin"} style={columnStyle}>
                  {summary === undefined
                    ? "0 Coin"
                    : parseInt(summary.saldo_awal, 10) === 0
                    ? "0 Coin"
                    : toCurrency(`${parseFloat(summary.saldo_awal).toFixed(2)}`)}
                </th>
                <th className={"coin"} style={columnStyle}>
                  {summary === undefined
                    ? "0 Coin"
                    : parseInt(summary.trx_in, 10) === 0
                    ? "0 Coin"
                    : toCurrency(`${parseFloat(summary.trx_in).toFixed(2)}`)}
                </th>
                <th className={"coin"} style={columnStyle}>
                  {summary === undefined
                    ? "0 Coin"
                    : parseInt(summary.trx_out, 10) === 0
                    ? "0 Coin"
                    : toCurrency(`${parseFloat(summary.trx_out).toFixed(2)}`)}
                </th>
                <th className={"coin"} style={columnStyle}>
                  {summary === undefined
                    ? "0 Coin"
                    : parseInt(summary.saldo_akhir, 10) === 0
                    ? "0 Coin"
                    : toCurrency(`${parseFloat(summary.saldo_akhir).toFixed(2)}`)}
                </th>
              </tr>
            </tfoot>
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
        {this.props.isOpen === true ? (
          <DetailReportTransaksiMember detail={this.state.detail} />
        ) : null}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.reportTransaksiMemberReducer.isLoading,
    isLoadingExcel: state.reportTransaksiMemberReducer.isLoadingExcel,
    isOpen: state.modalReducer,
    data: state.reportTransaksiMemberReducer.data,
    res: state.reportTransaksiMemberReducer,
    dataExcel: state.reportTransaksiMemberReducer.excel,
    kategori: state.kategoriReducer.data,
  };
};

export default connect(mapStateToProps)(LaporanTransaksiMember);
