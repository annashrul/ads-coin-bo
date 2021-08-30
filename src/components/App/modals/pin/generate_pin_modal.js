import React, { Component } from "react";
import WrapperModal from "../_wrapper.modal";
import connect from "react-redux/es/connect/connect";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ModalToggle } from "../../../../redux/actions/modal.action";
import { ToastQ } from "../../../../helper";
import Preloader from "../../../../Preloader";
import { generatePin } from "../../../../redux/actions/paket/pin.action";

class GeneratePinModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      qty: "",
      prefix: "",
    };
  }

  clearState() {
    this.setState({
      qty: "",
      prefix: "",
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let state = this.state;
    if (state.qty === 0 || state.qty === "") {
      ToastQ.fire({ icon: "error", title: `jumlah pin tidak boleh kosong` });
      return;
    }
    if (state.prefix === "") {
      ToastQ.fire({ icon: "error", title: `prefix tidak boleh kosong` });
      return;
    }
    let parseData = {
      qty: state.qty,
      prefix: state.prefix,
    };
    this.props.dispatch(generatePin(parseData));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:
        event.target.name === "prefix"
          ? event.target.value.toUpperCase()
          : event.target.value,
    });
  };

  toggle(e) {
    e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.clearState();
  }

  render() {
    return (
      <WrapperModal
        isOpen={this.props.isOpen && this.props.type === "generatePin"}
        size="md"
      >
        <ModalHeader toggle={this.toggle}>Generate PIN</ModalHeader>
        {this.props.isLoadingPost ? <Preloader /> : null}

        <ModalBody>
          <div className="form-group">
            <label>Jumlah</label>
            <input
              type="text"
              className="form-control"
              name="qty"
              value={this.state.qty}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              Prefix{" "}
              <small style={{ color: "#eeeeee" }}>
                ( maksimal 2 huruf dan harus menggunakan huruf kapital (besar) )
              </small>
            </label>
            <input
              maxLength={2}
              style={{ textTransform: "uppercase" }}
              type="text"
              className="form-control"
              name="prefix"
              value={this.state.prefix}
              onChange={this.handleChange}
            />
            <small className="form-text text-muted">
              Contoh hasil :
              {this.state.prefix === "" ? "**" : this.state.prefix}9D75E00858
            </small>
          </div>
        </ModalBody>
        <ModalFooter>
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
              className="btn btn-primary mb-2"
              onClick={this.handleSubmit}
            >
              <i className="ti-save" /> Simpan
            </button>
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
    isLoadingPost: state.pinReducer.isLoadingPost,
    isError: state.pinReducer.isError,
  };
};

export default connect(mapStateToProps)(GeneratePinModal);
