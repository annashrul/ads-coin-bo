import React, { Component } from "react";
import { connect } from "react-redux";
import WrapperModal from "../_wrapper.modal";
import { ModalFooter } from "reactstrap";
import { ModalToggle } from "../../../../redux/actions/modal.action";
import { ToastQ } from "../../../../helper";
import Select from "react-select";
import { fetchKategori } from "../../../../redux/actions/kategori/kategori.action";
import File64 from "../../../common/File64";
import CKEditor from "react-ckeditor-component";
import {
  postPaket,
  putPaket,
} from "../../../../redux/actions/paket/paket.action";
import Preloader from "../../../../Preloader";
import { Modal } from 'rsuite';

class FormPaket extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChangeKategori = this.handleChangeKategori.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      title: "",
      price: "0",
      pin_required: "0",
      gambar: "-",
      caption: "",
      id_category: "",
      data_kategori: [],
      prev: "",
    };
  }

  getProps(props) {
    if (props.kategori.data !== undefined) {
      if (props.kategori.data.length > 0) {
        let dataKategori = [];
        props.kategori.data.forEach((v, i) => {
          dataKategori.push({ value: v.id, label: v.title });
          return;
        });
        this.setState({ data_kategori: dataKategori });
      }
    }
    if (props.detail.id !== "") {
      this.setState({
        caption: props.detail.caption,
        id_category: props.detail.id_category,
        title: props.detail.title,
        price: props.detail.price,
        pin_required: props.detail.pin_required,
        prev: props.detail.gambar,
      });
      this.handleChangeKategori({
        value: props.detail.id_category,
        label: props.detail.category,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getProps(nextProps);
  }
  componentDidMount() {
    this.getProps(this.props);
  }

  componentWillMount() {
    this.props.dispatch(fetchKategori("membership"));
  }

  clearState() {
    this.setState({
      title: "",
      price: "0",
      pin_required: "0",
      gambar: "-",
      caption: "",
      id_category: "",
      data_kategori: [],
    });
  }
  handleChangeImage(files) {
    if (files.status === "success") {
      this.setState({
        gambar: files.base64,
      });
    }
  }

  handleChangeKategori(val) {
    this.setState({
      id_category: val.value,
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggle = (e) => {
    // e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  };

  updateContent(newContent) {
    this.setState({
      caption: newContent,
    });
  }

  onChange(evt) {
    var newContent = evt.editor.getData();
    this.setState({
      caption: newContent,
    });
  }

  onBlur(evt) {}

  afterPaste(evt) {}

  handleSubmit(e) {
    e.preventDefault();
    let parsedata = {
      title: this.state.title,
      price: this.state.price,
      pin_required: this.state.pin_required,
      caption: this.state.caption,
      id_category: this.state.id_category,
      gambar: this.state.gambar,
    };
    if (parsedata["title"] === "") {
      ToastQ.fire({ icon: "error", title: `nama tidak boleh kosong` });
      return;
    }
    if (parsedata["id_category"] === "") {
      ToastQ.fire({ icon: "error", title: `kategori tidak boleh kosong` });
      return;
    }
    if (parsedata["pin_required"] === "" || parsedata["pin_required"] === "0") {
      ToastQ.fire({ icon: "error", title: `tiket tidak boleh kosong` });
      return;
    }
    if (parsedata["price"] === "" || parsedata["price"] === "0") {
      ToastQ.fire({ icon: "error", title: `poin tidak boleh kosong` });
      return;
    }
    if (parsedata["caption"] === "") {
      ToastQ.fire({ icon: "error", title: `Deskripsi tidak boleh kosong` });
      return;
    }
    if (this.props.detail.id === "") {
      this.props.dispatch(postPaket(parsedata));
    } else {
      this.props.dispatch(putPaket(this.props.detail.id, parsedata));
    }
    if (this.props.isError === true) {
      this.clearState();
    }
  }
  render() {
    return (
      <WrapperModal
        backdropClassName="rs-modal-backdrop"
        size="lg"
        overflow={false}
        autoFocus={true}
        backdrop={true}
        // full
        show={this.props.isOpen && this.props.type === "formPaket"}
        onHide={() => this.toggle()}
        onEnter={() => {
        }}
      >
        {this.props.isLoadingPost ? <Preloader /> : null}
        <Modal.Header>
            <Modal.Title>{this.props.detail.id === "" ? "Tambah" : "Ubah"} Paket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
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
                <label>Kategori</label>
                {
                  <Select
                    options={this.state.data_kategori}
                    placeholder="==== Pilih Kategori ===="
                    onChange={this.handleChangeKategori}
                    value={this.state.data_kategori.find((op) => {
                      return op.value === this.state.id_category;
                    })}
                  />
                }
              </div>
              <div className="form-group">
                <label>Tiket</label>
                <input
                  type="text"
                  className={"form-control"}
                  name={"pin_required"}
                  maxLength="20"
                  value={this.state.pin_required}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Coin</label>
                <input
                  type="text"
                  className={"form-control"}
                  name={"price"}
                  maxLength="20"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </div>
              <CKEditor
                activeClass="p10"
                content={this.state.caption}
                events={{
                  blur: this.onBlur,
                  afterPaste: this.afterPaste,
                  change: this.onChange,
                }}
              />
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="inputState" className="col-form-label">
                  Gambar
                  {this.props.detail.id !== "" ? (
                    <small style={{ color: "red" }}>
                      kosongkan bila tidak akan diubah
                    </small>
                  ) : (
                    ""
                  )}
                </label>
                <br />
                <File64
                  multiple={false}
                  maxSize={2048}
                  fileType="png, jpg"
                  className="mr-3 form-control-file"
                  onDone={this.handleChangeImage}
                  showPreview={true}
                  lang="id"
                  previewLink={this.state.prev}
                  previewConfig={{
                    width: "100%",
                  }}
                />
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
              Simpan
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
    kategori: state.kategoriReducer.data,
    isLoadingPost: state.paketReducer.isLoadingPost,
    isError: state.paketReducer.isError,
  };
};
export default connect(mapStateToProps)(FormPaket);
