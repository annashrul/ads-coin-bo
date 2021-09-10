import React, { Component } from "react";
import WrapperModal from "../../_wrapper.modal";
import connect from "react-redux/es/connect/connect";
import Select from "react-select";
import { getUserLevel } from "../../../../../redux/actions/masterdata/user_level.action";
import { ModalToggle } from "../../../../../redux/actions/modal.action";
import { ToastQ } from "../../../../../helper";
import {
  postUserList,
  putUserList,
} from "../../../../../redux/actions/masterdata/user_list.action";
import Preloader from "../../../../../Preloader";
import { Button, Icon, Modal } from 'rsuite';

class FormUserList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUserLevel = this.handleChangeUserLevel.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.state = {
      name: "",
      username: "",
      password: "",
      conf_password: "",
      level: "",
      status: "1",
      level_data: [],
      status_data: [
        { value: "1", label: "Aktif" },
        { value: "0", label: "Tidak Aktif" },
      ],
    };
  }

  clearState() {
    this.setState({
      name: "",
      username: "",
      password: "",
      conf_password: "",
      level: "",
      status: "1",
      level_data: [],
    });
  }

  componentWillMount() {
    this.props.dispatch(getUserLevel());
  }

  componentWillReceiveProps(nextProps) {
    let data = [];
    if (nextProps.dataLevel.data !== undefined) {
      if (nextProps.dataLevel.data.length > 0) {
        nextProps.dataLevel.data.forEach((v, i) => {
          data.push({ value: v.id, label: v.level });
        });
      }
    }
    if (nextProps.detail.id !== "") {
      this.handleChangeUserLevel({
        value: nextProps.detail.id_level,
        label: nextProps.detail.level,
      });
      this.setState({
        name: nextProps.detail.name,
        username: nextProps.detail.username,
        password: "-",
        conf_password: "-",
        status: nextProps.detail.status,
      });
    }
    this.setState({ level_data: data });
  }

  handleChangeUserLevel(val) {
    this.setState({
      level: val.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    let parseData = {};
    let state = this.state;
    parseData["name"] = state.name;
    parseData["username"] = state.username;
    parseData["password"] = state.password;
    parseData["conf_password"] = state.conf_password;
    parseData["level"] = state.level;
    parseData["status"] = state.status;

    if (parseData["name"] === "") {
      ToastQ.fire({ icon: "error", title: `nama tidak boleh kosong` });
      return;
    }
    if (parseData["username"] === "") {
      ToastQ.fire({ icon: "error", title: `username tidak boleh kosong` });
      return;
    }
    if (parseData["password"] === "") {
      ToastQ.fire({ icon: "error", title: `password tidak boleh kosong` });
      return;
    }
    if (parseData["conf_password"] === "") {
      ToastQ.fire({
        icon: "error",
        title: `konfirmasi password tidak boleh kosong`,
      });
      return;
    }

    if (parseData["level"] === "") {
      ToastQ.fire({ icon: "error", title: `level tidak boleh kosong` });
      return;
    }
    if (parseData["status"] === "") {
      ToastQ.fire({ icon: "error", title: `status tidak boleh kosong` });
      return;
    }
    if (parseData["conf_password"] !== parseData["password"]) {
      ToastQ.fire({ icon: "error", title: `konfirmasi password tidak sesuai` });
      return;
    }

    if (this.props.detail.id === "") {
      this.props.dispatch(postUserList(parseData));
    } else {
      this.props.dispatch(putUserList(parseData, this.props.detail.id));
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleStatus(val) {
    this.setState({ status: val.value });
  }
  toggle(e) {
    // e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.clearState();
  }

  render() {
    return (
      <WrapperModal
        size="md"
        backdropClassName="rs-modal-backdrop"
        overflow={false}
        autoFocus={true}
        backdrop={true}
        // full
        show={this.props.isOpen && this.props.type === "formUserList"}
        onHide={() => this.toggle()}
        onEnter={() => {
        }}
      >
        <Modal.Header>
            <Modal.Title>{this.props.detail.id !== "" ? `Ubah Pengguna` : `Tambah Pengguna`}</Modal.Title>
        </Modal.Header>
        {this.props.isLoadingPost ? <Preloader /> : null}

        <Modal.Body>
          <div className="form-group">
            <label>Nama</label>
            <input
              type="text"
              className="form-control"
              name="name"
              maxLength="200"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              readOnly={this.props.detail.id !== ""}
              type="text"
              className="form-control"
              name="username"
              maxLength="200"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              Password
              <small>
                {this.props.detail.id !== ""
                  ? " (  kosongkan jika tidak akan diubah )"
                  : ""}
              </small>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              Konfirmasi Password
              <small>
                {this.props.detail.id !== ""
                  ? " (  kosongkan jika tidak akan diubah )"
                  : ""}
              </small>
            </label>
            <input
              type="password"
              className="form-control"
              name="conf_password"
              value={this.state.conf_password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Akses</label>
            <Select
              options={this.state.level_data}
              placeholder="Pilih User Level"
              onChange={this.handleChangeUserLevel}
              value={this.state.level_data.find((op) => {
                return op.value === this.state.level;
              })}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <Select
              options={this.state.status_data}
              placeholder="Pilih User Level"
              onChange={this.handleStatus}
              value={this.state.status_data.find((op) => {
                return op.value === this.state.status;
              })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="form-group" style={{ textAlign: "right" }}>
            <Button
                size="sm"
                color="yellow"
                appearance="subtle"
                className="mr-1" onClick={this.toggle}>
                <Icon icon="close" /> Keluar
              </Button>
              <Button 
                size="sm"
                color="violet"
                appearance="subtle"
                className="" onClick={this.handleSubmit}>
                <Icon icon="save" /> Simpan
              </Button>
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
    isLoadingPost: state.userListReducer.isLoadingPost,
    isError: state.userListReducer.isError,
    dataLevel: state.userLevelReducer,
  };
};

export default connect(mapStateToProps)(FormUserList);
