import React, { Component } from "react";
import { connect } from "react-redux";
import WrapperModal from "../../_wrapper.modal";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ModalToggle } from "../../../../../redux/actions/modal.action";
import { NOTIF_ALERT } from "../../../../../redux/actions/_constants";
import Paginationq, {
  myDate,
  rangeDate,
  toCurrency,
  toExcel,
} from "../../../../../helper";
import { DateRangePicker } from "react-bootstrap-daterangepicker";
import moment from "moment";
import {
  getExcelInvesment,
  getInvesment,
} from "../../../../../redux/actions/masterdata/member.action";
import Preloader from "../../../../../Preloader";

class DetailInvesment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: moment(new Date()).format("yyyy-MM-DD"),
      dateTo: moment(new Date()).format("yyyy-MM-DD"),
    };
    this.toggle = this.toggle.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }
  toggle = (e) => {
    e.preventDefault();

    localStorage.removeItem("isAlamat");
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  };
  handlePage(page) {
    this.props.dispatch(
      getInvesment(
        `page=${page}&id_member=${this.props.detail.id}&datefrom=${this.state.dateFrom}&dateto=${this.state.dateTo}`
      )
    );
  }

  handleEvent = (event, picker) => {
    event.preventDefault();
    const from = moment(picker.startDate._d).format("YYYY-MM-DD");
    const to = moment(picker.endDate._d).format("YYYY-MM-DD");
    this.props.dispatch(
      getInvesment(
        `page=1&id_member=${this.props.detail.id}&datefrom=${from}&dateto=${to}`
      )
    );
    this.setState({
      dateFrom: from,
      dateTo: to,
    });
  };
  componentWillMount() {
    this.props.dispatch(
      getInvesment(
        `page=1&id_member=${this.props.detail.id}&datefrom=${this.state.dateFrom}&dateto=${this.state.dateTo}`
      )
    );
  }
  componentDidMount() {
    this.props.dispatch(
      getInvesment(
        `page=1&id_member=${this.props.detail.id}&datefrom=${this.state.dateFrom}&dateto=${this.state.dateTo}`
      )
    );
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
        props.dataExcel.data.forEach((v, i) => {
          content.push([
            v.kd_trx,
            v.fullname,
            parseFloat(v.trx_in).toFixed(2),
            parseFloat(v.trx_out).toFixed(2),
            v.note,
            myDate(v.created_at),
          ]);
        });
        toExcel(
          `LAPORAN INVESMENT ${this.props.detail.fullname}`,
          `${this.state.dateFrom} - ${this.state.dateTo}`,
          [
            "KODE TRANSAKSI",
            "NAMA",
            "TRX MASUK ( COIN )",
            "TRX KELUAR ( COIN )",
            "CATATAN",
            "TANGGAL",
          ],
          content,
          [
            [""],
            [""],

            [
              "TOTAL",
              "",
              parseFloat(props.dataExcel.summary.trx_in).toFixed(2),
              parseFloat(props.dataExcel.summary.trx_out).toFixed(2),
            ],
            [`SALDO AWAL : ${parseFloat(props.dataExcel.summary.saldo_awal).toFixed(2)}`],
          ]
        );
      }
    }
  }
  printDocumentXLsx = (e, param) => {
    e.preventDefault();
    this.props.dispatch(
      getExcelInvesment(
        `page=1&id_member=${this.props.detail.id}&perpage=${param}&datefrom=${this.state.dateFrom}&dateto=${this.state.dateTo}`
      )
    );
  };

  render() {
    const headStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
    };
    const numberStyle = {
      verticalAlign: "middle",
      textAlign: "right",
      whiteSpace: "nowrap",
    };

    const {
      last_page,
      total,
      per_page,
      current_page,
      data,
      summary,
    } = this.props.data;

    let totTrxIn = 0;
    let totTrxOut = 0;
    return (
      <WrapperModal
        isOpen={this.props.isOpen && this.props.type === "detailInvesment"}
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>
          Detail Invesment {this.props.detail.fullname} <br /> Saldo Awal :
          <span className="poin">
            &nbsp;
            {summary !== undefined
              ? toCurrency(`${summary.saldo_awal}`)
              : 0 + " Coin"}
          </span>
        </ModalHeader>
        {this.props.isLoading || this.props.isLoadingExcel ? (
          <Preloader />
        ) : null}
        <ModalBody>
          <div className="row">
            <div className="col-10 col-xs-10 col-md-10">
              <div className="row">
                <div className="col-12 col-xs-12 col-md-4">
                  <div className="form-group">
                    <label>Periode </label>
                    <DateRangePicker
                      autoUpdateInput={true}
                      showDropdowns={true}
                      style={{ display: "unset" }}
                      ranges={rangeDate}
                      alwaysShowCalendars={true}
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
              </div>
            </div>
            <div
              className="col-2 col-xs-2 col-md-2"
              style={{ textAlign: "right" }}
            >
              <div className="form-group">
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
          <div style={{ overflowX: "auto" }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th style={headStyle} rowSpan={"2"}>
                    #
                  </th>
                  <th style={headStyle} rowSpan={"2"}>
                    KODE TRANSAKSI
                  </th>

                  <th style={headStyle} colSpan="2">
                    TRANSAKSI
                  </th>
                  <th style={headStyle} rowSpan={"2"}>
                    CATATAN
                  </th>
                  <th style={headStyle} rowSpan={"2"}>
                    TANGGAL
                  </th>
                </tr>
                <tr>
                  <th style={headStyle}>MASUK</th>
                  <th style={headStyle}>KELUAR</th>
                </tr>
              </thead>
              <tbody>
                {!this.props.isLoading ? (
                  typeof data === "object" ? (
                    data.length > 0 ? (
                      data.map((v, i) => {
                        totTrxIn = totTrxIn + parseInt(v.trx_in, 10);
                        totTrxOut = totTrxOut + parseInt(v.trx_out, 10);
                        return (
                          <tr key={i}>
                            <td style={headStyle}>
                              {i + 1 + 10 * (parseInt(current_page, 10) - 1)}
                            </td>
                            <td style={headStyle}>{v.kd_trx}</td>
                            <td style={numberStyle} className="poin">
                              {toCurrency(v.trx_in)}
                            </td>
                            <td style={numberStyle} className="poin">
                              {toCurrency(v.trx_out)}
                            </td>
                            <td style={headStyle}>{v.note}</td>
                            <td style={headStyle}>{myDate(v.created_at)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} style={headStyle}>
                          <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan={6} style={headStyle}>
                        <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
                      </td>
                    </tr>
                  )
                ) : (
                  <Preloader />
                )}
              </tbody>
              <tfoot className="">
                <tr>
                  <td colSpan={2}>TOTAL PERHALAMAN</td>
                  <td style={numberStyle} className="poin">
                    {toCurrency(`${totTrxIn}`)}
                  </td>
                  <td style={numberStyle} className="poin">
                    {toCurrency(`${totTrxOut}`)}
                  </td>
                  <td colSpan={2} />
                </tr>
                <tr>
                  <td colSpan={2}>TOTAL KESELURUHAN</td>
                  <td style={numberStyle} className="poin">
                    {summary !== undefined
                      ? toCurrency(`${summary.trx_in}`)
                      : 0}
                  </td>
                  <td style={numberStyle} className="poin">
                    {summary !== undefined
                      ? toCurrency(`${summary.trx_out}`)
                      : 0}
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
          <div style={{ float: "right" }}>
            <Paginationq
              current_page={current_page}
              per_page={per_page}
              total={total}
              callback={this.handlePage}
            />
          </div>
        </ModalFooter>
      </WrapperModal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isOpen: state.modalReducer,
    type: state.modalTypeReducer,

    isLoading: state.memberReducer.isLoadingInvesment,
    data: state.memberReducer.invesment,

    isLoadingExcel: state.memberReducer.isLoadingExcelInvesment,
    dataExcel: state.memberReducer.excelInvesment,
  };
};
export default connect(mapStateToProps)(DetailInvesment);
