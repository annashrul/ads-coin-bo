import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import Paginationq, { myDate, rmHtml, toCurrency } from "../../../helper";
import moment from "moment";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import { ModalToggle, ModalType } from "../../../redux/actions/modal.action";
import FormPaket from "../modals/paket/form_paket";
import * as Swal from "sweetalert2";
import {
  getPaket,
  deletePaket,
} from "../../../redux/actions/paket/paket.action";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";

moment.locale("id"); // en
const perpage = 3;
class DaftarPaket extends Component {
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
  }

  componentWillMount() {
    this.props.dispatch(getPaket(`page=1&perpage=${perpage}`));
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleValidate() {
    let where = `perpage=${perpage}`;
    let page = localStorage.getItem("pagePaket");
    let any = this.state.any;

    if (page !== null && page !== undefined && page !== "") {
      where += `&page=${page}`;
    } else {
      where += "&page=1";
    }
    if (any !== null && any !== undefined && any !== "") {
      where += `&q=${any}`;
    }
    return where;
  }

  handlePage(pageNumber) {
    localStorage.setItem("pagePaket", pageNumber);
    let where = this.handleValidate();
    this.props.dispatch(getPaket(where));
  }
  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getPaket(where));
  }
  handleModal(e, par) {
    if (par !== "") {
      this.setState({
        detail: {
          id: this.props.res.data[par].id,
          title: this.props.res.data[par].title,
          price: this.props.res.data[par].price,
          pin_required: this.props.res.data[par].pin_required,
          caption: this.props.res.data[par].caption,
          category: this.props.res.data[par].category,
          id_category: this.props.res.data[par].id_category,
          gambar: this.props.res.data[par].gambar,
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
    this.props.dispatch(ModalType("formPaket"));
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
        this.props.dispatch(deletePaket(id));
      }
    });
  }

  render() {
    const { data } = this.props.res;
    const { total, per_page, current_page } = this.props.res.meta;

    return (
      <Layout page={"Daftar Paket"}>
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
              {/* <button
                style={{ marginTop: "27px", marginLeft: "5px" }}
                type="button"
                className="btn btn-primary"
                onClick={(e) => this.handleModal(e, "")}
              >
                <i className="fa fa-plus" />
              </button> */}
            </div>
          </div>
          <br />
              {typeof data === "object" ? (
                data.length > 0 ? (
                  data.map((v, i) => {
                    return (
                  <div className="col-md-4">
                    <main>
                      <article key={i}>
                        <div className="box-margin">
                          <div
                            className="coupon"
                            style={{
                              borderRadius: "15px",
                              margin: "0 auto",
                              breakInside: "avoid-column",
                            }}
                          >
                            <div className="ribbon-wrapper ">
                              <div className="ribbon ribbon-bookmark ribbon-success">
                                {v.seller}
                              </div>
                              <img
                                src={`${v.image}`}
                                style={{ width: "100%" }}
                                alt="member"
                              />
                              <br />
                              <div className="row">
                                <div
                                  className="col-md-12 text-muted"
                                  style={{ padding: "5" }}
                                >
                                  <br />
                                  <p className="text-muted">
                                    {myDate(v.created_at)}
                                  </p>
                                  <h4 className="text-dark">{v.title}</h4>
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th
                                          style={{ padding: "0" }}
                                          className="text-dark"
                                        >
                                          Rating
                                        </th>
                                        <th
                                          style={{ padding: "0" }}
                                          className="text-dark"
                                        >
                                          :
                                        </th>
                                        <th
                                          style={{ padding: "0" }}
                                          className="text-dark"
                                        >
                                          {v.rating} Stars
                                        </th>
                                      </tr>
                                      <tr>
                                        <th
                                          style={{ padding: "0" }}
                                          className="text-dark"
                                        >
                                          Coin
                                        </th>
                                        <th
                                          style={{ padding: "0" }}
                                          className="text-dark"
                                        >
                                          :
                                        </th>
                                        <th
                                          style={{ padding: "0" }}
                                          className="poin"
                                        >
                                          {toCurrency(v.price)}
                                        </th>
                                      </tr>
                                    </thead>
                                  </table>
                                  <p className="text-muted">
                                    Seller Bio : {(v.seller_bio)}
                                  </p>
                                </div>
                                <div className="col-md-12">
                                  <div
                                    className="btn-group btn-block"
                                    style={{ textAlign: "right" }}
                                  >
                                    <UncontrolledButtonDropdown nav>
                                      <DropdownToggle
                                        caret
                                        className="myDropdown"
                                      >
                                        Pilihan
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        {/* <DropdownItem
                                          onClick={(e) =>
                                            this.handleModal(e, i)
                                          }
                                        >
                                          Ubah
                                        </DropdownItem> */}
                                        <DropdownItem
                                          onClick={(e) =>
                                            this.handleDelete(e, v.id)
                                          }
                                        >
                                          Hapus
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </main>
                  </div>
                    );
                  })
                ) : (
                  <div>
                    <img alt='{"-"}' src={`${NOTIF_ALERT.NO_DATA}`} />
                  </div>
                )
              ) : (
                <div>
                  <img alt='{"-"}' src={`${NOTIF_ALERT.NO_DATA}`} />
                </div>
              )}
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
          <FormPaket detail={this.state.detail} />
        ) : null}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.paketReducer.isLoading,
    isOpen: state.modalReducer,
    data: state.paketReducer.data,
    res: state.paketReducer,
  };
};

export default connect(mapStateToProps)(DaftarPaket);
