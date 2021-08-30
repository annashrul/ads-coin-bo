import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import Paginationq, { toCurrency } from "../../../helper";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";
import { ModalToggle, ModalType } from "../../../redux/actions/modal.action";
import { getPin } from "../../../redux/actions/paket/pin.action";
import moment from "moment";
import GeneratePinModal from "../modals/pin/generate_pin_modal";

class IndexPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      type: 0,
      last: "",
      dateFrom: moment(new Date()).format("yyyy-MM-DD"),
      dateTo: moment(new Date()).format("yyyy-MM-DD"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentWillReceiveProps(nextProps) {}
  componentWillMount() {
    this.props.dispatch(getPin(`page=1&perpage=12`));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleValidate() {
    let where = "perpage=12";
    let page = localStorage.getItem("pagePin");
    let any = this.state.any;

    if (page !== null && page !== undefined && page !== "") {
      where += `&page=${page}`;
    }
    if (any !== null && any !== undefined && any !== "") {
      localStorage.setItem("pagePin", 1);
      where = "page=1";
      where += `&q=${any}`;
    }
    return (where += `&type=${this.state.type}`);
  }

  handlePage(pageNumber) {
    localStorage.setItem("pagePin", pageNumber);
    let where = this.handleValidate();
    this.props.dispatch(getPin(where));
  }

  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getPin(where));
  }

  handleAdd(e) {
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("generatePin"));
  }

  render() {
    const { total, per_page, current_page, data, total_pin } = this.props.data;

    return (
      <Layout page={"PIN"}>
        <div className="row" style={{ zoom: "80%" }}>
          <div className="col-md-12">
            <button
              className="btn btn-primary"
              onClick={(e) => this.handleAdd(e)}
            >
              <i className="fa fa-plus"></i> Generate PIN
            </button>
          </div>
          <hr />
          <div className="col-6 col-xs-6 col-md-4 mt-1">
            <div className="social-widget">
              <div
                className="p-3 text-center text-white font-30"
                style={{
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  backgroundColor: "rgba(0,0,255,0.3)",
                }}
              >
                TERSEDIA <br />
                {total_pin !== undefined ? total_pin.tersedia : 0}
              </div>
            </div>
          </div>
          <div className="col-6 col-xs-6 col-md-4 mt-1">
            <div className="social-widget">
              <div
                className="p-3 text-center text-white font-30"
                style={{
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  backgroundColor: "rgba(255,255,0,0.3)",
                }}
              >
                DIPAKAI <br />
                {total_pin !== undefined ? total_pin.dipakai : 0}
              </div>
            </div>
          </div>
          <div className="col-12 col-xs-12 col-md-4 mt-1">
            <div className="social-widget">
              <div
                className="p-3 text-center text-white font-30"
                style={{
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  backgroundColor: "rgba(255,0,0,0.3)",
                }}
              >
                DIMILIKI MEMBER <br />
                {total_pin !== undefined ? total_pin.dimiliki_member : 0}
              </div>
            </div>
          </div>
        </div>
        <br />

        <div className="row" style={{ zoom: "85%" }}>
          {typeof data === "object" ? (
            data.length > 0 ? (
              data.map((v, i) => {
                let status = "";
                let colStatus = "";
                if (v.status === 0) {
                  status = "Tersedia";
                  colStatus = "text-primary";
                }
                if (v.status === 1) {
                  status = "Dimiliki Member";
                  colStatus = "text-danger";
                }
                if (v.status === 2) {
                  status = "Dipakai";
                  colStatus = "text-warning";
                }
                return (
                  <div
                    key={i}
                    className="col-6 col-xs-6 col-sm-4 col-xl-3 box-margin"
                  >
                    <div className="card widget-new-content p-3 mainBgOpacity">
                      <div className="widget---stats d-flex justify-content-between align-items-center mb-15">
                        <div className="widget---content-text">
                          <h6 className="text-white">{v.kode}</h6>
                          <p
                            className={`mb-0 ${colStatus}`}
                            style={{ letterSpacing: "1px" }}
                          >
                            <b>{status.toUpperCase()}</b>
                          </p>
                        </div>
                        <h6 className={`mb-0 txtGreen`}>
                          {toCurrency(v.price)}
                        </h6>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
              </div>
            )
          ) : (
            <div>
              <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
            </div>
          )}
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
        {this.props.isOpen === true ? <GeneratePinModal /> : null}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.pinReducer.isLoading,
    isOpen: state.modalReducer,
    data: state.pinReducer.data,
  };
};

export default connect(mapStateToProps)(IndexPin);
