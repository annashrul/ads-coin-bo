import React, { Component } from "react";
import WrapperModal from "../_wrapper.modal";
import connect from "react-redux/es/connect/connect";
import { ModalBody, ModalHeader } from "reactstrap";
import { ModalToggle } from "../../../../redux/actions/modal.action";
import { getDetailReportTransaksi } from "../../../../redux/actions/laporan/report_transaksi_member.action";
import moment from "moment";
import { NOTIF_ALERT } from "../../../../redux/actions/_constants";
import Paginationq, { toCurrency } from "../../../../helper";
import Preloader from "../../../../Preloader";

class DetailReportTransaksiMember extends Component {
  //MENU ACCESS MASTERDATA = 0-9
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }

  toggle = (e) => {
    e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  };
  componentWillMount() {
    this.props.dispatch(
      getDetailReportTransaksi(
        `page=1&id_member=${this.props.detail.id}&perpage=10&${this.props.detail.tgl}`
      )
    );
  }
  handlePage(num) {
    this.props.dispatch(
      getDetailReportTransaksi(
        `page=${num}&id_member=${this.props.detail.id}&perpage=10&${this.props.detail.tgl}`
      )
    );
  }

  render() {
    const { total, per_page, current_page, data, summary } = this.props.data;
    return (
      <WrapperModal
        isOpen={
          this.props.isOpen && this.props.type === "detailReportTransaksiMember"
        }
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>
          Laporan Transaksi {this.props.detail.nama}
        </ModalHeader>
        {this.props.isLoading ? <Preloader /> : null}
        <ModalBody>
          <div className="row">
            {typeof data === "object" ? (
              data.length > 0 ? (
                data.map((v, i) => {
                  return (
                    <div className="col-md-12 col-sm-12 col-lg-12" key={i}>
                      <div
                        className="rounded mb-2 "
                        style={{ borderLeft: "8px solid #333" }}
                      >
                        <div className="p-3">
                          <div className="media">
                            <div
                              className="media-body text-center mr-2"
                              style={{ maxWidth: "100px", minWidth: "100px" }}
                            >
                              <h5 className="mb-1 text-muted text-white">
                                {moment(v.created_at).format("HH:MM")}
                              </h5>
                              <p className="mb-0 text-muted text-white">
                                {moment(v.created_at).format("YYYY-DD-MM")}
                              </p>
                            </div>
                            <div
                              className="media-body text-left"
                              style={{ marginLeft: "20px" }}
                            >
                              <p className="mb-2 text-mute text-white">
                                {v.note}
                              </p>
                              <h6 className="mb-1 text-white">{v.kd_trx}</h6>
                            </div>
                            <div
                              className="media-body text-left ml-1"
                              style={{ maxWidth: "200px", minWidth: "200px" }}
                            >
                              <h6 className="mb-1 text-success">
                                + {toCurrency(v.trx_in)}
                              </h6>
                              <p className="mb-1 text-danger">
                                - {toCurrency(v.trx_out)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={"col-md-12 text-center"}>
                  <img
                    src={NOTIF_ALERT.NO_DATA}
                    style={{ verticalAlign: "middle" }}
                    alt=""
                  />
                </div>
              )
            ) : (
              <div className={"col-md-12 text-center"}>
                <img
                  src={NOTIF_ALERT.NO_DATA}
                  style={{ verticalAlign: "middle" }}
                  alt=""
                />
              </div>
            )}
          </div>

          <div className="row">
            <div className="col-md-12">
              {
                <div
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    float: "left",
                  }}
                >
                  <h5>Ringkasan</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <tr>
                        <th>Saldo Awal</th>
                        <td>:</td>
                        <td className={"poin"}>
                          {summary === undefined
                            ? 0
                            : toCurrency(`${summary.saldo_awal}`)}
                        </td>
                      </tr>
                      <tr>
                        <th>Saldo Masuk</th>
                        <td>:</td>
                        <td className={"poin"}>
                          {summary === undefined
                            ? 0
                            : toCurrency(`${summary.trx_in}`)}
                        </td>
                      </tr>
                      <tr>
                        <th>Saldo Keluar</th>
                        <td>:</td>
                        <td className={"poin"}>
                          {summary === undefined
                            ? 0
                            : toCurrency(`${summary.trx_out}`)}
                        </td>
                      </tr>
                      <tr>
                        <th>Saldo saat ini</th>
                        <td>:</td>
                        <td className={"poin"}>
                          {summary === undefined
                            ? 0
                            : toCurrency(
                                `${
                                  parseInt(summary.saldo_awal, 10) +
                                  parseInt(summary.trx_in, 10) -
                                  parseInt(summary.trx_out, 10)
                                }`
                              )}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              }

              <div
                style={{
                  padding: "20px",
                  marginTop: "20px",
                  marginBottom: "20px",
                  float: "right",
                }}
              >
                <Paginationq
                  current_page={current_page}
                  per_page={per_page}
                  total={total}
                  callback={this.handlePage}
                />
              </div>
            </div>
          </div>
        </ModalBody>
      </WrapperModal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.modalReducer,
    type: state.modalTypeReducer,
    data: state.reportTransaksiMemberReducer.detail,
    isLoading: state.reportTransaksiMemberReducer.isLoadingDetail,
  };
};

export default connect(mapStateToProps)(DetailReportTransaksiMember);
