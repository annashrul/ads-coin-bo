import React, { Component } from "react";
import WrapperModal from "../../_wrapper.modal";
import connect from "react-redux/es/connect/connect";
import { getUserLevel } from "../../../../../redux/actions/masterdata/user_level.action";
import { ModalToggle } from "../../../../../redux/actions/modal.action";
import { ToastQ } from "../../../../../helper";
import Preloader from "../../../../../Preloader";
import { Button, Icon, Modal } from 'rsuite';
import { postPromo, putPromo } from "../../../../../redux/actions/masterdata/promo.action";
import FileBase64 from "react-file-base64";
import moment from "moment";

class FormUserList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUserLevel = this.handleChangeUserLevel.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.state = {
      title: "",
      deskripsi: "",
      type: 0,
      nominal: "",
      kelipatan: 0,
      periode_start: moment(new Date()).format("yyyy-MM-DD"),
      periode_end: moment(new Date()).add(1, "days").format("yyyy-MM-DD"),
      max_user_uses: "",
      max_uses: "",
      image: "-",
      type_data: [
        { value: "1", label: "Aktif" },
        { value: "0", label: "Tidak Aktif" },
      ],
    };
  }

  clearState() {
    this.setState({
      title: "",
      deskripsi: "",
      type: "0",
      nominal: "",
      kelipatan: 0,
      periode_start: "1",
      periode_end: "",
      max_user_uses: "",
      max_uses: "",
      image: "-",
    });
  }

  componentWillMount() {
    this.props.dispatch(getUserLevel());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.detail.id !== "") {
      this.setState({
        title: nextProps.detail.title,
        deskripsi: nextProps.detail.deskripsi,
        type: nextProps.detail.type,
        nominal: nextProps.detail.nominal,
        kelipatan: nextProps.detail.kelipatan,
        periode_start: moment(nextProps.detail.periode_start).format("yyyy-MM-DD"),
        periode_end: moment(nextProps.detail.periode_end).format("yyyy-MM-DD"),
        max_user_uses: nextProps.detail.max_user_uses,
        max_uses: nextProps.detail.max_uses,
        image: nextProps.detail.image,
      });
    }
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
    parseData["title"] = state.title;
    parseData["deskripsi"] = state.deskripsi;
    parseData["type"] = state.type;
    parseData["nominal"] = state.nominal;
    parseData["kelipatan"] = state.kelipatan;
    parseData["periode_start"] = state.periode_start;
    parseData["periode_end"] = state.periode_end;
    parseData["max_user_uses"] = state.max_user_uses;
    parseData["max_uses"] = state.max_uses;
    parseData["image"] = state.image;
    parseData["status"] = 0;

    if (parseData["title"] === "") {
      ToastQ.fire({ icon: "error", title: `Judul promo tidak boleh kosong` });
      return;
    }
    if (parseData["deskripsi"] === "") {
      ToastQ.fire({ icon: "error", title: `Deskripsi tidak boleh kosong` });
      return;
    }
    if (parseData["type"] === "") {
      ToastQ.fire({ icon: "error", title: `Tipe tidak boleh kosong` });
      return;
    }
    if (parseData["nominal"] === "") {
      ToastQ.fire({ icon: "error", title: `Nominal tidak boleh kosong` });
      return;
    }
    // if (parseData["kelipatan"] === "") {
    //   ToastQ.fire({ icon: "error", title: `Min. Trx tidak boleh kosong` });
    //   return;
    // }
    if (parseData["periode_start"] === "") {
      ToastQ.fire({ icon: "error", title: `Periode awal password tidak sesuai` });
      return;
    }
    if (parseData["periode_end"] === "") {
      ToastQ.fire({ icon: "error", title: `Periode akhir tidak boleh kosong` });
      return;
    }
    if (parseData["max_user_uses"] === "") {
      ToastQ.fire({ icon: "error", title: `Maks. Pemakaian per Pengguna tidak boleh kosong` });
      return;
    }
    if (parseData["max_uses"] === "") {
      ToastQ.fire({ icon: "error", title: `Maks. Pemakaian tidak boleh kosong` });
      return;
    }
    // if (parseData["image"] === "") {
    //   ToastQ.fire({ icon: "error", title: `Gambar tidak sesuai` });
    //   return;
    // }

    if (this.props.detail.id === "") {
      this.props.dispatch(postPromo(parseData));
    } else {
      this.props.dispatch(putPromo(parseData, this.props.detail.id));
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

  getFiles(files) {
    this.setState({
      image: files.base64,
    });
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
        show={this.props.isOpen && this.props.type === "formPromo"}
        onHide={() => this.toggle()}
        onEnter={() => {
        }}
      >
        <Modal.Header>
            <Modal.Title>{this.props.detail.id !== "" ? `Ubah Promo` : `Tambah Promo`}</Modal.Title>
        </Modal.Header>
        {this.props.isLoadingPost ? <Preloader /> : null}

        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                  <label>Tipe</label>
                  <select className="form-control" name="type" defaultValue={this.state.type} value={this.state.type} onChange={this.handleChange}>
                      <option value="1">Konversi</option>
                      <option value="0">Bonus</option>
                  </select>
              </div>
              <div className="form-group">
                <label>Judul Promo  <span className="text-danger">*</span></label>
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
                <label>
                  Deskripsi <span className="text-danger">*</span>
                </label>
                <textarea name="deskripsi" className="form-control" value={this.state.deskripsi} onChange={this.handleChange} style={{ height: "77px" }} />
              </div>
              
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      Periode awal <span className="text-danger">*</span>
                    </label>
                    <input min={moment(new Date()).format("YYYY-MM-DD")} className={"form-control"} value={this.state.periode_start} type="date" name="periode_start" onChange={this.handleChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      Periode akhir <span className="text-danger">*</span>
                    </label>
                    <input min={moment(new Date()).format("YYYY-MM-DD")} className={"form-control"} value={this.state.periode_end} type="date" name="periode_end" onChange={this.handleChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Nominal <span className="text-danger">*</span></label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">{parseInt(this.state.type,10)===0?'Coin':'Rupiah'}</span>
                  </div>
                  <input
                    type="number"
                    name="nominal"
                    maxLength="15"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.nominal}
                    className="form-control"
                    placeholder="Nominal"
                  />
                </div>
              </div>
              {parseInt(this.state.type,10)===0?
              <div className="form-group">
                <label>Minimal Transaksi</label>
                <div className="input-group">
                  <input
                    type="number"
                    name="kelipatan"
                    maxLength="15"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.kelipatan}
                    className="form-control"
                    placeholder="Minimal Transaksi"
                  />
                </div>
              </div>:''}
              <div className="form-group">
                <label>Maksimal Pemakaian <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  name="max_uses"
                  maxLength="5"
                  value={this.state.max_uses}
                  onChange={(event) => this.handleChange(event)}
                />
              </div>
              <div className="form-group">
                <label>Maksimal Pemakaian per Pengguna <span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control"
                  name="max_user_uses"
                  maxLength="5"
                  value={this.state.max_user_uses}
                  onChange={(event) => this.handleChange(event)}
                />
              </div>

              <div className="form-group">
                <label>
                  Foto <span className="text-danger">*</span>
                </label>
                <FileBase64 multiple={false} className="mr-3 form-control-file" onDone={this.getFiles.bind(this)} />
              </div>
            </div>
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
