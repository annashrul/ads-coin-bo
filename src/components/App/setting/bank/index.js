import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import Paginationq from "helper";
import { NOTIF_ALERT } from "redux/actions/_constants";
import { ModalToggle, ModalType } from "redux/actions/modal.action";
import FormBank from "../../modals/setting/bank.modal";
import * as Swal from "sweetalert2";
import { deleteBankList, getBankList } from "redux/actions/setting/bank.action";
import { myDate } from "../../../../helper";
import { fetchDataBank } from "../../../../redux/actions/setting/bank.action";

class Bank extends Component {
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
      getBankList(`page=1${where !== "" ? `&${where}` : ""}`)
    );
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleValidate() {
    let data = this.state;
    let where = "";
    if (data.any !== null && data.any !== undefined && data.any !== "") {
      where += `q=${data.any}`;
    }
    return where;
  }
  handlePage(pageNumber) {
    let where = this.handleValidate();
    this.props.dispatch(
      getBankList(`page=${pageNumber}${where !== "" ? `&${where}` : ""}`)
    );
  }

  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getBankList(`page=1&${where}`));
  }
  handleModal(e, par) {
    if (par !== "") {
      this.setState({
        detail: {
          id: this.props.data.data[par].id,
          bank_name: this.props.data.data[par].bank_name,
          acc_name: this.props.data.data[par].acc_name,
          acc_no: this.props.data.data[par].acc_no,
          tf_code: this.props.data.data[par].tf_code,
        },
      });
    } else {
      this.setState({
        detail: { id: "" },
      });
    }
    this.props.dispatch(fetchDataBank());
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("formBankPerusahaan"));
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
        this.props.dispatch(deleteBankList(id));
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
      <Layout page={"Bank Perusahaan"}>
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

        <div style={{ overflowX: "auto" }}>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th style={headStyle}>NO</th>
                <th style={headStyle}>#</th>
                <th style={headStyle}>BANK</th>
                <th style={headStyle}>ATAS NAMA</th>
                <th style={headStyle}>NO REKENING</th>
                <th style={headStyle}>KODE BANK</th>
                <th style={headStyle}>TANGGAL DIBUAT</th>
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
                        <td style={headStyle}>{v.bank_name}</td>
                        <td style={headStyle}>{v.acc_name}</td>
                        <td style={headStyle}>{v.acc_no}</td>
                        <td style={headStyle}>{v.tf_code}</td>
                        <td style={headStyle}>{myDate(v.created_at)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} style={headStyle}>
                      <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={7} style={headStyle}>
                    <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
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
          <FormBank data={this.state.detail} />
        ) : null}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.banksReducer.isLoading,
    isOpen: state.modalReducer,
    data: state.banksReducer.data,
  };
};

export default connect(mapStateToProps)(Bank);
