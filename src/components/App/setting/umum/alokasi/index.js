import React, { Component } from "react";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { updateGeneral } from "../../../../../redux/actions/setting/general.action";
import Switch from "react-switch";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hari: ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"],
      hariWithdrawFrom: "",
      hariWithdrawTo: "",
      jamWithdrawFrom: "",
      jamWithdrawTo: "",

      hariDepositFrom: "",
      hariDepositTo: "",
      jamDepositFrom: "",
      jamDepositTo: "",
      dataTipeOTP: [
        {
          value: "gabungan",
          label: "Gabungan",
        },
        {
          value: "single",
          label: "Single Provider",
        },
      ],
      type_otp: "gabungan",
      dataProvider: [
        {
          value: "whatsapp",
          label: "Whatsapp",
        },
        {
          value: "sms",
          label: "SMS",
        },
      ],
      provider_otp: "whatsapp",
      sharing_profit_engine: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTypeOtp = this.handleTypeOtp.bind(this);
    this.handleProviderOtp = this.handleProviderOtp.bind(this);
    this.handleBtnSubmit = this.handleBtnSubmit.bind(this);
    this.handleEnterSubmit = this.handleEnterSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.res_alokasi !== undefined && props.res_alokasi.length !== 0) {
      if (props.res_alokasi !== state.prevDataProps) {
        // props.dispatch(fetchKota(props.res_alokasi.id_prov));
        // props.dispatch(fetchKecamatan(props.res_alokasi.id_kota));

        return {
          prevDataProps: props.res_alokasi,
          min_wd: props.res_alokasi.min_wd,
          dp_min: props.res_alokasi.dp_min,
          tf_min: props.res_alokasi.tf_min,

          bonus_gen1: props.res_alokasi.bonus_gen1,
          bonus_gen2: props.res_alokasi.bonus_gen2,

          aktivasi_fee: props.res_alokasi.aktivasi_fee,

          profit_sharing: props.res_alokasi.profit_sharing,
          charge_investment: props.res_alokasi.charge_investment,
          charge_wd: props.res_alokasi.charge_wd,
          charge_tf: props.res_alokasi.charge_tf,

          konversi_poin: props.res_alokasi.konversi_poin,

          invest_time: props.res_alokasi.invest_time,
          schedule_wd: props.res_alokasi.schedule_wd,
          schedule_dp: props.res_alokasi.schedule_dp,
          sharing_profit_engine: props.res_alokasi.sharing_profit_engine,

          hariWithdrawFrom: props.res_alokasi.schedule_wd.days[0],
          hariWithdrawTo: props.res_alokasi.schedule_wd.days[1],
          jamWithdrawFrom: props.res_alokasi.schedule_wd.time[0],
          jamWithdrawTo: props.res_alokasi.schedule_wd.time[1],

          hariDepositFrom: props.res_alokasi.schedule_dp.days[0],
          hariDepositTo: props.res_alokasi.schedule_dp.days[1],
          jamDepositFrom: props.res_alokasi.schedule_dp.time[0],
          jamDepositTo: props.res_alokasi.schedule_dp.time[1],
        };
      }
    }
  }

  handleTypeOtp(val) {

    this.setState({
      type_otp: val.value,
    });
  }

  handleProviderOtp(val) {

    this.setState({
      provider_otp: val.value,
    });
  }
  handleEnterSubmit = (event) => {
    const key_data = event.target.name;
    let type = "site";
    const data = {
      [key_data]: event.target.value,
    };
    this.props.dispatch(updateGeneral(data, type));
  };
  handleBtnSubmit = (event, names) => {
    event.preventDefault();
    let type = "site";
    let data = {};
    if (names === "schedule_wd") {
      data = {
        [names]: JSON.stringify({
          days: [this.state.hariWithdrawFrom, this.state.hariWithdrawTo],
          time: [this.state.jamWithdrawFrom, this.state.jamWithdrawTo],
        }),
      };
    } else {
      data = {
        [names]: JSON.stringify({
          days: [this.state.hariDepositFrom, this.state.hariDepositTo],
          time: [this.state.jamDepositFrom, this.state.jamDepositTo],
        }),
      };
    }
    this.props.dispatch(updateGeneral(data, type));
  };

  handleChange = (event, e = null) => {
    // console.log(event.target);
    if (e === null) {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      // alert(event);
      this.props.dispatch(
        updateGeneral({ sharing_profit_engine: event ? 1 : 0 }, "site")
      );
      this.setState({ sharing_profit_engine: event });
    }
  };

  render() {
    return (
      <div className="card bg-transparent">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="alert bg-secondary text-light">
                Setelah melakukan perubahan silahkan{" "}
                <span style={{ fontWeight: "800", color: "yellow" }}>
                  tekan tombol "Enter"
                </span>{" "}
                untuk melakukan update, tidak berlaku jika terdapat tombol
                simpan diatasnya.
              </div>
            </div>
          </div>
          <h4
            className="margin-bottom-20 text-white"
            style={{ marginTop: "30px", marginBottom: "20px" }}
          >
            Konfigurasi Alokasi
          </h4>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Minimal Deposit</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">Poin</span>
                  </div>
                  <input
                    type="number"
                    name="dp_min"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.dp_min}
                    className="form-control"
                    placeholder="Minimal Withdraw"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Minimal Withdrawal</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">Poin</span>
                  </div>
                  <input
                    type="number"
                    name="min_wd"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.min_wd}
                    className="form-control"
                    placeholder="Minimal Withdrawal"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Minimal Transfer</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">Poin</span>
                  </div>
                  <input
                    type="number"
                    name="tf_min"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.tf_min}
                    className="form-control"
                    placeholder="Minimal Transer"
                  />
                </div>
              </div>
              <h4
                className="margin-bottom-20 text-white"
                style={{ marginTop: "30px", marginBottom: "20px" }}
              >
                Konfigurasi Biaya
              </h4>
              <div className="form-group">
                <label>Biaya Withdrawal</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">%</span>
                  </div>
                  <input
                    type="number"
                    name="charge_wd"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.charge_wd}
                    className="form-control"
                    placeholder="Minimal Transer"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Biaya Transfer</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">%</span>
                  </div>
                  <input
                    type="number"
                    name="charge_tf"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.charge_tf}
                    className="form-control"
                    placeholder="Biaya Transfer"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Biaya Penarikan Modal</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">%</span>
                  </div>
                  <input
                    type="number"
                    name="charge_investment"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.charge_investment}
                    className="form-control"
                    placeholder="Biaya Investment"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="">Sharing Profit Engine</label>
                <br />
                <Switch
                  onChange={(e) => this.handleChange(e, "-")}
                  checked={this.state.sharing_profit_engine}
                />
              </div>
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Bonus GEN 1</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">%</span>
                  </div>
                  <input
                    type="number"
                    name="bonus_gen1"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.bonus_gen1}
                    className="form-control"
                    placeholder="Bonus GEN 1"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Bonus GEN 2</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">%</span>
                  </div>
                  <input
                    type="number"
                    name="bonus_gen2"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.bonus_gen2}
                    className="form-control"
                    placeholder="Bonus GEN 2"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Pembagian Keuntungan per Hari</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">%</span>
                  </div>
                  <input
                    type="number"
                    name="profit_sharing"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.profit_sharing}
                    className="form-control"
                    placeholder="Pembagian Keuntungan"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Konversi Poin</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Rp</span>
                  </div>
                  <input
                    type="number"
                    name="konversi_poin"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.konversi_poin}
                    className="form-control"
                    placeholder="Konversi Poin"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Kontrak</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Hari</span>
                  </div>
                  <input
                    type="number"
                    name="invest_time"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.invest_time}
                    className="form-control"
                    placeholder="Invest Time"
                  />
                </div>
              </div>
              <h4
                className="margin-bottom-20 text-white"
                style={{ marginTop: "30px", marginBottom: "20px" }}
              >
                Konfigurasi Jadwal
              </h4>
              <div className="form-group">
                <div className="row">
                  <div className="col-6 col-xs col-md-6">
                    <label>
                      Jadwal Withdraw&nbsp;
                      <button
                        className="badge badge-success"
                        onClick={(event) =>
                          this.handleBtnSubmit(event, "schedule_wd")
                        }
                      >
                        Simpan
                      </button>
                    </label>
                  </div>
                  <div className="col-6 col-xs col-md-6">
                    <label style={{ color: "#e8ebf1", float: "right" }}>
                      Dari
                    </label>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      {this.props.isLoading ? (
                        <Skeleton height={30} />
                      ) : (
                        <select
                          name="hariWithdrawFrom"
                          className="form-control form-control-lg"
                          defaultValue={this.state.hariWithdrawFrom}
                          value={this.state.hariWithdrawFrom}
                          onChange={this.handleChange}
                        >
                          From
                          {this.state.hari.map((v, i) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      {this.props.isLoading ? (
                        <Skeleton height={30} />
                      ) : (
                        <input
                          type="time"
                          className="form-control"
                          name={"jamWithdrawFrom"}
                          value={this.state.jamWithdrawFrom}
                          onChange={this.handleChange}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label style={{ color: "#e8ebf1", float: "right" }}>
                      Ke
                    </label>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      {this.props.isLoading ? (
                        <Skeleton height={30} />
                      ) : (
                        <select
                          name="hariWithdrawTo"
                          className="form-control form-control-lg"
                          defaultValue={this.state.hariWithdrawTo}
                          value={this.state.hariWithdrawTo}
                          onChange={this.handleChange}
                        >
                          {this.state.hari.map((v, i) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      {this.props.isLoading ? (
                        <Skeleton height={30} />
                      ) : (
                        <input
                          type="time"
                          className="form-control"
                          name={"jamWithdrawTo"}
                          value={this.state.jamWithdrawTo}
                          onChange={this.handleChange}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-6 col-xs col-md-6">
                    <label>
                      Jadwal Deposit&nbsp;
                      <button
                        className="badge badge-success"
                        onClick={(event) =>
                          this.handleBtnSubmit(event, "schedule_dp")
                        }
                      >
                        Simpan
                      </button>
                    </label>
                  </div>
                  <div className="col-6 col-xs col-md-6">
                    <label style={{ color: "#e8ebf1", float: "right" }}>
                      Dari
                    </label>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      {this.props.isLoading ? (
                        <Skeleton height={30} />
                      ) : (
                        <select
                          name="hariDepositFrom"
                          className="form-control form-control-lg"
                          defaultValue={this.state.hariDepositFrom}
                          value={this.state.hariDepositFrom}
                          onChange={this.handleChange}
                        >
                          From
                          {this.state.hari.map((v, i) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      {this.props.isLoading ? (
                        <Skeleton height={30} />
                      ) : (
                        <input
                          type="time"
                          className="form-control"
                          name={"jamDepositFrom"}
                          value={this.state.jamDepositFrom}
                          onChange={this.handleChange}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label style={{ color: "#e8ebf1", float: "right" }}>
                      Ke
                    </label>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      {this.props.isLoading ? (
                        <Skeleton height={30} />
                      ) : (
                        <select
                          name="hariDepositTo"
                          className="form-control form-control-lg"
                          defaultValue={this.state.hariDepositTo}
                          value={this.state.hariDepositTo}
                          onChange={this.handleChange}
                        >
                          {this.state.hari.map((v, i) => {
                            return <option value={v}>{v}</option>;
                          })}
                        </select>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      {this.props.isLoading ? (
                        <Skeleton height={30} />
                      ) : (
                        <input
                          type="time"
                          className="form-control"
                          name={"jamDepositTo"}
                          value={this.state.jamDepositTo}
                          onChange={this.handleChange}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.generalReducer.isLoading,
    isOpen: state.modalReducer,
  };
};

export default connect(mapStateToProps)(Index);
