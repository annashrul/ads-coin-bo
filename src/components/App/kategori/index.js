import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import Paginationq, { myDate } from "../../../helper";
import moment from "moment";

import { ModalToggle, ModalType } from "../../../redux/actions/modal.action";
import FormKategori from "../modals/kategori/form_kategori";
import * as Swal from "sweetalert2";
import {
  deleteKategori,
  fetchKategori,
} from "../../../redux/actions/kategori/kategori.action";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";
moment.locale("id"); // en

class Kategori extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      param: "",
      paramType: "",
      path: this.props.location.pathname.split("/")[1],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      this.checkPage();
    }
  }

  checkPage() {
    let newParam = "";
    let newParamType;
    let newPath = "";
    if (this.props.location.pathname.split("/")[1] === "paket") {
      newParam = "membership";
      newParamType = 0;
      newPath = "Paket";
      this.props.dispatch(fetchKategori(`${newParam}?page=1`));
    } else {
      newParam = "berita";
      newParamType = 1;
      newPath = "Berita";
      this.props.dispatch(fetchKategori(`${newParam}?page=1`));
    }
    this.setState({ param: newPath, paramType: newParamType, path: newPath });
  }

  // getProps()

  componentWillMount() {
    this.checkPage();
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleValidate() {
    let where = "";
    let page = localStorage.getItem(`pageKategori${this.state.param}`);
    let any = this.state.any;

    if (page !== null && page !== undefined && page !== "") {
      where += `page=${page}`;
    } else {
      where += "page=1";
    }
    if (any !== null && any !== undefined && any !== "") {
      where += `&q=${any}`;
    }
    return where;
  }

  handlePage(pageNumber) {
    localStorage.setItem(`pageKategori${this.state.param}`, pageNumber);
    this.props.dispatch(
      fetchKategori(`${this.state.param}?page=${pageNumber}`)
    );
  }
  handleSearch(e) {
    e.preventDefault();
    this.props.dispatch(
      fetchKategori(`${this.state.param}?q=${this.state.any}`)
    );
  }
  handleModal(e, par) {
    if (par !== "") {
      this.setState({
        detail: {
          paramType: this.state.paramType,
          param: this.state.param,
          id: this.props.data.data[par].id,
          title: this.props.data.data[par].title,
        },
      });
    } else {
      this.setState({
        detail: {
          paramType: this.state.paramType,
          param: this.state.param,
          id: "",
        },
      });
    }
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("formKategori"));
  }

  handleDelete(e, id) {
    e.preventDefault();
    Swal.fire({
      title: "Perhatian !!!",
      html: `anda yakin akan menghapus data ini ??`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Oke, Hapus`,
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.value) {
        this.props.dispatch(deleteKategori(id, this.state.param));
      }
    });
  }

  render() {
    const headStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
    };
    const { total, per_page, current_page, data } = this.props.data;

    return (
      <Layout page={`Kategori ${this.state.path}`}>
        <div className="row">
          <div className="col-8 col-xs-8 col-md-10">
            <div className="row">
              <div className="col-md-5">
                <div className="form-group">
                  <label>Cari</label>
                  <input
                    type="text"
                    className="form-control"
                    name="any"
                    placeholder={"cari disini"}
                    value={this.state.any}
                    onChange={this.handleChange}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        this.handleSearch(event);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 col-xs-4 col-md-2 text-right">
            <div className="form-group">
              <button
                style={{ marginTop: "27px" }}
                type="button"
                className="btn btn-primary"
                onClick={(e) => this.handleSearch(e)}
              >
                <i className="fa fa-search" />
              </button>
              <button
                style={{ marginTop: "27px", marginLeft: "5px" }}
                type="button"
                className="btn btn-primary"
                onClick={(e) => this.handleModal(e, "")}
              >
                <i className="fa fa-plus" />
              </button>
            </div>
          </div>
          <br />
        </div>

        <div className="col-md-12">
          <div style={{ overflowX: "auto" }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th style={headStyle}>NO</th>
                  <th style={headStyle}>#</th>
                  <th style={headStyle}>NAMA</th>
                  <th style={headStyle}>TANGGAL</th>
                </tr>
              </thead>
              <tbody>
                {typeof data === "object" ? (
                  data.length !== undefined ? (
                    data.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td style={headStyle}>
                            {i + 1 + 10 * (parseInt(current_page, 10) - 1)}
                          </td>
                          <td style={headStyle}>
                            <button
                              onClick={(e) => this.handleModal(e, i)}
                              className={"btn btn-primary"}
                              style={{ marginRight: "10px" }}
                            >
                              <i className={"fa fa-pencil"} />
                            </button>
                            <button
                              onClick={(e) => this.handleDelete(e, v.id)}
                              className={"btn btn-primary"}
                            >
                              <i className={"fa fa-close"} />
                            </button>
                          </td>
                          <td style={headStyle}>{v.title}</td>
                          <td style={headStyle}>{myDate(v.created_at)}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4} style={headStyle}>
                        <img alt={"-"} src={NOTIF_ALERT.NO_DATA} />
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={4} style={headStyle}>
                      <img alt={"-"} src={NOTIF_ALERT.NO_DATA} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            float: "right",
          }}
        >
          <Paginationq
            current_page={current_page}
            per_page={per_page}
            total={total}
            callback={this.handlePage}
          />
        </div>

        {this.props.isOpen === true ? (
          <FormKategori detail={this.state.detail} />
        ) : null}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.kategoriReducer.isLoading,
    isOpen: state.modalReducer,
    data: state.kategoriReducer.data,
  };
};

export default connect(mapStateToProps)(Kategori);
