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
  getDataReportPaket,
  getExcelReportPaket,
} from "../../../../redux/actions/laporan/report_paket.action";
import { Button, Icon } from "rsuite";
import Default from "assets/default.png";

class LaporanPaket extends Component {
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
    this.props.dispatch(getDataReportPaket("page=1&" + where));
  }

  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getDataReportPaket("page=1&" + where));
  }
  handlePage(num) {
    let where = this.handleValidate();
    this.props.dispatch(getDataReportPaket(`page=${num}&${where}`));
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
      getDataReportPaket(`page=1&datefrom=${from}&dateto=${to}`)
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataExcel !== this.props.dataExcel) {
      this.getExcel(this.props);
    }
  }
  getExcel(props) {
    if (props.dataExcel !== undefined) {
      if (props.dataExcel.length > 0) {
        let content = [];
        let status = "";

        props.dataExcel.forEach((v, i) => {
          if (v.status === 0) status = "Pending";
          if (v.status === 1) status = "Sukses";
          if (v.status === 2) status = "Gagal";
          content.push([
            `#${v.kd_trx}`,
            v.fullname,
            v.title+` (Kontributor : ${v.seller})`,
            v.payment_channel,
            toCurrency(v.grand_total),
            status,
          ]);
        });
        toExcel(
          "LAPORAN PENJUALAN PRODUK",
          `${this.state.dateFrom} - ${this.state.dateTo}`,
          [
            "KODE TRANSAKSI",
            "Pembeli",
            "Produk",
            "Pembayaran",
            "GRAND TOTAL",
            "STATUS",
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
    this.props.dispatch(getExcelReportPaket(where));
  };

  render() {
    const columnStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      color: "#888888",
    };

    const cusStyle = {
      verticalAlign: "middle",
      textAlign: "left",
      whiteSpace: "nowrap",
    };

    const { data } = this.props.res;
    const { total, per_page, last_page, current_page } = this.props.res.meta;
    return (
      <Layout page={"Laporan Penjualan Produk"}>
        <div className="row">
          <div className="col-12 col-xs-12 col-md-10">
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
          <div
            className="col-12 col-xs-12 col-md-2 d-flex align-items-end justify-content-end"
            style={{ textAlign: "right" }}
          >
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <Button 
                    size="lg"
                    color="cyan"
                    appearance="subtle"
                    className="" onClick={(e) => this.printDocumentXLsx(e, per_page * last_page)}>
                    <Icon icon="print" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div style={{ overflowX: "auto" }}>
          <table className="table table-hover table-noborder"><thead>
              <tr>
                <th rowSpan="2" style={columnStyle}>
                  #
                </th>
                <th rowSpan="2" style={columnStyle}>
                  Pembeli
                </th>
                <th rowSpan="2" style={columnStyle}>
                  Produk
                </th>
                <th rowSpan="2" style={columnStyle}>
                  Pembayaran
                </th>
                <th rowSpan="2" style={columnStyle}>
                  GRAND
                  TOTAL
                </th>
                <th rowSpan="2" style={columnStyle}>
                  STATUS
                </th>
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
                        <td style={{...cusStyle, width:'1%'}}>
                          <strong className="text-dark">#{v.kd_trx}</strong>
                        </td>
                        <td style={cusStyle} className="poin">
                          <small className="text-dark">
                            {v.fullname}
                          </small>
                        </td>
                        
                        <td style={cusStyle}>
                          <div
                            class="row"
                            style={{
                              verticalAlign: "middle",
                              paddingTop: "13px",
                              width:'max-content'
                            }}
                          >
                            <div class="mx-2">
                              <img
                                src={v.image_product}
                                className=""
                                onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} 
                                alt=""
                                style={{ height: "50px", width: "50px" }}
                              />
                            </div>
                            <p className="text-left text-dark">
                              {v.title}
                              <br />
                              <small className="txtGreen">
                                Kontributor : <b>{v.seller}</b>
                              </small>
                            </p>
                          </div>
                        </td>
                        <td style={columnStyle}>
                          <small className="text-dark">
                            {v.payment_channel}
                          </small>
                        </td>
                        <td style={columnStyle} className="poin">
                          <strong className="text-dark">
                            {toCurrency(v.grand_total)}
                          </strong>
                        </td>

                        <td style={{...cusStyle, width:'1%'}}>{status}</td>
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
    isLoading: state.reportPaketReducer.isLoading,
    isLoadingExcel: state.reportPaketReducer.isLoadingExcel,
    isOpen: state.modalReducer,
    data: state.reportPaketReducer.data,
    res: state.reportPaketReducer,
    dataExcel: state.reportPaketReducer.excel,
  };
};

export default connect(mapStateToProps)(LaporanPaket);
