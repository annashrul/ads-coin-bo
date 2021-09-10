import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import Paginationq, { toCurrency } from "../../../helper";
import moment from "moment";
import { ModalToggle, ModalType } from "../../../redux/actions/modal.action";
import * as Swal from "sweetalert2";
import {
  getPaket,
  deletePaket,
  detailPaket,
  putPaket,
} from "../../../redux/actions/paket/paket.action";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";
import { Button, ButtonToolbar, Dropdown, Icon, IconButton, Rate } from "rsuite";
import DetailPaket from "../modals/paket/detail_paket";
import { getMember } from "../../../redux/actions/masterdata/member.action";
import Select from "react-select";
import { fetchKategori } from "../../../redux/actions/kategori/kategori.action";

moment.locale("id"); // en
const perpage = 9;
class DaftarPaket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      searchBy: "",
      searchByData: [
        { value: "", label: "Cari apa saja" },
        { value: "seller", label: "Penjual" },
        { value: "category", label: "Kategori" },
        { value: "status", label: "Status" },
      ],
      membership: "",
      jenjangKarir: "",
      status: "",
      statusData: [
        { value: "", label: "Semua" },
        { value: 0, label: "Draft" },
        { value: 1, label: "Publikasi" },
      ],
      seller: "",
      sellerData: [
      ],
      category: "",
      categoryData: [
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearchBy = this.handleSearchBy.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleChangeSeller = this.handleChangeSeller.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);

  }

  componentWillMount() {
    this.props.dispatch(getPaket(`page=1&perpage=${perpage}`));
    this.props.dispatch(getMember(1,`&perpage=99999`));
    this.props.dispatch(fetchKategori(`product?perpage=99999`));
  }
  componentDidMount(){
    this.getProps(this.props)
  }
  componentWillReceiveProps(nextProps){
    this.getProps(nextProps)
  }
  getProps(props) {
    if (props.data_member.data !== undefined) {
      if (props.data_member.data.length > 0) {
        let dataSeller = [];
        props.data_member.data.forEach((v, i) => {
          dataSeller.push({ value: v.id, label: v.fullname });
          return;
        });
        this.setState({ sellerData: dataSeller });
      }
    }
    if (props.data_kategori.data !== undefined) {
      if (props.data_kategori.data.length > 0) {
        let dataCategory = [];
        props.data_kategori.data.forEach((v, i) => {
          dataCategory.push({ value: v.id, label: v.title });
          return;
        });
        this.setState({ categoryData: dataCategory });
      }
    }
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSearchBy(val) {
    this.setState({
      searchBy: val.value,
    });
  }

  handleStatus(val) {
    this.setState({ status: val.value });
    let where = this.handleValidate();
    if (val.value !== "") {
      this.props.dispatch(getPaket(`&status=${val.value}&${where}`));
    } else {
      this.props.dispatch(getPaket(`&${where}`));
    }
  }
  handleChangeSeller(val) {
    this.setState({ status: val.value });
    let where = this.handleValidate();
    if (val.value !== "") {
      this.props.dispatch(getPaket(`&id_seller=${val.value}&${where}`));
    } else {
      this.props.dispatch(getPaket(`&${where}`));
    }
  }
  handleChangeCategory(val) {
    this.setState({ status: val.value });
    let where = this.handleValidate();
    if (val.value !== "") {
      this.props.dispatch(getPaket(`&id_category=${val.value}&${where}`));
    } else {
      this.props.dispatch(getPaket(`&${where}`));
    }
  }
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

  handleUpdate(e, val) {
    e.preventDefault();
    Swal.fire({
      title: "Perhatian !!!",
      html: `anda yakin akan akan memblokir produk ini ??`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Oke, Blok`,
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.value) {
        this.props.dispatch(putPaket(val.id, { status: 2 }));
      }
    });
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
        <div className="col-md-10">
          <div className="row">
            <div className="col-6 col-xs-6 col-md-3">
              <div className="form-group">
                <label htmlFor="">Kolom</label>
                <Select
                  options={this.state.searchByData}
                  placeholder="==== Pilih Kolom ===="
                  onChange={this.handleSearchBy}
                  value={this.state.searchByData.find((op) => {
                    return op.value === this.state.searchBy;
                  })}
                />
              </div>
            </div>
            <div
              className="col-6 col-xs-6 col-md-3"
              style={{
                display: this.state.searchBy === "status" ? "block" : "none",
              }}
            >
              <div className="form-group">
                <label>Status</label>

                <Select
                  options={this.state.statusData}
                  placeholder="==== Pilih ===="
                  onChange={this.handleStatus}
                  value={this.state.statusData.find((op) => {
                    return op.value === this.state.status;
                  })}
                />
              </div>
            </div>
            <div
              className="col-6 col-xs-6 col-md-3"
              style={{
                display: this.state.searchBy === "seller" ? "block" : "none",
              }}
            >
              <div className="form-group">
                <label>Penjual</label>

                <Select
                  options={this.state.sellerData}
                  placeholder="==== Pilih ===="
                  onChange={this.handleChangeSeller}
                  value={this.state.sellerData.find((op) => {
                    return op.value === this.state.seller;
                  })}
                />
              </div>
            </div>
            <div
              className="col-6 col-xs-6 col-md-3"
              style={{
                display: this.state.searchBy === "category" ? "block" : "none",
              }}
            >
              <div className="form-group">
                <label>Kategori</label>

                <Select
                  options={this.state.categoryData}
                  placeholder="==== Pilih ===="
                  onChange={this.handleChangeCategory}
                  value={this.state.categoryData.find((op) => {
                    return op.value === this.state.category;
                  })}
                />
              </div>
            </div>
            <div
              className="col-6 col-xs-6 col-md-3"
              style={{
                display: this.state.searchBy === "status" || this.state.searchBy === "seller" || this.state.searchBy === "category" ? "none" : "block",
              }}
            >
              <div className="form-group">
                <label>Tulis Pencarian Disini</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="any"
                  placeholder={"Tulis Pencarian Disini"}
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
        <div className="col-12 col-xs-12 col-md-2 d-flex align-items-end justify-content-end" style={{ textAlign: "right" }}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <Button 
                  size="lg"
                  color="blue"
                  appearance="subtle"
                  className="mr-2" onClick={(e) => this.handleSearch(e)}>
                  <Icon icon="search" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="row">
          {/* <div className="col-8 col-xs-8 col-md-10">
            <div className="row">
              <div className="col-md-5">
                <div className="form-group">
                  <label>Cari</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
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
          <div className="col-4 col-xs-4 col-md-2 d-flex align-items-end justify-content-end">
            <div className="form-group">
              <Button
                size="lg"
                color="blue"
                appearance="subtle"
                className="mr-2" onClick={(e) => this.handleSearch(e)}>
                <Icon icon="search" />
              </Button>
            </div>
          </div> */}
          <br />
            <div className="card mx-3 w-100 rounded-lg">
            <div className="card-columns" style={{columnRule:'solid #e8ebf1', columnRuleWidth:'thin'}}>
              {typeof data === "object" ? (
                data.length > 0 ? (
                  data.map((v, i) => {
                    return (
                  <div className="border border-0 w-100" key={i} style={{display:'inline-block'}}>
                    {/* <div className="chat">
                      <div className="d-flex justify-content-between align-items-center pt-3 pb-2 px-2">
                        <div className="chat-header-text d-flex">
                          <div className="chat-header-thumb">
                            <img src={v.seller_foto} alt="avatar" style={{width:'100px',height:'100px'}}/>
                          </div>
                          <div className="chat-about">
                            <div className="chat-with font-18">{v.seller}</div>
                          </div>
                        </div>
                        <div className="chat-features text-right" style={{width:'-webkit-fill-available'}}>
                            <ButtonToolbar>
                            <Dropdown appearance="default" title="AKSI" size="xs" placement="bottomEnd">
                                <Dropdown.Item onClick={(e)=>this.handleDetail(e,v.id)}>
                                <Icon icon="eye" /> View
                                </Dropdown.Item>
                                <Dropdown.Item onClick={(e)=>this.handleUpdate(e,v)}>
                                <Icon icon="close-circle" /> Blokir
                                </Dropdown.Item>
                            </Dropdown>
                            </ButtonToolbar>
                        </div>
                      </div>
                    </div> */}
                    <div className="px-2">
                      <div className="card shadow-none bg-light rounded-lg">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="w-75">
                              {v.status===1?<span className="text-success font-12">[DIPUBLIKASI]</span>:v.status===0?<span className="text-danger font-12">[DRAFT]</span>:v.status===2?<span className="text-danger font-12">[DIBLOKIR]</span>:''}&nbsp;
                              <strong className="font-20 mb-0">{v.title}</strong>
                            </div>
                            <div>
                              <ButtonToolbar>
                              <Dropdown 
                                renderTitle={() => {
                                  return <IconButton appearance="default" icon={<Icon icon="ellipsis-v" size="2x" />} />;
                                }}>
                                  <Dropdown.Item onClick={(e)=>this.handleDetail(e,v.id)}>
                                  <Icon icon="eye" /> View
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={(e)=>this.handleUpdate(e,v)}>
                                  <Icon icon="close-circle" /> Blokir
                                  </Dropdown.Item>
                              </Dropdown>
                              </ButtonToolbar>
                            </div>
                          </div>
                          <div className="text-right mb-2">
                          <small className="fort-12 text-dark text-right">Oleh : <strong>{v.seller}</strong></small>
                          </div>

                          <p className="m-0 p-0">{v.preview}</p>
                          
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="">#{v.category}</p>
                            <Rate defaultValue={v.rating} allowHalf readOnly />
                          </div>
                            <hr className="m-0 p-0"/>
                          <div className="d-flex justify-content-between align-items-center">
                          <p className="m-0 p-0">Harga {toCurrency(parseFloat(v.price))}</p>
                            <p className="">{v.terjual}x terjual</p>
                          </div>
                        </div>
                      </div>
                    </div>
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
    data_member: state.memberReducer,
    data_kategori: state.kategoriReducer,
    res: state.paketReducer,
  };
};

export default connect(mapStateToProps)(DaftarPaket);
