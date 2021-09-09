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
  detailPaket,
} from "../../../redux/actions/paket/paket.action";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";
import { ButtonToolbar, Dropdown, Icon, Rate } from "rsuite";
import DetailPaket from "../modals/paket/detail_paket";

moment.locale("id"); // en
const perpage = 9;
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
  handleDetail(e, id) {
    e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("detailPaket"));
    this.props.dispatch(detailPaket(id));
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
            <div className="card mx-3 w-100 rounded-lg">
            <div className="card-columns" style={{columnRule:'solid #e8ebf1', columnRuleWidth:'thin'}}>
              {typeof data === "object" ? (
                data.length > 0 ? (
                  data.map((v, i) => {
                    return (
                  <div className="border border-0 w-100" key={i} style={{display:'inline-block'}}>
                          <div className="chat">
                            <div className="d-flex justify-content-between align-items-center pt-3 pb-2 px-2">
                              <div className="chat-header-text d-flex">
                                <div className="chat-header-thumb">
                                  <img src={v.seller_foto} alt="avatar" style={{width:'100px'}}/>
                                </div>
                                <div className="chat-about">
                                  <div className="chat-with font-18">{v.seller}</div>
                                  {/* <div className="chat-num-messages font-14">{v.seller_bio}</div> */}
                                </div>
                              </div>
                              <div className="chat-features text-right" style={{width:'-webkit-fill-available'}}>
                                {/* <Rate defaultValue={v.rating} allowHalf readOnly /> */}
                                  <ButtonToolbar>
                                  <Dropdown appearance="default" title="AKSI" size="xs" placement="bottomEnd">
                                      <Dropdown.Item onClick={(e)=>this.handleDetail(e,v.id)}>
                                      <Icon icon="eye" /> View
                                      </Dropdown.Item>
                                      {/* <Dropdown.Item onClick={(e)=>this.handleEdit(e,v)}>
                                      <Icon icon="edit2" /> Edit
                                      </Dropdown.Item> */}
                                      <Dropdown.Item onClick={(e)=>this.handleDelete(e,v.id)}>
                                      <Icon icon="trash" /> Delete
                                      </Dropdown.Item>
                                  </Dropdown>
                                  </ButtonToolbar>
                              </div>
                            </div>
                          </div>
                          <div className="px-2">
                            <div className="card shadow-none bg-light rounded-lg">
                              <div className="card-body">
                                {v.status===1?<span className="text-success font-24">●</span>:<span className="text-danger font-24">●</span>}&nbsp;
                                <strong className="font-20 mb-0">{v.title}</strong>
                                <p className="m-0 p-0">{v.preview}</p>
                                
                                <div className="d-flex justify-content-between align-items-center">
                                  <p className="">#{v.category}</p>
                                  <Rate defaultValue={v.rating} allowHalf readOnly />
                                </div>
                                  <hr className="m-0 p-0"/>
                                <div className="d-flex justify-content-between align-items-center">
                                <p className="m-0 p-0">Harga {v.price} COIN</p>
                                  <p className="">{v.terjual}x terjual</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="px-2">
                            <div className="card shadow-none bg-light rounded-lg">
                              <div className="card-body">
                                <p className="m-0 p-0">Harga : {v.price}</p>
                                
                                <div className="d-flex justify-content-between align-items-center">
                                  <p className="">Terjual : {v.terjual}</p>
                                  {v.status===1?<span className="text-success font-24">●</span>:<span className="text-danger font-24">●</span>}
                                </div>
                              </div>
                            </div>
                          </div> */}

                        {/* <div className="box-margin">
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
                        </div> */}
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
        </div>
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
          <DetailPaket />
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
