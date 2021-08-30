import React, { Component } from "react";
import WrapperModal from "../_wrapper.modal";
import connect from "react-redux/es/connect/connect";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import { ModalToggle } from "redux/actions/modal.action";
import { ToastQ } from "helper";
import {
  postBankList,
  putBankList,
} from "../../../../redux/actions/setting/bank.action";
import Preloader from "../../../../Preloader";

class FormUserList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeBank = this.handleChangeBank.bind(this);
    this.state = {
      id: "",
      bank_name: "",
      acc_name: "",
      acc_no: "",
      tf_code: "",
      data_bank: [],
      bank: "",
    };
  }

  clearState() {
    this.setState({
      id: "",
      bank_name: "",
      acc_name: "",
      acc_no: "",
      tf_code: "",
      data_bank: [],
      bank: "",
      isLoading: true,
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data !== undefined && props.data.length !== 0) {
      if (props.data !== state.prevdataProps) {
        return {
          prevdataProps: props.data,
          id: props.data.id,
          bank_name: props.data.bank_name,
          acc_name: props.data.acc_name,
          acc_no: props.data.acc_no,
          tf_code: props.data.tf_code,
        };
      }
    }

    if (props.list_bank !== undefined && props.list_bank.length !== 0) {
      if (props.list_bank !== state.prevbankProps) {
        const bank = [];
        props.list_bank.forEach((v, i) => {
          bank.push({
            value: v.code,
            label: v.name,
          });
        });
        return {
          prevbankProps: props.list_bank,
          data_bank: bank,
        };
      }
    }
    return null;
  }

  handleChangeBank(val) {
    this.setState({
      bank_name: val.label,
      tf_code: val.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = this.state;
    let parsedata = {
      bank_name: data.bank_name,
      acc_name: data.acc_name,
      acc_no: data.acc_no,
      tf_code: data.tf_code,
    };
    if (data.bank_name === "" || data.bank_name === undefined) {
      ToastQ.fire({
        icon: "error",
        title: `Seilahkan pilih bank terlebih dahulu.`,
      });
      return;
    } else if (data.acc_name === "" || data.acc_name === undefined) {
      ToastQ.fire({
        icon: "error",
        title: `Form Atas Nama tidak boleh kosong.`,
      });
      return;
    } else if (data.acc_no === "" || data.acc_no === undefined) {
      ToastQ.fire({
        icon: "error",
        title: `Form No. Rekening tidak boleh kosong.`,
      });
      return;
    }

    if (this.props.data.id === "") {
      this.props.dispatch(postBankList(parsedata));
    } else {
      this.props.dispatch(putBankList(parsedata, this.props.data.id));
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleFile(files) {
    this.setState({
      newLogo: files.base64,
    });
  }

  toggle(e) {
    e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  }

  render() {
    return (
      <WrapperModal
        isOpen={this.props.isOpen && this.props.type === "formBankPerusahaan"}
        size="md"
      >
        <ModalHeader toggle={this.toggle}>
          {this.state.id !== "" ? `Ubah Bank` : `Tambah Bank`}
        </ModalHeader>
        {this.props.isLoadingPost ? <Preloader /> : null}
        <ModalBody>
          <div className="form-group">
            <label>Bank</label>
            <Select
              options={this.state.data_bank}
              placeholder="Pilih Bank"
              onChange={this.handleChangeBank}
              value={this.state.data_bank.find((op) => {
                return op.value === this.state.tf_code;
              })}
            />
          </div>
          <div className="form-group">
            <label>Atas Nama</label>
            <input
              type="text"
              className="form-control"
              name="acc_name"
              value={this.state.acc_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>No. Rekening</label>
            <input
              type="text"
              className="form-control"
              name="acc_no"
              value={this.state.acc_no}
              onChange={this.handleChange}
            />
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
              className="btn btn-primary mb-2 mr-2"
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
    isLoadingPost: state.banksReducer.isLoadingPost,
    isError: state.banksReducer.isError,
    list_bank: state.banksReducer.list_bank,
  };
};

export default connect(mapStateToProps)(FormUserList);
