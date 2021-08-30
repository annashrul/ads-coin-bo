import React, { Component } from "react";
import { connect } from "react-redux";
import WrapperModal from "../_wrapper.modal";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ModalToggle } from "../../../../redux/actions/modal.action";
import { ToastQ } from "../../../../helper";
import {
  postKategori,
  putKategori,
} from "../../../../redux/actions/kategori/kategori.action";
import Preloader from "../../../../Preloader";

class FormKategori extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
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
    e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  };

  handleSubmit(e) {
    e.preventDefault();
    let state = this.state;
    let parsedata = { title: state.title, type: this.props.detail.paramType };
    if (state.title === "" || state.title === undefined) {
      ToastQ.fire({ icon: "error", title: `title tidak boleh kosong` });
      return;
    }
    if (this.props.detail.id !== "") {
      this.props.dispatch(
        putKategori(this.props.detail.id, parsedata, this.props.detail.param)
      );
    } else {
      this.props.dispatch(postKategori(parsedata, this.props.detail.param));
    }
  }

  render() {
    return (
      <WrapperModal
        isOpen={this.props.isOpen && this.props.type === "formKategori"}
        size="md"
      >
        {this.props.isLoadingPost ? <Preloader /> : null}
        <ModalHeader toggle={this.toggle}>
          {this.props.detail.id !== "" ? "Ubah" : "Tambah"} Kategori &nbsp;
          {this.props.detail.param}
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label>Nama</label>
                <input
                  type="text"
                  className={"form-control"}
                  name={"title"}
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
            </div>
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
    isLoadingPost: state.kategoriReducer.isLoadingPost,
    isError: state.kategoriReducer.isError,
  };
};
export default connect(mapStateToProps)(FormKategori);
