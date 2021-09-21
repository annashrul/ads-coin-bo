import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../../../../components/Layout";
import Paginationq, { statusQ, ToastQ, toCurrency } from "../../../../helper";
import { NOTIF_ALERT } from "../../../../redux/actions/_constants";
import { ModalToggle, ModalType } from "../../../../redux/actions/modal.action";
import moment from "moment";
import DetailInvesment from "../../modals/masterdata/member/detail_invesment";
import { getMember, putMember } from "../../../../redux/actions/masterdata/member.action";
import { fetchKategori } from "../../../../redux/actions/kategori/kategori.action";
import { getExcelMember } from "../../../../redux/actions/masterdata/member.action";
import { toExcel } from "../../../../helper";
import { getDetailBank, setShowModal } from "../../../../redux/actions/masterdata/bank.action";
import * as Swal from "sweetalert2";
import Select from "react-select";
import FormMemberBank from "../../modals/masterdata/member/form_member_bank";
import FormMemberPinReset from "../../modals/masterdata/member/form_member_pin_reset";
import { Button, ButtonToolbar, Dropdown, Icon } from 'rsuite';

class IndexMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      isLoading: false,
      dateFrom: moment(new Date()).format("yyyy-MM-DD"),
      dateTo: moment(new Date()).format("yyyy-MM-DD"),
      searchBy: "fullname",
      searchByData: [
        { value: "fullname", label: "Nama" },
        // { value: "referral", label: "Referral" },
        { value: "mobile_no", label: "Telepon" },
        // { value: "status", label: "Status" },
        // { value: "type", label: "Tipe" },
      ],
      membership: "",
      jenjangKarir: "",
      status: "",
      statusData: [
        { value: "", label: "Semua" },
        { value: 0, label: "Tidak Aktif" },
        { value: 1, label: "Aktif" },
      ],
      type: "",
      typeData: [
        { value: "", label: "Semua" },
        { value: 0, label: "Member" },
        { value: 1, label: "Kontributor" },
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
    this.handleInvestment = this.handleInvestment.bind(this);
    this.handleBankEdit = this.handleBankEdit.bind(this);
    this.handleMemberEdit = this.handleMemberEdit.bind(this);
    this.handleMemberResetPin = this.handleMemberResetPin.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  componentWillUnmount() {
    this.setState({ isModalInvest: false });
    this.props.dispatch(setShowModal(false));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataExcel !== this.props.dataExcel) {
      this.getExcel(this.props);
    }
    // console.log("modal", prevProps.isShowModalInvestment);
    // console.log("modal", this.props.isShowModalInvestment);
    // if (
    //   (prevProps.isShowModalInvestment === false &&
    //     this.props.isShowModalInvestment === true) ||
    //   prevProps.isShowModalInvestment === this.props.isShowModalInvestment
    // ) {
    //   this.props.dispatch(ModalToggle(true));
    //   this.props.dispatch(ModalType("detailInvesment"));
    // }
  }
  componentWillMount() {
    localStorage.removeItem("isAlamat");
    localStorage.removeItem("isBank");
    localStorage.removeItem("isDetail");
    this.props.dispatch(getMember(1));
    this.props.dispatch(fetchKategori(`membership`));
  }
  getExcel(props) {
    if (props.dataExcel !== undefined) {
      if (props.dataExcel.length > 0) {
        this.setState({ isLoading: false });

        let stts = this.state.status;
        let content = [];
        let totSaldo = 0;
        let totTotalPayment = 0;
        let totRef = 0;
        let totCopy = 0;

        props.dataExcel.forEach((v, i) => {
          let newSaldo = parseFloat(v.saldo);
          let newTotalPayment = parseFloat(v.total_payment);
          let newRef = parseFloat(v.total_referral);
          let newCopy = parseFloat(v.copy_terjual);

          totSaldo += newSaldo;
          totTotalPayment += newTotalPayment;
          totRef += newRef;
          totCopy += newCopy;

          content.push([
            v.fullname,
            v.referral,
            v.mobile_no,
            v.type,
            toCurrency(parseFloat(v.saldo).toFixed(2)),
            toCurrency(parseFloat(v.total_payment).toFixed(2)),
            v.total_referral,
            v.copy_terjual,
            v.status === 0 ? "Tidak Aktif" : "Aktif",
            moment(v.created_at).format('YYYY-MM-DD'),
            v.website,
            v.rating,
          ]);
        });
        console.log("content",content);
        toExcel(
          `LAPORAN MEMBER ${stts === 0 ? "Tidak Aktif" : stts === 1 ? "Aktif" : ""}`,
          `SEMUA PERIODE`,
          [
            "NAMA",
            "REFERRAL",
            "NO.TELEPON",
            "TIPE MEMBER",
            "TOTAL SALDO",
            "TOTAL PENARIKAN",
            "TOTAL REFERRAL",
            "TOTAL COPY TERJUAL",
            "STATUS",
            "TANGGAL JOIN",
            "WEBSITE",
            "RATING",
          ],
          content,
          [[""], [""], ["TOTAL", "", "", "", totSaldo, totTotalPayment, totRef, totCopy]]
        );
      }
    }
  }
  printDocumentXLsx(e, param) {
    e.preventDefault();
    this.setState({ isLoading: true });
    let where = this.handleValidate();
    if (this.state.status !== "") {
      this.props.dispatch(getExcelMember(`status=${this.state.status}&perpage=${param}&${where}`));
    } else {
      this.props.dispatch(getExcelMember(`perpage=${param}&${where}`));
    }
  }
  handleSearchBy(val) {
    this.setState({
      searchBy: val.value,
    });
  }
  handleStatus(val) {
    this.setState({ status: val.value });
    // let where = this.handleValidate();
    // console.log(where);
    // if (val.value !== "") {
    //   this.props.dispatch(getMember(1, `&status=${val.value}&${where}`));
    // } else {
    //   this.props.dispatch(getMember(1, `&${where}`));
    // }
  }
  handleChangeType(val) {
    this.setState({ type: val.value });
    // let where = this.handleValidate();
    // console.log(where);
    // if (val.value !== "") {
    //   this.props.dispatch(getMember(1, `type=${val.value}&${where}`));
    // } else {
    //   this.props.dispatch(getMember(1, `${where}`));
    // }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleValidate() {
    let any = this.state.any;
    let type = this.state.type;
    let status = this.state.status;
    let searchBy = this.state.searchBy;
    let where = `searchby=${searchBy}`;
    if (any !== null && any !== undefined && any !== "") {
      where += `&q=${any}`;
      this.setState({ any: "" });
    }
    if (type !== null && type !== undefined && type !== "") {
      where += `&type=${type}`;
      this.setState({ type: "" });
    }
    if (status !== null && status !== undefined && status !== "") {
      where += `&status=${status}`;
      this.setState({ status: "" });
    }

    return where;
  }
  handlePage(pageNumber) {
    localStorage.setItem("pageMember", pageNumber);
    let where = this.handleValidate();
    this.props.dispatch(getMember(pageNumber, where));
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
    this.props.dispatch(getMember(1, where));
  }
  handleInvestment(e, val) {
    e.preventDefault();
    this.setState({ detail: val, isModalInvest: true });
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("detailInvesment"));
  }
  handleMemberResetPin(e, val) {
    e.preventDefault();
    this.setState({ detail: { id: val } });
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("formMemberPinReset"));
  }

  handleBankEdit(e, par, name) {
    e.preventDefault();
    this.setState({ detail: { id: par, member_name: name } });
    this.props.dispatch(getDetailBank(par));
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
        this.props.dispatch(putMember({ status: val.status === 0 ? "1" : "0" }, val.id));
      }
    });
  }
  handleType(e, val) {
    e.preventDefault();
    Swal.fire({
      title: "Perhatian !!!",
      html: `anda yakin akan menjadikan ${val.fullname} sebagai ${val.type_id === 1 ? "MEMBER" : "KONTRIBUTOR"}??`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Oke, ${val.type_id === 1 ? "jadikan MEMBER" : "jadikan KONTRIBUTOR"}`,
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.value) {
        this.props.dispatch(putMember({ type: val.type_id === 0 ? "1" : "0" }, val.id));
      }
    });
  }

  handleMemberEdit(e, id, name_old, mobile_no) {
    e.preventDefault();
    let proping = this.props;
    Swal.fire({
      title: '<span class="text-dark">Ubah Member</span>',
      focusConfirm: true,
      background: "#fff",
      html:
        '<div class="form-group"><label class="text-dark">Nama Member</label><div class="input-group"><input type="text" id="nameModal" class="form-control" placeholder="Nama Member" value="' +
        name_old +
        '"></div></div>' +
        '<div class="form-group"><label class="text-dark">No Hp Member</label><div class="input-group"><input type="number" id="mobilenoModal" class="form-control" placeholder="No Hp Member" value="' +
        mobile_no +
        '"></div><small class="float-left text-danger text-left font-11">Mengganti no telpon akan berdampak pada perubahan kode referral anda</small></div>',
      type: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Ubah!",
      allowOutsideClick: true,
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve({
            fullname: document.getElementById("nameModal").value,
            mobile_no: document.getElementById("mobilenoModal").value,
          });
        });
      },
      onOpen: function () {
        // $('#swal-input1').focus()
        document.getElementById("nameModal").focus();
      },
    })
      .then(function (result) {
        if (result.isConfirmed) {
          if (!result) return null;
          let parseData = {};
          parseData["fullname"] = result.value.fullname;
          parseData["mobile_no"] = result.value.mobile_no;

          if (parseData.fullname === "") {
            delete parseData.fullname;
          } else if (parseData.mobile_no === "") {
            delete parseData.mobile_no;
          } else if (isNaN(String(parseData.mobile_no).replace(/[0-9]/g, ""))) {
            return ToastQ.fire({
              icon: "warning",
              title: `No Hp harus berupa angka!`,
            });
          }
          // alert(JSON.stringify(result))
          proping.dispatch(putMember(parseData, id));
        }
      })
      .catch(Swal.noop);
    //   inputValidator: (value) => {
    //     if (!value) {
    //       return 'You need to write something!'
    //     }
    //   }
  }
  // handleMemberResetPin_(e, id) {
  //   e.preventDefault();
  //   let proping = this.props;
  //   Swal.fire({
  //     title: '<span class="text-light">Reset PIN Member</span>',
  //     focusConfirm: true,
  //     background: "#1a1c23",
  //     html:
  //       '<div class="form-group"><label class="text-light">PIN Member</label><div class="input-group"><input type="password" id="pinModal" class="form-control" placeholder="PIN Member" value="" maxlength="6" onkeypress="evt = event; var charCode = (evt.which) ? evt.which : evt.keyCode; if (charCode > 31 && (charCode < 48 || charCode > 57)) { return false; } return true;"></div><small class="text-muted">Masukan 6 digit angka yang akan digunakan member baru untuk transaksi.</small></div>' +
  //       '<div class="form-group"><label class="text-light">Ulangi PIN Member</label><div class="input-group"><input type="password" id="pinReModal" class="form-control" placeholder="Ulangi PIN Member" value="" maxlength="6" onkeypress="evt = event; var charCode = (evt.which) ? evt.which : evt.keyCode; if (charCode > 31 && (charCode < 48 || charCode > 57)) { return false; } return true;"></div><small class="text-muted">Masukan Kembali 6 digit angka yang akan digunakan member baru untuk transaksi.</small></div>',
  //     type: "warning",
  //     showCancelButton: true,
  //     cancelButtonColor: "grey",
  //     confirmButtonText: "Reset!",
  //     allowOutsideClick: true,
  //     preConfirm: function (result) {
  //       console.log("test",result);
  //       // if (result.isConfirmed) {
  //       //   if (!result) return null;
  //       //   let parseData = {};
  //       //   parseData["pin"] = result.value.pin_member;
  //       //   parseData["pin_re"] = result.value.pin_member_re;

  //       //   if (parseData.pin === "") {
  //       //     delete parseData.pin;
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `PIN tidak boleh kosong!`,
  //       //     });
  //       //   } else if (parseData.pin.length > 1 && parseData.pin.length < 6) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `PIN masih kurang dari 6 digit!`,
  //       //     });
  //       //   } else if (parseData.pin.length > 6) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `PIN lebih dari 6 digit!`,
  //       //     });
  //       //   } else if (isNaN(String(parseData.pin).replace(/[0-9]/g, ""))) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `PIN harus berupa angka!`,
  //       //     });
  //       //   } else if (
  //       //     parseData.pin_re.length > 1 &&
  //       //     parseData.pin_re.length < 6
  //       //   ) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `Ulangi PIN masih kurang dari 6 digit!`,
  //       //     });
  //       //   } else if (parseData.pin_re.length > 6) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `Ulangi PIN lebih dari 6 digit!`,
  //       //     });
  //       //   } else if (isNaN(String(parseData.pin_re).replace(/[0-9]/g, ""))) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `Ulangi PIN harus berupa angka!`,
  //       //     });
  //       //   }
  //       //   // alert(JSON.stringify(result))
  //       //   // return new Promise(function (resolve) {
  //       //   //   resolve({
  //       //   //     pin_member: document.getElementById("pinModal").value,
  //       //   //     pin_member_re: document.getElementById("pinReModal").value,
  //       //   //   });
  //       //   // });
  //       //   proping.dispatch(putMember(parseData, id));
  //       // }
  //     },
  //     onOpen: function () {
  //       // $('#swal-input1').focus()
  //       document.getElementById("pinModal").focus();
  //     },
  //   })
  //     .then(function (result) {
  //       // if (result.isConfirmed) {
  //       //   if (!result) return null;
  //       //   let parseData = {};
  //       //   parseData["pin"] = result.value.pin_member;
  //       //   parseData["pin_re"] = result.value.pin_member_re;

  //       //   if (parseData.pin === "") {
  //       //     delete parseData.pin;
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `PIN tidak boleh kosong!`,
  //       //     });
  //       //   } else if (parseData.pin.length > 1 && parseData.pin.length < 6) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `PIN masih kurang dari 6 digit!`,
  //       //     });
  //       //   } else if (parseData.pin.length > 6) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `PIN lebih dari 6 digit!`,
  //       //     });
  //       //   } else if (isNaN(String(parseData.pin).replace(/[0-9]/g, ""))) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `PIN harus berupa angka!`,
  //       //     });
  //       //   } else if (
  //       //     parseData.pin_re.length > 1 &&
  //       //     parseData.pin_re.length < 6
  //       //   ) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `Ulangi PIN masih kurang dari 6 digit!`,
  //       //     });
  //       //   } else if (parseData.pin_re.length > 6) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `Ulangi PIN lebih dari 6 digit!`,
  //       //     });
  //       //   } else if (isNaN(String(parseData.pin_re).replace(/[0-9]/g, ""))) {
  //       //     return ToastQ.fire({
  //       //       icon: "warning",
  //       //       title: `Ulangi PIN harus berupa angka!`,
  //       //     });
  //       //   }
  //       //   // alert(JSON.stringify(result))
  //       //   // proping.dispatch(putMember(parseData, id));
  //       // }
  //     })
  //     .catch(Swal.noop);
  //   //   inputValidator: (value) => {
  //   //     if (!value) {
  //   //       return 'You need to write something!'
  //   //     }
  //   //   }
  // }
  render() {
    
    const headStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
    };
    const bodyStyle = {
      verticalAlign: "middle",
      textAlign: "left",
      whiteSpace: "nowrap",
    };
    const numberStyle = {
      verticalAlign: "middle",
      textAlign: "right",
      whiteSpace: "nowrap",
    };
    const { data } = this.props.data;
    const { last_page, total, per_page, current_page } = this.props.data.meta;

    let totSaldo = 0;
    let totPayment = 0;
    let totReferral = 0;
    let totCopyTerjual = 0;
    return (
      <Layout page={"Member"}>
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
              >
                <div className="form-group">
                  <label>Tipe</label>

                  <Select
                    options={this.state.typeData}
                    placeholder="==== Pilih ===="
                    onChange={this.handleChangeType}
                    value={this.state.typeData.find((op) => {
                      return op.value === this.state.type;
                    })}
                  />
                </div>
              </div>
              <div
                className="col-6 col-xs-6 col-md-3"
                // style={{
                //   display: this.state.searchBy === "status" || this.state.searchBy === "type" ? "none" : "block",
                // }}
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
                <th rowSpan="2" style={headStyle}>
                  NAMA
                </th>
                <th rowSpan="2" style={headStyle}>
                  REFERRAL
                </th>
                <th rowSpan="2" style={headStyle}>
                  NO.TELEPON
                </th>
                <th rowSpan="2" style={headStyle}>
                  TIPE MEMBER
                </th>
                <th colSpan="4" style={headStyle}>
                  TOTAL
                </th>

                <th rowSpan="2" style={headStyle}>
                  STATUS
                </th>

                <th rowSpan="2" style={headStyle}>
                  TANGGAL JOIN
                </th>
                <th rowSpan="2" style={headStyle}>
                  WEBSITE
                </th>
                <th rowSpan="2" style={headStyle}>
                  RATING
                </th>
              </tr>
              <tr>
                <th style={headStyle}>SALDO</th>
                <th style={headStyle}>PENARIKAN</th>
                <th style={headStyle}>REFERRAL</th>
                <th style={headStyle}>COPY TERJUAL</th>
              </tr>
            </thead>
            <tbody>
              {typeof data === "object" ? (
                data.length > 0 ? (
                  data.map((v, i) => {
                    totSaldo += parseFloat(v.saldo);
                    totPayment += parseFloat(v.total_payment);
                    totReferral += parseInt(v.total_referral,10);
                    totCopyTerjual += parseInt(v.copy_terjual,10);

                    return (
                      <tr key={i}>
                        <td style={headStyle}>{i + 1 + 10 * (parseInt(current_page, 10) - 1)}</td>
                        <td style={headStyle}>
                          <div className="btn-group">
                            <ButtonToolbar>
                              <Dropdown appearance="default" title="AKSI" size="xs" placement="rightStart">
                                  {/* <Dropdown.Item onClick={(e)=>this.handleBankEdit(e, v.id, v.fullname)}>
                                  <Icon icon="edit2" /> Edit Bank {v.type_id === 1 ? "Kontributor" : "Member"}
                                  </Dropdown.Item> */}
                                  <Dropdown.Item onClick={(e)=>this.handleMemberEdit(e, v.id, v.fullname, v.mobile_no)}>
                                  <Icon icon="edit2" /> Edit {v.type_id === 1 ? "Kontributor" : "Member"}
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={(e)=>this.handleMemberResetPin(e, v.id)}>
                                  <Icon icon="refresh" /> Reset PIN {v.type_id === 1 ? "Kontributor" : "Member"}
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={(e)=>this.handleType(e, v)}>
                                  <Icon icon="crosshairs" /> {v.type_id === 0 ? "Jadikan Kontributor" : "Jadikan Member"}
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={(e)=>this.handleUpdate(e, v)}>
                                  <Icon icon="toggle-on" /> {v.status === 0 ? "Aktifkan" : "Non-aktifkan"}
                                  </Dropdown.Item>
                              </Dropdown>
                            </ButtonToolbar>
                          </div>
                        </td>
                        <td style={bodyStyle}>{v.fullname}</td>
                        <td style={bodyStyle}>{v.referral}</td>
                        <td style={bodyStyle}>{v.mobile_no}</td>
                        <td style={bodyStyle}>{v.type_id===1?<span className={"badge badge-info"}>{v.type}</span>:<span className={"badge badge-warning"}>{v.type}</span>}</td>
                        <td style={numberStyle} className="poin">
                          {toCurrency(parseFloat(v.saldo).toFixed(2))}
                        </td>
                        <td className="poin" style={numberStyle}>
                          {toCurrency(parseFloat(v.total_payment).toFixed(2))}
                        </td>
                        <td className="poin" style={numberStyle}>
                          {(v.total_referral)} Member
                        </td>
                        <td className="poin" style={numberStyle}>
                          {(v.copy_terjual)} Copy
                        </td>
                        <td style={bodyStyle}>{statusQ(v.status)}</td>
                        <td style={bodyStyle}>{moment(v.created_at).format('YYYY-MM-DD')}</td>
                        <td style={bodyStyle}>{v.website}</td>
                        <td style={bodyStyle}>{v.rating}</td>

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
            <tfoot className="">
              <tr>
                <td colSpan={6}>TOTAL PERHALAMAN</td>
                <td style={numberStyle} className="poin">
                  {toCurrency(totSaldo.toFixed(2))}
                </td>
                <td className="poin" style={numberStyle}>
                  {toCurrency(totPayment.toFixed(2))}
                </td>
                <td style={numberStyle} className="poin">
                  {(totReferral)} Member
                </td>
                <td className="poin" style={numberStyle}>
                  {(totCopyTerjual)} Copy
                </td>
                <td />
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

        {this.state.isModalInvest ? <DetailInvesment detail={this.state.detail} /> : null}

        {this.props.isShowModalBank ? <FormMemberBank detail={this.state.detail} detailBank={this.props.detailBank} /> : null}
        <FormMemberPinReset detail={this.state.detail} />
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state.memberReducer",state.memberReducer);
  return {
    isOpen: state.modalReducer,
    isShowModalInvestment: state.memberReducer.isShowModal,

    isLoading: state.memberReducer.isLoading,
    data: state.memberReducer,

    loading: state.memberReducer.isLoadingExcel,
    dataExcel: state.memberReducer.excel,

    isLoadingBank: state.bankReducer.isLoadingDetail,
    isShowModalBank: state.bankReducer.isShowModal,
    detailBank: state.bankReducer.data,
  };
};

export default connect(mapStateToProps)(IndexMember);
