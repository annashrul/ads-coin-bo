import React, { Component } from "react";
import { connect } from "react-redux";
import WrapperModal from "../_wrapper.modal";
import { ModalToggle } from "../../../../redux/actions/modal.action";
import { ToastQ } from "../../../../helper";
import {
  postKategori,
  putKategori,
} from "../../../../redux/actions/kategori/kategori.action";
import Preloader from "../../../../Preloader";
import FileBase64 from "react-file-base64";
import { Button, Icon, Modal } from "rsuite";

class FormKategori extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.state = {
      title: "",
      image: "",
      status: "1",
    };
  }
  getProps(props) {
    if (props.detail.id !== "") {
      this.setState({
        title: props.detail.title,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.getProps(nextProps);
  }
  componentWillMount() {
    this.getProps(this.props);
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggle = (e) => {
    // e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  };

  handleSubmit(e) {
    e.preventDefault();
    let state = this.state;
    let parsedata = { title: state.title, type: this.props.detail.paramType, status: state.status };
    if (state.title === "" || state.title === undefined) {
      ToastQ.fire({ icon: "error", title: `title tidak boleh kosong` });
      return;
    }
    if(parsedata['image']!==''){
        parsedata['icon'] = this.state.image.base64;
    }
    if (this.props.detail.id !== "") {
      this.props.dispatch(
        putKategori(this.props.detail.id, parsedata, this.props.detail.param)
      );
    } else {
      this.props.dispatch(postKategori(parsedata, this.props.detail.param));
    }
  }

  handleChangeImage(files) {
    this.setState({
        image: files
    })
  };
  render() {
    return (
      <WrapperModal
        backdropClassName="rs-modal-backdrop"
        size="sm"
        overflow={false}
        autoFocus={true}
        backdrop={true}
        // full
        show={this.props.isOpen && this.props.type === "formKategori"}
        onHide={() => this.toggle()}
        onEnter={() => {
        }}
      >
        {this.props.isLoadingPost ? <Preloader /> : null}
        <Modal.Header>
            <Modal.Title>
            {this.props.detail.id !== "" ? "Ubah" : "Tambah"} Kategori &nbsp;
            {this.props.detail.param}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Nama</label>
                <input
                  type="text"
                  className={"form-control"}
                  name={"title"}
                  maxLength="200"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                  <label>Status</label>
                  <select className="form-control" name="status" defaultValue={this.state.status} value={this.state.status} onChange={this.handleChange}>
                      <option value="1">Aktif</option>
                      <option value="0">Tidak Aktif</option>
                  </select>
              </div>
              <div className="form-group">
                  <label htmlFor="inputState" className="col-form-label">Ikon {this.props.detail===undefined?<small>kosongkan apabila tidak akan diubah</small>:""}</label><br/>
                  <FileBase64
                      multiple={ false }
                      className="mr-3 form-control-file"
                      onDone={ this.handleChangeImage } />
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
    isLoadingPost: state.kategoriReducer.isLoadingPost,
    isError: state.kategoriReducer.isError,
  };
};
export default connect(mapStateToProps)(FormKategori);
