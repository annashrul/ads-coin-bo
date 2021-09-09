import React, { Component } from "react";
import WrapperModal from "../../_wrapper.modal";
import connect from "react-redux/es/connect/connect";

import { ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { ModalToggle } from "../../../../../redux/actions/modal.action";
import Select, { components } from "react-select";
import { fetchDataBank } from "../../../../../redux/actions/setting/bank.action";
import Skeleton from "react-loading-skeleton";
// import { putMember } from "../../../../../redux/actions/masterdata/member.action";
import Swal from "sweetalert2";
import {
  putMemberBank,
  setShowModal,
} from "../../../../../redux/actions/masterdata/bank.action";
import { Modal } from "rsuite";

const { Option } = components;
const IconOption = (props) => (
  <Option {...props}>
    <div className="client-media-content d-flex align-items-center p-1">
      {/* <img className="client-thumb mr-3" src={props.data.icon} alt={props.data.label} /> */}
      <div className="user--media-body">
        <h6 className="mb-0 text-dark font-15">{props.data.label}</h6>
        <span className="font-13 text-dark">{props.data.childLabel}</span>
      </div>
    </div>
  </Option>
);

class FormMemberBank extends Component {
  //MENU ACCESS MASTERDATA = 0-9
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.HandleChangeBank = this.HandleChangeBank.bind(this);
    this.state = {
      full_name: "",
      bank_data: [],
      acc_name: "",
      bank_name: "",
      bank_no: "",
      bank_id: "",
      error: {
        full_name: "",
        acc_name: "",
        bank_name: "",
        bank_no: "",
        bank_id: "",
      },
    };
  }
  clearState() {
    this.setState({
      full_name: "",
      bank_data: [],
      bank_name: "",
      bank_no: "",
      bank_id: "",
      error: {
        full_name: "",
        bank_name: "",
        bank_no: "",
        bank_id: "",
      },
    });
  }

  componentWillReceiveProps = (nextProps) => {
    let data_bank = [];
    if (nextProps.resBank !== undefined && nextProps.resBank.length > 0) {
      nextProps.resBank.map((i) => {
        data_bank.push({
          value: i.id,
          label: i.name,
          childLabel: i.code,
          icon: i.value,
        });
        return null;
      });
      this.setState({
        bank_data: data_bank,
      });
    }
    if (nextProps.detailBank !== undefined && nextProps.detailBank.length > 0) {
      this.setState({
        // full_name:nextProps.detail.member_name,
        bank_name: nextProps.detailBank[0].bank_name,
        full_name: nextProps.detailBank[0].acc_name,
        bank_no: nextProps.detailBank[0].acc_no,
        bank_id: nextProps.detailBank[0].id,
      });
    }
    console.log("nextProps.detailBank", nextProps.detailBank);
  };
  componentWillMount() {
    this.props.dispatch(fetchDataBank());
    // this.setState({full_name:this.props.detail.name});
    // console.log(this.props.detail);
  }
  // componentDidUpdate(prevState){
  //     if(this.state.full_name!==prevState.full_name)this.setState({full_name:this.props.detail.name});
  // }
  toggle = (e) => {
    e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.clearState();
    this.props.dispatch(setShowModal(false));
  };
  HandleChangeBank(bk) {
    this.setState({ bank_name: bk.label });
    let err = Object.assign({}, this.state.error, { bank_name: "" });
    this.setState({ error: err });
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    let err = Object.assign({}, this.state.error, { [event.target.name]: "" });
    this.setState({ error: err });
  };
  handleSubmit(e) {
    e.preventDefault();
    let parseData = {};
    let parseDetail = {};
    parseDetail["acc_no"] = this.state.bank_no;
    parseDetail["acc_name"] = this.state.full_name;
    parseDetail["bank_name"] = this.state.bank_name;

    parseData["bank"] = parseDetail;
    let id_bank = this.state.bank_id;
    let err = this.state.error;
    if (
      parseDetail["acc_name"] === "" ||
      parseDetail["acc_name"] === undefined
    ) {
      err = Object.assign({}, err, {
        full_name: "Nama lengkap tidak boleh kosong",
      });
      this.setState({ confirm: false, error: err });
    } else if (
      parseDetail["bank_name"] === "" ||
      parseDetail["bank_name"] === undefined
    ) {
      err = Object.assign({}, err, { bank_name: "Nama Bank belum dipilih!" });
      this.setState({ confirm: false, error: err });
    } else if (
      parseDetail["acc_no"] === "" ||
      parseDetail["acc_no"] === undefined
    ) {
      err = Object.assign({}, err, {
        bank_no: "Data No Rekening tidak boleh kosong!",
      });
      this.setState({ confirm: false, error: err });
    } else if (isNaN(String(parseDetail["acc_no"]).replace(/[0-9]/g, ""))) {
      err = Object.assign({}, err, {
        bank_no: "Data No Rekening harus berupa angka",
      });
      this.setState({ confirm: false, error: err });
    } else {
      Swal.fire({
        title: "Informasi!",
        text: "Pastikan data yang diinput telah benar.",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Lanjut, Ubah",
        cancelButtonText: "Batal",
      }).then(
        function (result) {
          if (result.value) {
            this.props.dispatch(putMemberBank(parseData, id_bank));
          }
        }.bind(this)
      );
      this.clearState();
      // this.toggle(e)
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
        show={this.props.isOpen && this.props.type === "formMemberBank"}
        onHide={() => this.toggle()}
        onEnter={() => {
        }}>
        
        <Modal.Header>
            <Modal.Title>
              {this.props.detail.id === ""
              ? "Tambah Member Bank"
              : "Ubah Member Bank"}
            </Modal.Title>
        </Modal.Header>
        {/* <ModalHeader toggle={this.toggle}>
          {this.props.detail.id === ""
            ? "Tambah Member Bank"
            : "Ubah Member Bank"}
        </ModalHeader> */}
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <div className="bg-transparent rounded-lg p-2">
                {/* <hr/> */}
                <small className="text-muted">Data Bank</small>

                <div className="form-group">
                  <label className="text-light">Nama Pemilik Bank</label>
                  <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    value={this.state.full_name}
                    onChange={this.handleChange}
                  />

                  <div
                    className="invalid-feedback"
                    style={
                      this.state.error.full_name !== ""
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {this.state.error.full_name}
                  </div>
                </div>
                <div className="form-group">
                  <label className="text-light">Nama Bank</label>
                  {typeof this.state.bank_data === "object" ? (
                    this.state.bank_data.length > 0 ? (
                      <Select
                        // defaultValue={this.state.bank_data[0]}
                        placeholder="=========Pilih Bank=========="
                        options={this.state.bank_data}
                        components={{ Option: IconOption }}
                        onChange={this.HandleChangeBank}
                        value={this.state.bank_data.find((op) => {
                          return op.label === this.state.bank_name;
                        })}
                      />
                    ) : (
                      <Skeleton style={{ width: "100%", height: "40px" }} />
                    )
                  ) : (
                    <Skeleton style={{ width: "100%", height: "40px" }} />
                  )}
                  <div
                    className="invalid-feedback"
                    style={
                      this.state.error.bank_name !== ""
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {this.state.error.bank_name}
                  </div>
                </div>
                <div className="form-group">
                  <label className="text-dark">Nomor Rekening Bank</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="bank_no"
                    maxLength="17"
                    value={this.state.bank_no}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onChange={this.handleChange}
                  />
                  <div
                    className="invalid-feedback"
                    style={
                      this.state.error.bank_no !== ""
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {this.state.error.bank_no}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
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
              <i className="ti-save" />
              {!this.props.isLoadingPost ? "Simpan" : "Loading ......"}
            </button>
          </div>
        </ModalFooter>
      </WrapperModal>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state.bankReducer",state.banksReducer);
  return {
    isOpen: state.modalReducer,
    type: state.modalTypeReducer,
    isLoadingPost: state.userLevelReducer.isLoadingPost,
    isError: state.userLevelReducer.isError,
    isLoadingData: state.banksReducer.isLoading,
    resBank: state.banksReducer.list_bank,
    detailBank: state.bankReducer.data,
  };
};

export default connect(mapStateToProps)(FormMemberBank);
