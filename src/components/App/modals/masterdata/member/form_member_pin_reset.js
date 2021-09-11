import React, { Component } from "react";
import WrapperModal from "../../_wrapper.modal";
import connect from "react-redux/es/connect/connect";

import {
  ToastQ,
} from "../../../../../helper";
import { Modal } from "rsuite";
import { ModalToggle } from "../../../../../redux/actions/modal.action";
import Swal from "sweetalert2";
import { putMember } from "../../../../../redux/actions/masterdata/member.action";


class FormMemberPinReset extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showPin = this.showPin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      pin: "",
      pin_re: "",
      sh_pin: false,
      sh_pin_re: false,
      error: {
        pin: "",
        pin_re: "",
      },
    };
  }
  clearState() {
    this.setState({
      pin: "",
      pin_re: "",
      sh_pin: false,
      sh_pin_re: false,
      error: {
        pin: "",
        pin_re: "",
      },
    });
  }

  toggle = (e) => {
    // e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.clearState();
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    let err = Object.assign({}, this.state.error, { [event.target.name]: "" });
    this.setState({ error: err });
  };
  showPin(e,param) {
    e.preventDefault()
    this.setState({ [param]: !this.state[param] })
}
  handleSubmit(e) {
    e.preventDefault();
    let parseData = {};
    let id = this.props.detail.id;
    parseData["pin"] = this.state.pin;
    parseData["pin_re"] = this.state.pin_re;
    
    if (parseData.pin === "") {
      delete parseData.pin;
      return ToastQ.fire({
        icon: "warning",
        title: `<span class="text-white">PIN tidak boleh kosong!</span>`,
      });
    } else if (String(parseData.pin).length > 1 && String(parseData.pin).length < 6) {
      return ToastQ.fire({
        icon: "warning",
        title: `<span class="text-white">PIN masih kurang dari 6 digit!</span>`,
      });
    } else if (String(parseData.pin).length > 6) {
      return ToastQ.fire({
        icon: "warning",
        title: `<span class="text-white">PIN lebih dari 6 digit!</span>`,
      });
    } else if (isNaN(String(parseData.pin).replace(/[0-9]/g, ""))) {
      return ToastQ.fire({
        icon: "warning",
        title: `<span class="text-white">PIN harus berupa angka!</span>`,
      });
    } else if (parseData.pin_re === "") {
      return ToastQ.fire({
        icon: "warning",
        title: `<span class="text-white">Ulangi PIN tidak boleh kosong!</span>`,
      });
    } else if (
      String(parseData.pin_re).length > 1 &&
      String(parseData.pin_re).length < 6
    ) {
      return ToastQ.fire({
        icon: "warning",
        title: `<span class="text-white">Ulangi PIN masih kurang dari 6 digit!</span>`,
      });
    } else if (String(parseData.pin_re).length > 6) {
      return ToastQ.fire({
        icon: "warning",
        title: `<span class="text-white">Ulangi PIN lebih dari 6 digit!</span>`,
      });
    } else if (isNaN(String(parseData.pin_re).replace(/[0-9]/g, ""))) {
      return ToastQ.fire({
        icon: "warning",
        title: `<span class="text-white">Ulangi PIN harus berupa angka!</span>`,
      });
    } else if (String(parseData.pin) !== String(parseData.pin_re)) {
      return ToastQ.fire({
        icon: "warning",
        title: `<span class="text-white">PIN tidak sesuai!</span>`,
      });
    } else {
      Swal.fire({
        title: "Informasi!",
        text: "Pastikan data yang diinput telah benar.",
        type: "warning",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Lanjut, Reset",
        cancelButtonText: "Batal",
      }).then(
        function (result) {
          if (result.value) {
            this.props.dispatch(putMember(parseData, id));
          }
        }.bind(this)
      );
      this.clearState();
      this.toggle(e)
    }
  }
  render() {
    return (
      <WrapperModal
        backdropClassName="rs-modal-backdrop"
        size="sm"
        overflow={false}
        autoFocus={true}
        backdrop={true}
        // full
        show={this.props.isOpen && this.props.type === "formMemberPinReset"}
        onHide={() => this.toggle()}
        onEnter={() => {
        }}>
        <Modal.Header>
            <Modal.Title>
              Reset PIN Member
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <div className="bg-transparent rounded-lg p-2">
                <div className="form-group">
                  <label className="text-dark">PIN Baru</label>
                  <div className="input-group">
                    <input
                      type={this.state.sh_pin ? "text" : "password"}
                      className="form-control"
                      name="pin"
                      maxLength={6}
                      value={this.state.pin}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                        <button type="button" className="btn btn-outline-dark" onClick={(e) => this.showPin(e,'sh_pin')} ><i className={`zmdi zmdi-eye${this.state.sh_pin ? '' : '-off'}`}></i></button>
                    </div>
                  </div>

                  <div
                    className="invalid-feedback"
                    style={
                      this.state.error.pin !== ""
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {this.state.error.pin}
                  </div>
                </div>
                <div className="form-group">
                  <label className="text-dark">Ulangi PIN Baru</label>
                  <div className="input-group">
                    <input
                      type={this.state.sh_pin_re ? "text" : "password"}
                      className="form-control form-control-lg"
                      name="pin_re"
                      maxLength={6}
                      value={this.state.pin_re}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      onChange={this.handleChange}
                    />
                      <div className="input-group-append">
                          <button type="button" className="btn btn-outline-dark" onClick={(e) => this.showPin(e,'sh_pin_re')} ><i className={`zmdi zmdi-eye${this.state.sh_pin_re ? '' : '-off'}`}></i></button>
                      </div>
                  </div>
                  <div
                    className="invalid-feedback"
                    style={
                      this.state.error.pin_re !== ""
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {this.state.error.pin_re}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="form-group" style={{ textAlign: "right" }}>
            <button
              style={{ color: "white" }}
              type="button"
              className="btn btn-warning mb-2 mr-2"
              onClick={this.toggle}
            >
              <i className="ti-close" />
              Keluar
            </button>
            <button
              type="submit"
              className="btn btn-primary mb-2 mr-2"
              onClick={this.handleSubmit}
            >
              <i className="ti-save" />Reset</button>
          </div>
        </Modal.Footer>
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

export default connect(mapStateToProps)(FormMemberPinReset);
