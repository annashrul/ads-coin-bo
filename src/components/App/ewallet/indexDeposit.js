import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import { DateRangePicker } from "react-bootstrap-daterangepicker";
import Paginationq, { rangeDate, toCurrency, myDate, toExcel, toRp } from "../../../helper";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";
import { ModalToggle, ModalType } from "../../../redux/actions/modal.action";
import moment from "moment";
import { getDeposit, getExcelDeposit, postDeposit } from "../../../redux/actions/ewallet/deposit.action";
import * as Swal from "sweetalert2";
import Select from "react-select";
import { Button, Icon } from "rsuite";

class IndexDeposit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      dateFrom: moment(new Date()).format("yyyy-MM-DD"),
      dateTo: moment(new Date()).format("yyyy-MM-DD"),
      kolom_data: [
        { value: "kd_trx", label: "kode transaksi" },
        { value: "fullname", label: "nama" },
        { value: "status", label: "status" },
      ],
      kolom: "fullname",
      status_data: [
        { value: "", label: "semua status" },
        { value: "0", label: "pending" },
        { value: "1", label: "sukses" },
        { value: "2", label: "gagal" },
      ],
      status: "",
      data: [],
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleChangeKolom = this.handleChangeKolom.bind(this);
    this.handlePaymentSlip = this.handlePaymentSlip.bind(this);
    this.handleApproval = this.handleApproval.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  componentWillMount() {
    let where = this.handleValidate();
    this.props.dispatch(getDeposit(`page=1&${where}`));
  }
  handleValidate() {
    let where = "";
    let data = this.state;
    if (data.dateFrom !== null && data.dateFrom !== undefined && data.dateFrom !== "") {
      where += `&datefrom=${data.dateFrom}&dateto=${data.dateTo}`;
    }
    if (data.kolom !== null && data.kolom !== undefined && data.kolom !== "") {
      where += `&searchby=${data.kolom}`;
    }
    if (data.any !== null && data.any !== undefined && data.any !== "") {
      where += `&q=${btoa(data.any)}`;
    }
    return where;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataExcel !== this.props.dataExcel) {
      this.getExcel(this.props);
    }
  }
  getExcel(props) {
    if (props.dataExcel !== undefined) {
      if (props.dataExcel.length > 0) {
        let content = [];
        let total_amount = 0;
        let total_amount_rupiah = 0;
        props.dataExcel.forEach((v) => {
          total_amount += parseFloat(v.amount);
          total_amount_rupiah += parseFloat(v.amount_rupiah);
          let status = "";
          if (v.status === 0) {
            status = "Pending";
          }
          if (v.status === 1) {
            status = "Sukses";
          }
          if (v.status === 2) {
            status = "Gagal";
          }
          content.push([
            v.kd_trx,
            v.fullname,
            v.bank_name+` ${v.acc_no==='0'?'':`(${v.acc_no})`}`+` #`+v.acc_name,
            toCurrency(`${v.amount}`),
            `Rp ${toRp(v.amount_rupiah)} .-`,
            v.unique_code,
            status,
            myDate(v.created_at),
            
          ]);
        });
        toExcel(
          "LAPORAN DEPOSIT",
          `${this.state.dateFrom} - ${this.state.dateTo}`,
          [
            "KODE TRANSAKSI",
            "NAMA",
            "BANK TUJUAN",
            "JUMLAH COIN",
            "JUMLAH RUPIAH",
            "KODE UNIK",
            "STATUS",
            "TANGGAL DIBUAT",
            
          ],
          content,
          [[""], [""], ["TOTAL", "", "", toCurrency(total_amount), `Rp. ${toRp(total_amount_rupiah)} ,-`]]
        );
      }
    }
  }
  printDocumentXLsx = (e, param) => {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getExcelDeposit(`page=1&perpage=${param}&${where}`));
  };
  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getDeposit(`page=1&${where}`));
  }
  handlePage(num) {
    let where = this.handleValidate();
    this.props.dispatch(getDeposit(`page=${num}&${where}`));
  }
  handleChangeKolom(val) {
    this.setState({ kolom: val.value });
  }
  handleChangeStatus(val) {
    this.setState({ status: val.value });
    let where = this.handleValidate();
    if (val.value !== "") {
      this.props.dispatch(getDeposit(`page=1&status=${val.value}${where}`));
    } else {
      this.props.dispatch(getDeposit(`page=1${where}`));
    }

    // console.log(where)
  }
  handleModal(e, kode) {
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("formPenarikanBonus"));
    this.setState({ detail: { kode: kode } });
  }
  handleEvent = (event, picker) => {
    event.preventDefault();
    const from = moment(picker.startDate._d).format("YYYY-MM-DD");
    const to = moment(picker.endDate._d).format("YYYY-MM-DD");
    this.setState({
      dateFrom: from,
      dateTo: to,
    });
    if (this.state.status !== "") {
      this.props.dispatch(getDeposit(`page=1&datefrom=${from}&dateto=${to}&status=${this.state.status}`));
    } else {
      this.props.dispatch(getDeposit(`page=1&datefrom=${from}&dateto=${to}`));
    }
  };
  handlePaymentSlip(e, param) {
    e.preventDefault();
    Swal.fire({
      title: "Bukti Transfer",
      text: this.props.res.data[param].fullname,
      imageUrl: this.props.res.data[param].payment_slip,
      imageAlt: "gambar tidak tersedia",
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
    });
  }
  handleApproval(e, id, status) {
    e.preventDefault();
    Swal.fire({
      title: "Perhatian !!!",
      text: `anda yakin akan ${status === 1 ? "menerima" : "membatalkan"} deposit ini ??`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Oke, ${status === 1 ? "terima" : "batalkan"} sekarang!`,
      cancelButtonText: "keluar",
    }).then((result) => {
      if (result.value) {
        let parsedata = { status: status };
        this.props.dispatch(postDeposit(parsedata, btoa(id)));
      }
    });
  }

  render() {
    const columnStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
    };
    const numStyle = {
      verticalAlign: "middle",
      textAlign: "right",
      whiteSpace: "nowrap",
    };
    const strStyle = {
      verticalAlign: "middle",
      textAlign: "left",
      whiteSpace: "nowrap",
    };
    let totAmountPoint = 0;
    let totAmountRp = 0;
    const { data } = this.props.res;
    const { total, per_page, last_page, current_page } = this.props.res.meta;
    return (
      <Layout page={"Laporan Deposit"}>
        <div className="row">
          <div className="col-12 col-xs-12 col-md-10">
            <div className="row">
              <div className="col-6 col-xs-6 col-md-3">
                <div className="form-group">
                  <label>Periode </label>
                  <DateRangePicker autoUpdateInput={true} showDropdowns={true} style={{ display: "unset" }} ranges={rangeDate} alwaysShowCalendars={true} onApply={this.handleEvent}>
                    <input type="text" readOnly={true} className="form-control form-control-lg" value={`${this.state.dateFrom} to ${this.state.dateTo}`} />
                  </DateRangePicker>
                </div>
              </div>
              <div className="col-6 col-xs-6 col-md-3">
                <div className="form-group">
                  <label>Kolom</label>
                  <Select
                    options={this.state.kolom_data}
                    placeholder="Pilih Kolom"
                    onChange={this.handleChangeKolom}
                    value={this.state.kolom_data.find((op) => {
                      return op.value === this.state.kolom;
                    })}
                  />
                </div>
              </div>
              <div
                className="col-12 col-xs-12 col-md-3"
                style={{
                  display: this.state.kolom === "status" ? "block" : "none",
                }}
              >
                <div className="form-group">
                  <label>Status</label>
                  <Select
                    options={this.state.status_data}
                    placeholder="Pilih Kolom"
                    onChange={this.handleChangeStatus}
                    value={this.state.status_data.find((op) => {
                      return op.value === this.state.status;
                    })}
                  />
                </div>
              </div>
              <div
                className="col-12 col-xs-12 col-md-3"
                style={{
                  display: this.state.kolom !== "status" ? "block" : "none",
                }}
              >
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
          <div className="col-12 col-xs-12 col-md-2 d-flex align-items-end justify-content-end" style={{ textAlign: "right" }}>
            <div className="form-group">
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
                className="" onClick={(e) => this.printDocumentXLsx(e, per_page * last_page)}>
                <Icon icon="print" />
              </Button>
            </div>
          </div>
        </div>
        <br />
        <div style={{ overflowX: "auto" }}>
          <table className="table table-hover  table-noborder">
            <thead>
              <tr>
                <th rowSpan="2" style={columnStyle}>
                  NO
                </th>
                <th rowSpan="2" style={columnStyle}>
                  #
                </th>
                <th rowSpan="2" style={columnStyle}>
                  KODE TRANSAKSI
                </th>
                <th rowSpan="2" style={columnStyle}>
                  NAMA
                </th>
                <th rowSpan="2" style={columnStyle}>
                  BANK TUJUAN
                </th>
                <th colSpan="2" style={columnStyle}>
                  JUMLAH
                </th>
                <th rowSpan="2" style={columnStyle}>
                  KODE UNIK
                </th>
                <th rowSpan="2" style={columnStyle}>
                  STATUS
                </th>
                <th rowSpan="2" style={columnStyle}>
                  TANGGAL DIBUAT
                </th>
              </tr>
              <tr>
                <th style={columnStyle}>COIN</th>
                <th style={columnStyle}>RUPIAH</th>
              </tr>
            </thead>
            <tbody>
              {typeof data === "object" ? (
                data.length > 0 ? (
                  data.map((v, i) => {
                    totAmountPoint = totAmountPoint + parseFloat(v.amount);
                    totAmountRp = totAmountRp + parseFloat(v.amount_rupiah);
                    let nomRp = 0;
                    let status = "";
                    if (v.status === 0) {
                      status = <span className={"badge badge-warning"}>Pending</span>;
                    }
                    if (v.status === 1) {
                      status = <span className={"badge badge-success"}>Sukses</span>;
                    }
                    if (v.status === 2) {
                      status = <span className={"badge badge-danger"}>Gagal</span>;
                    }
                    return (
                      <tr key={i}>
                        <td style={{...columnStyle, width:'1%'}}>{i + 1 + 10 * (parseInt(current_page, 10) - 1)}</td>
                        <td style={{...columnStyle, width:'1%'}}>
                          <Button
                            size="sm"
                            color="violet"
                            appearance="subtle"
                            disabled={v.status === 1 || v.status === 2}
                            className="mr-2" onClick={(e) => this.handleApproval(e, v.kd_trx, 1)}>
                            <Icon icon="check" />
                          </Button>
                          <Button 
                            size="sm"
                            color="red"
                            appearance="subtle"
                            disabled={v.status === 1 || v.status === 2}
                            className="mr-2" onClick={(e) => this.handleApproval(e, v.kd_trx, 2)}>
                            <Icon icon="close" />
                          </Button>
                          <Button
                            size="sm"
                            color="cyan"
                            appearance="subtle"
                            className="" onClick={(e) => this.handlePaymentSlip(e, i)}>
                            <Icon icon="file-image-o" />
                          </Button>
                        </td>
                        <td style={strStyle}>{v.kd_trx}</td>
                        <td style={strStyle}>{v.fullname}</td>
                        <td style={strStyle}>
                          <div style={{ paddingTop: "5px" }}>
                            {v.bank_name} {v.acc_no==='0'?'':`(${v.acc_no})`}
                          </div>
                          <strong>#{v.acc_name}</strong>
                        </td>
                        <td style={numStyle} className="poin">
                          {toCurrency(`${v.amount}`)}
                        </td>
                        <td style={numStyle} className="txtGreen">
                          Rp {toRp(v.amount_rupiah)} .-
                        </td>
                        <td style={numStyle} className="txtRed">
                          {v.unique_code}
                        </td>
                        <td style={columnStyle}>{status}</td>
                        <td style={columnStyle}>{myDate(v.created_at)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={11} style={columnStyle}>
                      <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={11} style={columnStyle}>
                    <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="">
              <tr>
                <th colSpan={5}>TOTAL PERHALAMAN</th>
                <th colSpan={1} style={numStyle} className="poin">
                  {toCurrency(`${totAmountPoint}`)}
                </th>
                <th colSpan={1} style={numStyle} className="txtGreen">
                  Rp {toRp(`${totAmountRp}`)} .-
                </th>
                <th colSpan={3} />
              </tr>
            </tfoot>
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
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.depositReducer.isLoading,
    isOpen: state.modalReducer,
    data: state.depositReducer.data,
    res: state.depositReducer,
    isLoadingExcel: state.depositReducer.isLoadingExcel,
    dataExcel: state.depositReducer.excel,
    configWallet: state.configWalletReducer.data,
  };
};

export default connect(mapStateToProps)(IndexDeposit);
