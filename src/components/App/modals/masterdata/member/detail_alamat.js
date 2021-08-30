import React, { Component } from "react";
import { connect } from "react-redux";
import WrapperModal from "../../_wrapper.modal";
import { ModalHeader, ModalBody } from "reactstrap";
import { ModalToggle } from "../../../../../redux/actions/modal.action";
import { NOTIF_ALERT } from "../../../../../redux/actions/_constants";

class DetailAlamat extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }
  toggle = (e) => {
    e.preventDefault();
    localStorage.removeItem("isAlamat");
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  };

  componentWillReceiveProps(nextProps) {
    console.log("props alamat", nextProps);
  }

  render() {
    return (
      <WrapperModal
        isOpen={this.props.isOpen && this.props.type === "detailAlamat"}
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>Alamat Anda</ModalHeader>
        <ModalBody>
          <div className="row">
            {this.props.detail !== undefined ? (
              this.props.detail.length > 0 ? (
                this.props.detail.map((v, i) => {
                  return (
                    <div
                      className="card col-md-6"
                      key={i}
                      style={{ padding: "10px" }}
                    >
                      <div className="single-contact-area d-flex">
                        <div>
                          <h4 className="mb-1 font-18">{v.penerima}</h4>
                          <p className="mb-10 text-dark font-weight-bold font-12 text-primary">
                            <span className={"badge badge-success"}>
                              {v.title}
                            </span>
                          </p>
                          <div className="contact-address mt-15">
                            <p className="mb-2 font-weight-bold font-11">
                              {v.main_address}
                            </p>
                            <p className="mb-0 font-weight-bold font-11">
                              {v.no_hp}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                "No data"
              )
            ) : (
              <div className="col-md-12">
                <center>
                  <img src={NOTIF_ALERT.NO_DATA} alt="" />
                </center>
              </div>
            )}
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
  };
};
export default connect(mapStateToProps)(DetailAlamat);
