import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import Paginationq, { myDate, statusQ } from "../../../helper";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";
import { ModalToggle, ModalType } from "../../../redux/actions/modal.action";
import FormUserList from "../modals/masterdata/user_list/form_user_list";
import * as Swal from "sweetalert2";
import {
  deleteUserList,
  getUserList,
} from "../../../redux/actions/masterdata/user_list.action";

class IndexUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  componentWillMount() {
    let where = this.handleValidate();
    this.props.dispatch(
      getUserList(`page=1${where !== "" ? `&${where}` : ""}`)
    );
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleValidate() {
    let data = this.state;
    let where = "";
    if (data.any !== null && data.any !== undefined && data.any !== "") {
      where += `&q=${data.any}`;
    }
    return where;
  }

  handlePage(pageNumber) {
    let where = this.handleValidate();
    this.props.dispatch(
      getUserList(`page=${pageNumber}${where !== "" ? `&${where}` : ""}`)
    );
  }

  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getUserList(where));
  }
  handleModal(e, par) {
    if (par !== "") {
      this.setState({
        detail: {
          id: this.props.data.data[par].id,
          name: this.props.data.data[par].name,
          username: this.props.data.data[par].username,
          password: "-",
          conf_password: "-",
          level: this.props.data.data[par].level,
          id_level: this.props.data.data[par].id_level,
          status: this.props.data.data[par].status,
        },
      });
    } else {
      this.setState({
        detail: {
          id: "",
        },
      });
    }
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("formUserList"));
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
        this.props.dispatch(deleteUserList(id));
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
      <Layout page={"Daftar Pengguna"}>
        <div className="row">
          <div className="col-8 col-xs-8 col-md-10">
            <div className="row">
              <div className="col-12 col-xs-12 col-md-5">
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

          <div
            className="col-4 col-xs-4 col-md-2"
            style={{ textAlign: "right" }}
          >
            <div className="form-group">
              <button
                style={{ marginTop: "28px" }}
                type="button"
                className="btn btn-primary"
                onClick={(e) => this.handleSearch(e)}
              >
                <i className="fa fa-search" />
              </button>
              <button
                style={{ marginTop: "28px", marginLeft: "5px" }}
                type="button"
                className="btn btn-primary"
                onClick={(e) => this.handleModal(e, "")}
              >
                <i className="fa fa-plus" />
              </button>
            </div>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th style={headStyle}>NO</th>
                <th style={headStyle}>#</th>
                <th style={headStyle}>NAMA</th>
                <th style={headStyle}>USERNAME</th>
                <th style={headStyle}>AKSES</th>
                <th style={headStyle}>STATUS</th>
                <th style={headStyle}>TANGGAL</th>
              </tr>
            </thead>
            <tbody>
              {typeof data === "object" ? (
                data.length > 0 ? (
                  data.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td style={headStyle}>
                          {i + 1 + 10 * (parseInt(current_page, 10) - 1)}
                        </td>
                        <td style={headStyle}>
                          <button
                            onClick={(e) => this.handleModal(e, i)}
                            type="button"
                            className={"btn btn-primary"}
                            style={{ marginRight: "10px" }}
                          >
                            <i className="fa fa-pencil" />
                          </button>
                          <button
                            onClick={(e) => this.handleDelete(e, v.id)}
                            type="button"
                            className={"btn btn-primary"}
                          >
                            <i className="fa fa-close" />
                          </button>
                        </td>
                        <td style={headStyle}>{v.name}</td>
                        <td style={headStyle}>{v.username}</td>
                        <td style={headStyle}>{v.level}</td>
                        <td style={headStyle}>{statusQ(v.status)}</td>
                        <td style={headStyle}>{myDate(v.created_at)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} style={headStyle}>
                      <img alt={"-"} src={NOTIF_ALERT.NO_DATA} />
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={7} style={headStyle}>
                    <img alt={"-"} src={NOTIF_ALERT.NO_DATA} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div
          style={{ marginTop: "20px", marginBottom: "20px", float: "right" }}
        >
          <Paginationq
            current_page={current_page}
            per_page={per_page}
            total={total}
            callback={this.handlePage}
          />
        </div>
        {this.props.isOpen === true ? (
          <FormUserList detail={this.state.detail} />
        ) : null}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.userListReducer.isLoading,
    isOpen: state.modalReducer,
    data: state.userListReducer.data,
  };
};

export default connect(mapStateToProps)(IndexUserList);
