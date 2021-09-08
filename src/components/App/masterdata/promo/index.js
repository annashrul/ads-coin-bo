import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../../../../components/Layout";
import Paginationq, { statusQ, ToastQ, toCurrency, toRp } from "../../../../helper";
import { NOTIF_ALERT } from "../../../../redux/actions/_constants";
import { ModalToggle, ModalType } from "../../../../redux/actions/modal.action";
import moment from "moment";
import { deletePromo, detailPromo, getPromo, putPromo } from "../../../../redux/actions/masterdata/promo.action";
import { fetchKategori } from "../../../../redux/actions/kategori/kategori.action";
import { getExcelPromo } from "../../../../redux/actions/masterdata/promo.action";
import { toExcel } from "../../../../helper";
import { getDetailBank, setShowModal } from "../../../../redux/actions/masterdata/bank.action";
import * as Swal from "sweetalert2";
import Select from "react-select";
import { Button, ButtonToolbar, Icon } from 'rsuite';
import FormPromo from "../../modals/masterdata/promo/form_promo";
import DetailPromo from "../../modals/masterdata/promo/detail_promo";

import Default from "assets/default.png";
class IndexPromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      isLoading: false,
      dateFrom: moment(new Date()).format("yyyy-MM-DD"),
      dateTo: moment(new Date()).format("yyyy-MM-DD"),
      searchBy: "title",
      searchByData: [
        { value: "title", label: "Judul" },
        { value: "deskripsi", label: "Deskripsi" },
      ],
      promoship: "",
      jenjangKarir: "",
      status: "",
      statusData: [
        { value: "", label: "Semua" },
        { value: 0, label: "Tidak Aktif" },
        { value: 1, label: "Aktif" },
      ],
      isModalInvest: false,
    };
    this.handleEvent = this.handleEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchBy = this.handleSearchBy.bind(this);
    this.printDocumentXLsx = this.printDocumentXLsx.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
  }

  componentWillUnmount() {
    this.setState({ isModalInvest: false });
    this.props.dispatch(setShowModal(false));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataExcel.data !== this.props.dataExcel.data) {
      this.getExcel(this.props);
    }
  }
  componentWillMount() {
    localStorage.removeItem("isAlamat");
    localStorage.removeItem("isBank");
    localStorage.removeItem("isDetail");
    this.props.dispatch(getPromo(1));
    this.props.dispatch(fetchKategori(`promoship`));
  }
  getExcel(props) {
    if (props.dataExcel.data !== undefined) {
      if (props.dataExcel.data.length > 0) {
        this.setState({ isLoading: false });

        let stts = this.state.status;
        let content = [];
        let totSaldo = 0;
        let totSposor = 0;
        let totPin = 0;
        let totPayment = 0;
        let totSlotActive = 0;
        let totModal = 0;
        let totOmset = 0;

        props.dataExcel.data.forEach((v, i) => {
          let newSaldo = parseFloat(v.saldo);
          let newSponsor = parseFloat(v.sponsor);
          let newPin = parseFloat(v.pin);
          let newPayment = parseFloat(v.total_payment);
          let newSlotActive = parseFloat(v.slot_active);
          let newModal = parseFloat(v.total_modal);
          let newOmset = parseFloat(v.omset);

          totSaldo += newSaldo;
          totSposor += newSponsor;
          totPin += newPin;
          totPayment += newPayment;
          totSlotActive += newSlotActive;
          totModal += newModal;
          totOmset += newOmset;

          content.push([v.fullname, v.referral, v.mobile_no, newSaldo, newSponsor, newPin, newPayment, newSlotActive, newModal, newOmset, v.status === 0 ? "Tidak Aktif" : "Aktif"]);
        });
        toExcel(
          `LAPORAN MEMBER ${stts === 0 ? "Tidak Aktif" : stts === 1 ? "Aktif" : ""}`,
          `SEMUA PERIODE`,
          ["NAMA", "REFERRAL", "NO.TELEPON", "SALDO ( COIN )", "SPONSOR", "TIKET", "PENARIKAN ( COIN )", "SLOT AKTIF", "MODAL ( COIN )", "OMSET ( COIN )", "STATUS"],
          content,
          [[""], [""], ["TOTAL", "", "", totSaldo, totSposor, totPin, totPayment, totSlotActive, totModal, totOmset]]
        );
      }
    }
  }
  printDocumentXLsx(e, param) {
    e.preventDefault();
    this.setState({ isLoading: true });
    let where = this.handleValidate();
    if (this.state.status !== "") {
      this.props.dispatch(getExcelPromo(`status=${this.state.status}&perpage=${param}&${where}`));
    } else {
      this.props.dispatch(getExcelPromo(`perpage=${param}&${where}`));
    }
  }
  handleSearchBy(val) {
    this.setState({
      searchBy: val.value,
    });
  }
  handleStatus(val) {
    this.setState({ status: val.value });
    let where = this.handleValidate();
    // console.log(where);
    if (val.value !== "") {
      this.props.dispatch(getPromo(1, `&status=${val.value}&${where}`));
    } else {
      this.props.dispatch(getPromo(1, `&${where}`));
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleValidate() {
    let any = this.state.any;
    let searchBy = this.state.searchBy;
    let where = `searchby=${searchBy}`;
    if (any !== null && any !== undefined && any !== "") {
      where += `&q=${any}`;
      this.setState({ any: "" });
    }

    return where;
  }
  handlePage(pageNumber) {
    localStorage.setItem("pagePromo", pageNumber);
    let where = this.handleValidate();
    this.props.dispatch(getPromo(pageNumber, where));
  }
  handleEvent = (event, picker) => {
    const from = moment(picker.startDate._d).format("YYYY-MM-DD");
    const to = moment(picker.endDate._d).format("YYYY-MM-DD");
    this.setState({
      dateFrom: from,
      dateTo: to,
    });
  };
  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getPromo(1, where));
  }
  handleUpdate(e, val) {
    e.preventDefault();
    Swal.fire({
      title: "Perhatian !!!",
      html: `anda yakin akan ${val.status === 1 ? "Menonaktifkan" : "Mengaktifkan"} ${val.fullname} ??`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Oke, ${val.status === 1 ? "Nonaktifkan" : "Aktifkan"}`,
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.value) {
        this.props.dispatch(putPromo({ status: val.status === 0 ? "1" : "0" }, val.id));
      }
    });
  }

  handleModal(e, par) {
    if (par !== "") {
      this.setState({
        detail: {
          id: this.props.data.data[par].id,
          title: this.props.data.data[par].title,
          deskripsi: this.props.data.data[par].deskripsi,
          type: this.props.data.data[par].type,
          nominal: this.props.data.data[par].nominal,
          kelipatan: this.props.data.data[par].kelipatan,
          periode_start: this.props.data.data[par].periode_start,
          periode_end: this.props.data.data[par].periode_end,
          max_user_uses: this.props.data.data[par].max_user_uses,
          max_uses: this.props.data.data[par].max_uses,
          image: "-",
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
    this.props.dispatch(ModalType("formPromo"));
  }
  handleStatusUpdate(e, val) {
    e.preventDefault();
    Swal.fire({
      title: "Perhatian !!!",
      html: `anda yakin akan ${val.status === 1 ? "Menonaktifkan Promo" : "Mengaktifkan Promo"} \"${val.title}\" ??`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Oke, ${val.status === 1 ? "Nonaktifkan" : "Aktifkan"}`,
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.value) {
        this.props.dispatch(putPromo({ status: val.status === 0 ? "1" : "0" }, val.id));
      }
    });
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
        this.props.dispatch(deletePromo(id));
      }
    });
  }
  handleDetail(e, id) {
    e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("detailPromo"));
    this.props.dispatch(detailPromo(id));
  }
  render() {

    
    const headStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
    };
    const numberStyle = {
      verticalAlign: "middle",
      textAlign: "right",
      whiteSpace: "nowrap",
    };
    const columnStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
      color: "#888888",
    };

    const cusStyle = {
      verticalAlign: "middle",
      textAlign: "left",
      whiteSpace: "nowrap",
    };
    const { data } = this.props.data;
    const { last_page, total, per_page, current_page } = this.props.data.meta;

    let totSaldo = 0;
    let totPayment = 0;
    return (
      <Layout page={"Promo"}>
        <div className="row">
          <div className="col-md-10">
            <div className="row">
              <div className="col-6 col-xs-6 col-md-3">
                <div className="form-group">
                  <label htmlFor="">Kolom</label>
                  <Select
                    options={this.state.searchByData}
                    placeholder="==== Pilih Kategori ===="
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
                  display: this.state.searchBy === "status" ? "none" : "block",
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
                  {/* <button style={{ marginTop: "28px", marginRight: "5px" }} className="btn btn-primary" onClick={this.handleSearch}>
                    <i className="fa fa-search" />
                  </button>
                  <button style={{ marginTop: "28px" }} className="btn btn-primary" onClick={(e) => this.printDocumentXLsx(e, per_page * last_page)}>
                    <i className="fa fa-print" />
                  </button> */}
                  <Button 
                    size="lg"
                    color="blue"
                    appearance="subtle"
                    className="mr-2" onClick={(e) => this.handleSearch(e)}>
                    <Icon icon="search" />
                  </Button>
                  <Button 
                    size="lg"
                    color="cyan"
                    appearance="subtle"
                    className="" onClick={(e) => this.handleModal(e, '')}>
                    <Icon icon="plus" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div style={{ overflowX: "auto" }}>
          <table className="table table-hover table-noborder">
            <thead>
              <tr>
                <th rowSpan="2" style={{...headStyle, width:'1%'}}>
                  NO
                </th>
                <th rowSpan="2" style={{...headStyle, width:'1%'}}>
                  #
                </th>
                <th rowSpan="2" colSpan="2" style={{...headStyle, width:'1%'}}>
                  PROMO
                </th>
                <th rowSpan="2" style={{...headStyle, width:'1%'}}>
                  KETENTUAN PENGGUNAAN
                </th>
                <th rowSpan="2" style={{...headStyle, width:'1%'}}>
                  PERIODE
                </th>
                <th rowSpan="2" style={{...headStyle, width:'1%'}}>
                  TIPE
                </th>
                <th rowSpan="2" style={{...headStyle, width:'1%'}}>
                  NOMINAL
                </th>
                <th rowSpan="2" style={{...headStyle, width:'1%'}}>
                  MIN TRX
                </th>
                <th rowSpan="2" style={{...headStyle, width:'1%'}}>
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {typeof data === "object" ? (
                data.length > 0 ? (
                  data.map((v, i) => {
                    totSaldo += parseFloat(v.saldo);
                    totPayment += parseFloat(v.total_payment);
                    
                    let status = "";
                    if (v.status === 0) {
                      status = (
                        <span className={"badge badge-warning"}>Tidak Aktif</span>
                      );
                    }
                    if (v.status === 1) {
                      status = (
                        <span className={"badge badge-success"}>Aktif</span>
                      );
                    }
                    
                    let type = "";
                    if (v.type === 0) {
                      type = (
                        <span className={"badge badge-warning"}>Bonus</span>
                      );
                    }
                    if (v.type === 1) {
                      type = (
                        <span className={"badge badge-success"}>Konversi</span>
                      );
                    }

                    return (
                      <tr key={i}>
                        <td style={{...columnStyle, width:'1%'}}>
                          {i + 1 + 10 * (parseInt(current_page, 10) - 1)}
                        </td>
                        <td style={{...cusStyle, width:'1%'}}>
                          <ButtonToolbar>
                            <Button
                              color="green"
                              onClick={(e) => this.handleDetail(e, v.id)}
                              appearance="subtle"
                              size="sm"
                              >
                              <Icon icon="eye" />
                            </Button>
                            {/* <span style={{ padding: 2 }}>|</span> */}
                            <Button
                              color="blue"
                              onClick={(e) => this.handleModal(e, i)}
                              appearance="subtle"
                              size="sm"
                              >
                              <Icon icon="edit" />
                            </Button>
                            {/* <span style={{ padding: 2 }}>|</span> */}
                            <Button
                              color="red"
                              onClick={(e) => this.handleDelete(e, v.id)}
                              appearance="subtle"
                              size="sm"
                              >
                              <Icon icon="trash" />
                            </Button>
                            {v.status===0?
                            <Button
                              color="orange"
                              onClick={(e) => this.handleStatusUpdate(e, v)}
                              appearance="subtle"
                              size="sm"
                              >
                              <Icon icon="toggle-on" />
                            </Button>:''}
                          </ButtonToolbar>
                        </td>
                        <td style={cusStyle}>
                          <img
                            src={v.image}
                            alt=""
                            onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} 
                            style={{ height: "50px", width: "100px", maxWidth:'unset' }}
                          />
                        </td>
                        <td style={cusStyle}>
                          <p className="text-left text-dark">
                            {v.title}
                            <br />
                            <small className="txtGreen">
                              Deskripsi : <b>{String(v.deskripsi).substr(0,75)}...</b>
                            </small>
                          </p>
                        </td>
                        <td style={cusStyle}>
                          Maks. Pemakaian : <strong className="text-dark">{v.max_uses}</strong>
                          <br />
                          Maks. Pemakaian per Pengguna : <strong className="text-dark">{v.max_user_uses}</strong>
                        </td>
                        <td style={cusStyle}>
                          Periode Awal : <strong className="text-dark">{moment(v.periode_start).format('LL')}</strong>
                          <br />
                          Periode Akhir : <strong className="text-dark">{moment(v.periode_end).format('LL')}</strong>
                        </td>
                        <td style={cusStyle}>{type}</td>
                        <td style={{...cusStyle, width:'1%'}}>{v.type===1?'Rp. ':''}{v.nominal}{v.type===0?' Coin':''}</td>
                        <td style={{...cusStyle, width:'1%'}}>{v.type===0?v.kelipatan:''}</td>
                        <td style={{...cusStyle, width:'1%'}}>{status}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={19} style={headStyle}>
                      <img alt={"-"} src={NOTIF_ALERT.NO_DATA} />
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={19} style={headStyle}>
                    <img alt={"-"} src={NOTIF_ALERT.NO_DATA} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            float: "right",
          }}
        >
          <Paginationq current_page={current_page} per_page={per_page} total={total} callback={this.handlePage} />
        </div>

        {this.props.isOpen === true ? (
          <FormPromo detail={this.state.detail} />
        ) : null}
        <DetailPromo/>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state.promoReducer",state.promoReducer);
  return {
    isOpen: state.modalReducer,

    isLoading: state.promoReducer.isLoading,
    data: state.promoReducer,

    loading: state.promoReducer.isLoadingExcel,
    dataExcel: state.promoReducer.excel,

  };
};

export default connect(mapStateToProps)(IndexPromo);
