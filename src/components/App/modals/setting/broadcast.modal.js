import React, { Component } from "react";
import WrapperModal from "../_wrapper.modal";
import connect from "react-redux/es/connect/connect";
import {broadcast} from "../../../../redux/actions/setting/general.action";import { ModalToggle } from "redux/actions/modal.action";
import { ToastQ } from "helper";
import Preloader from "../../../../Preloader";
import { Modal } from 'rsuite';

class FormUserList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title:'',
      message:''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const {title,message}=this.state
    if (title === "" || title === undefined) {
      ToastQ.fire({
        icon: "error",
        title: `Title tidak boleh kosong.`,
      });
      return;
    } else if (message === "" || message === undefined) {
      ToastQ.fire({
        icon: "error",
        title: `Message tidak boleh kosong.`,
      });
      return;
    }else{
      this.props.dispatch(broadcast(title,message));
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggle(e) {
    // e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  }

  render() {
    return (
      <WrapperModal
        backdropClassName="rs-modal-backdrop"
        size="md"
        overflow={false}
        autoFocus={true}
        backdrop={true}
        // full
        show={this.props.isOpen && this.props.type === "formModalBroadcast"}
        onHide={() => this.toggle()}
        onEnter={() => {
        }}
      >
        <Modal.Header>
            <Modal.Title>Buat Broadcast Notif</Modal.Title>
        </Modal.Header>
        {this.props.isLoadingPost ? <Preloader /> : null}
        <Modal.Body>
          <div className="form-group">
            <label>Judul</label>
            <input
              type="text"
              className="form-control"
              name="title"
              maxLength="200"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Pesan</label>
            <input
              type="text"
              className="form-control"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
            />
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
              <i className="ti-save" /> Simpan
            </button>
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
    isLoadingPost: state.banksReducer.isLoadingPost,
    isError: state.banksReducer.isError,
    list_bank: state.banksReducer.list_bank,
  };
};

export default connect(mapStateToProps)(FormUserList);
