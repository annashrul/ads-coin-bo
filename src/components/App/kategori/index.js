import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import Paginationq, { myDate, statusQ } from "../../../helper";
import moment from "moment";

import { ModalToggle, ModalType } from "../../../redux/actions/modal.action";
import FormKategori from "../modals/kategori/form_kategori";
import * as Swal from "sweetalert2";
import {
  deleteKategori,
  fetchKategori,
} from "../../../redux/actions/kategori/kategori.action";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";
import { Button, Icon } from "rsuite";
import Default from "assets/default.png";
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
    if (this.props.location.pathname.split("/")[1] === "produk") {
      newParam = "product";
      newParamType = 0;
      newPath = "Produk";
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
          id: this.props.res.data[par].id,
          title: this.props.res.data[par].title,
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
    const { data } = this.props.res;
    const { total, per_page, current_page } = this.props.res.meta;

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
                    className="form-control form-control-lg"
                    name="any"
                    maxLength="200"
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
          <div className="col-4 col-xs-4 col-md-2  d-flex align-items-end justify-content-end">
            <div className="form-group">
              <Button 
                size="lg"
                color="cyan"
                appearance="subtle"
                className="" onClick={(e) => this.handleModal(e, "")}>
                <Icon icon="plus" />
              </Button>
            </div>
          </div>
          <br />
        </div>

        <div className="col-md-12">
          <div style={{ overflowX: "auto" }}>
            <table className="table table-hover  table-noborder">
              <thead>
                <tr>
                  <th style={headStyle}>NO</th>
                  <th style={headStyle}>#</th>
                  <th style={headStyle}>IKON</th>
                  <th style={headStyle}>NAMA</th>
                  <th style={headStyle}>TANGGAL</th>
                  <th style={headStyle}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {typeof data === "object" ? (
                  data.length !== undefined ? (
                    data.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td style={{...headStyle, width:'1%'}}>
                            {i + 1 + 10 * (parseInt(current_page, 10) - 1)}
                          </td>
                          <td style={{...headStyle, width:'1%'}}>
                            <Button
                              size="sm"
                              color="green"
                              appearance="subtle"
                              className="mr-1" onClick={(e) => this.handleModal(e, i)}>
                              <Icon icon="edit2" />
                            </Button>
                            <Button 
                              size="sm"
                              color="red"
                              appearance="subtle"
                              className="" onClick={(e) => this.handleDelete(e, v.id)}>
                              <Icon icon="trash" />
                            </Button>
                          </td>
                          <td style={{...headStyle, width:'1%'}}><img src={v.icon} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} alt="img"/></td>
                          <td style={headStyle}>{v.title}</td>
                          <td style={headStyle}>{myDate(v.created_at)}</td>
                          <td style={{...headStyle, width:'1%'}}>{statusQ(v.status)}</td>
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
    res: state.kategoriReducer,
  };
};

export default connect(mapStateToProps)(Kategori);
