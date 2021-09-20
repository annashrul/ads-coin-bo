import React, { Component } from "react";
import { connect } from "react-redux";
import { updateGeneral } from "../../../../../redux/actions/setting/general.action";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dp_min: 0,
      wd_min: 0,
      tf_min: 0,
      charge_wd: 0,
      charge_tf: 0,
      konversi_coin: 0,
      harga_copy: 0,
      komisi_kontributor: 0,
      komisi_referral: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBtnSubmit = this.handleBtnSubmit.bind(this);
    this.handleEnterSubmit = this.handleEnterSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.res_fee !== undefined && props.res_fee.length !== 0) {
      if (props.res_fee !== state.prevDataProps) {

        return {
          prevDataProps: props.res_fee,
          dp_min: props.res_fee[0].dp_min,
          wd_min: props.res_fee[0].wd_min,
          tf_min: props.res_fee[0].tf_min,

          charge_wd: props.res_fee[0].charge_wd,
          charge_tf: props.res_fee[0].charge_tf,

          konversi_coin: props.res_fee[0].konversi_coin,

          harga_copy: props.res_fee[0].harga_copy,
          komisi_kontributor: props.res_fee[0].komisi_kontributor,
          komisi_referral: props.res_fee[0].komisi_referral,
        };
      }
    }
  }

  handleEnterSubmit = (event) => {
    const key_data = event.target.name;
    let type = "general";
    const data = {
      [key_data]: parseInt(event.target.value,10),
    };
    this.props.dispatch(updateGeneral(data, type));
  };
  handleBtnSubmit = (event, names) => {
    event.preventDefault();
    let type = "general";
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
    if (e === null) {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      // alert(event);
      this.props.dispatch(
        updateGeneral({ sharing_profit_engine: event ? 1 : 0 }, "general")
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
                    <span className="input-group-text">Coin</span>
                  </div>
                  <input
                    type="number"
                    name="dp_min"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.dp_min}
                    maxLength="15"
                    className="form-control"
                    placeholder="Minimal Withdraw"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Minimal Withdrawal</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">Coin</span>
                  </div>
                  <input
                    type="number"
                    name="wd_min"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.wd_min}
                    maxLength="15"
                    className="form-control"
                    placeholder="Minimal Withdrawal"
                  />
                </div>
              </div>
              {/* <div className="form-group">
                <label>Minimal Transfer</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">Coin</span>
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
              </div> */}
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
                    <span className="input-group-text">Rp</span>
                  </div>
                  <input
                    type="number"
                    name="charge_wd"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.charge_wd}
                    maxLength="15"
                    className="form-control"
                    placeholder="Minimal Transer"
                  />
                </div>
              </div>
              {/* <div className="form-group">
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
              </div> */}
            </div>

            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Harga Copy</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">Coin</span>
                  </div>
                  <input
                    type="number"
                    name="harga_copy"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.harga_copy}
                    maxLength="15"
                    className="form-control"
                    placeholder="Harga Copy"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Komisi Kontributor</label>
                <div className="input-group">
                  <div className="input-group-append">
                    <span className="input-group-text">%</span>
                  </div>
                  <input
                    type="number"
                    name="komisi_kontributor"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.komisi_kontributor}
                    maxLength="15"
                    className="form-control"
                    placeholder="Komisi Kontributor"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Komisi Referral</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">%</span>
                  </div>
                  <input
                    type="number"
                    name="komisi_referral"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.komisi_referral}
                    maxLength="15"
                    className="form-control"
                    placeholder="Komisi Referral"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Konversi Coin</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Rp</span>
                  </div>
                  <input
                    type="number"
                    name="konversi_coin"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") this.handleEnterSubmit(event);
                    }}
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.konversi_coin}
                    maxLength="15"
                    className="form-control"
                    placeholder="Konversi Coin"
                  />
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
