import React, { Component } from "react";
import WrapperModal from "../../_wrapper.modal";
import connect from "react-redux/es/connect/connect";
import Switch from "react-switch";
import { ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { ModalToggle } from "../../../../../redux/actions/modal.action";
import { ToastQ } from "../../../../../helper";
import {
  postUserLevel,
  putUserLevel,
} from "../../../../../redux/actions/masterdata/user_level.action";
import Preloader from "../../../../../Preloader";

class FormUserLevel extends Component {
  //MENU ACCESS MASTERDATA = 0-9
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeToggle = this.handleChangeToggle.bind(this);
    this.state = {
      menu: [
        {
          id: 0,
          label: "member",
          path: "/member",
          isChecked: false,
          isToggle: false,
          sub: undefined,
          icons: "fa fa-user-o",
        },
        {
          id: 1,
          label: "pin",
          path: "/pin",
          isChecked: false,
          isToggle: false,
          sub: undefined,
          icons: "fa fa-vcard",
        },
        {
          id: 2,
          label: "pengguna",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-address-book-o",
          sub: [
            {
              id: 3,
              label: "daftar pengguna",
              path: "/pengguna",
              parent: "pengguna",
              isChecked: false,
            },
            {
              id: 4,
              label: "akses pengguna",
              path: "/pengguna/akses",
              parent: "pengguna",
              isChecked: false,
            },
          ],
        },
        {
          id: 100,
          label: "paket",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-th",
          sub: [
            {
              id: 101,
              label: "daftar paket",
              path: "/paket",
              parent: "paket",
              isChecked: false,
            },
            {
              id: 102,
              label: "kategori paket",
              path: "/paket/kategori",
              parent: "paket",
              isChecked: false,
            },
          ],
        },

        {
          id: 10,
          label: "e-wallet",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-credit-card",
          sub: [
            {
              id: 11,
              label: "deposit",
              path: "/ewallet/deposit",
              parent: "e-wallet",
              isChecked: false,
            },
            {
              id: 12,
              label: "penarikan",
              path: "/ewallet/penarikan",
              parent: "e-wallet",
              isChecked: false,
            },
          ],
        },
        {
          id: 201,
          label: "berita",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-newspaper-o",
          sub: [
            {
              id: 202,
              label: "daftar Berita",
              path: "/berita",
              parent: "berita",
              isChecked: false,
            },
            {
              id: 203,
              label: "Kategori Berita",
              path: "/berita/kategori",
              parent: "berita",
              isChecked: false,
            },
          ],
        },

        {
          id: 5,
          label: "laporan",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-line-chart",
          sub: [
            {
              id: 6,
              label: "transaksi",
              path: "/laporan/member",
              parent: "laporan",
              isChecked: false,
            },
            {
              id: 7,
              label: "penjualan",
              path: "",
              parent: "laporan",
              isChecked: false,
              sub: [
                {
                  id: 8,
                  label: "paket",
                  path: "/laporan/paket",
                  parent: "penjualan",
                  isChecked: false,
                  sub: undefined,
                },
                {
                  id: 9,
                  label: "tiket",
                  path: "/laporan/tiket",
                  parent: "penjualan",
                  isChecked: false,
                  sub: undefined,
                },
              ],
            },
          ],
          otherSub: true,
        },
        {
          id: 15,
          label: "pengaturan",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-cogs",
          sub: [
            {
              id: 16,
              label: "umum",
              path: "/pengaturan/umum",
              parent: "pengaturan",
              isChecked: false,
            },
            {
              id: 17,
              label: "bank",
              path: "/pengaturan/bank",
              parent: "pengaturan",
              isChecked: false,
            },
          ],
        },
      ],
      lvl: "",
      checked: false,
    };
  }

  getProps(param) {
    if (param.detail.id !== "") {
      this.setState({ lvl: param.detail.lvl, menu: param.detail.access });
      // this.setState({ lvl: param.detail.lvl, menu: this.state.menu });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.getProps(nextProps);
  }
  componentWillMount() {
    this.getProps(this.props);
  }
  toggle(e) {
    e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  }
  handleAllChecked(event, param) {
    let menu = this.state.menu;
    menu.forEach((val) => {
      if (param === val.id) {
        val.isChecked = event;
      }
      if (val.sub !== undefined) {
        val.sub.forEach((row) => {
          if (param === val.id || param === row.id) {
            row.isChecked = event;
          }
          if (row.sub !== undefined) {
            row.sub.forEach((res) => {
              if (param === val.id || param === row.id || param === res.id) {
                res.isChecked = event;
              }
            });
          }
        });
      }
    });
    this.setState({ menu: menu });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleChangeToggle(e, val) {
    this.setState({ checked: val });
  }
  handleSubmit(e) {
    e.preventDefault();
    let parseData = {};
    parseData["level"] = this.state.lvl;
    parseData["access_level"] = JSON.stringify(this.state.menu);
    console.log(this.state.menu);
    if (parseData["level"] === "" || parseData["level"] === undefined) {
      ToastQ.fire({
        icon: "error",
        title: `silahkan beri nama untuk akses pengguna ini`,
      });
      return;
    }
    if (this.props.detail.id === "") {
      this.props.dispatch(postUserLevel(parseData));
    } else {
      this.props.dispatch(putUserLevel(parseData, this.props.detail.id));
    }
  }
  render() {
    const { menu } = this.state;
    return (
      <WrapperModal
        isOpen={this.props.isOpen && this.props.type === "formUserLevel"}
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>
          {this.props.detail.id === "" ? "Tambah" : "Ubah"} Akses Pengguna
        </ModalHeader>
        {this.props.isLoadingPost ? <Preloader /> : null}
        <ModalBody>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label> Nama Akses </label>
                <input
                  type="text"
                  className="form-control"
                  name="lvl"
                  value={this.state.lvl}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
            </div>

            {menu.map((val, key) => {
              return val.sub === undefined ? (
                <div style={{ zoom: "80%" }} className="col-md-12" key={key}>
                  <div className="form-group">
                    <label htmlFor="">
                      <b style={{ color: "white", letterSpacing: "2px" }}>
                        {val.label.replace("_", " ").toUpperCase()}
                      </b>
                    </label>
                    <br />
                    <Switch
                      onChange={(e) => this.handleAllChecked(e, val.id)}
                      checked={val.isChecked}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ zoom: "80%" }} className="col-md-12" key={key}>
                  <div className="form-group">
                    <label htmlFor="">
                      <b style={{ color: "white", letterSpacing: "2px" }}>
                        {val.label.replace("_", " ").toUpperCase()}
                      </b>
                    </label>
                    <br />
                    <Switch
                      onChange={(e) => this.handleAllChecked(e, val.id)}
                      checked={val.isChecked}
                    />
                  </div>
                  <div className="row">
                    {val.sub.map((row, idx) => {
                      return (
                        <div
                          className={`${
                            row.sub !== undefined ? "col-md-12" : "col-md-3"
                          }`}
                          key={idx}
                          style={{ marginLeft: "9px" }}
                        >
                          <div className="form-group">
                            <label htmlFor="">
                              <b
                                style={{
                                  color: "#D4AF37",
                                  letterSpacing: "2px",
                                }}
                              >
                                {row.label.replace("_", " ").toUpperCase()}
                              </b>
                            </label>
                            <br />
                            <Switch
                              onChange={(e) => this.handleAllChecked(e, row.id)}
                              checked={row.isChecked}
                            />
                          </div>
                          <div className="row" style={{ marginLeft: "3px" }}>
                            {(() => {
                              let child = [];
                              if (row.sub !== undefined) {
                                row.sub.forEach((res, i) => {
                                  child.push(
                                    <div className="col-md-3" key={i}>
                                      <div className="form-group">
                                        <label htmlFor="">
                                          <b
                                            style={{
                                              color: "orange",
                                              letterSpacing: "2px",
                                            }}
                                          >
                                            {res.label
                                              .replace("_", " ")
                                              .toUpperCase()}
                                          </b>
                                        </label>
                                        <br />
                                        <Switch
                                          onChange={(e) =>
                                            this.handleAllChecked(e, res.id)
                                          }
                                          checked={res.isChecked}
                                        />
                                      </div>
                                    </div>
                                  );
                                });
                              }
                              return child;
                            })()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="form-group" style={{ textAlign: "right" }}>
            <button
              style={{ color: "white" }}
              type="button"
              className="btn btn-warning mb-2 mr-2"
              onClick={this.toggle}
            >
              <i className="ti-close" /> Keluar
            </button>
            <button
              type="submit"
              className="btn btn-primary mb-2 mr-2"
              onClick={this.handleSubmit}
            >
              <i className="ti-save" /> Simpan
            </button>
          </div>
        </ModalFooter>
      </WrapperModal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.modalReducer,
    type: state.modalTypeReducer,
    isLoadingPost: state.userLevelReducer.isLoadingPost,
    isError: state.userLevelReducer.isError,
  };
};

export default connect(mapStateToProps)(FormUserLevel);
