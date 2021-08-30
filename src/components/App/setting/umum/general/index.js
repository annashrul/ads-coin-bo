import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import Preloader from "../../../../../Preloader";
import { updateGeneral } from "../../../../../redux/actions/setting/general.action";


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTypeOtp = this.handleTypeOtp.bind(this);
    this.handleProviderOtp = this.handleProviderOtp.bind(this);
    this.handleBtnSubmit = this.handleBtnSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.res_general !== undefined && props.res_general.length !== 0) {
      if (props.res_general !== state.prevDataProps) {
        // props.dispatch(fetchKota(props.res_general[0].id_prov));
        // props.dispatch(fetchKecamatan(props.res_general[0].id_kota));

        return {
          prevDataProps: props.res_general,
          type_otp: props.res_general[0].type_otp,
          provider_otp: props.res_general[0].provider_otp,
          jenis_login: props.res_general[0].jenis_login,
          otp_message: props.res_general[0].otp_message,
          aktivasi_message: props.res_general[0].aktivasi_message,
          transaksi_message: props.res_general[0].transaksi_message,
        };
      }
    }
  }

  handleTypeOtp(val) {
    this.props.dispatch(
      updateGeneral(
        {
          type_otp: val.value,
        },
        "general"
      )
    );

    this.setState({
      type_otp: val.value,
    });
  }

  handleProviderOtp(val) {
    this.props.dispatch(
      updateGeneral(
        {
          provider_otp: val.value,
        },
        "general"
      )
    );

    this.setState({
      provider_otp: val.value,
    });
  }

  handleBtnSubmit = (event, names) => {
    event.preventDefault();
    let type = "site";
    if (
      names === "otp_message" ||
      names === "aktivasi_message" ||
      names === "transaksi_message"
    )
      type = "general";
    const data = {
      [names]: this.state[names],
    };
    this.props.dispatch(updateGeneral(data, type));
  };

  handleChange = (event) => {
    // console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    if (this.props.isLoading) return <Preloader/>

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
            Konfigurasi Umum
          </h4>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>Tipe OTP</label>
                <Select
                  options={this.state.dataTipeOTP}
                  placeholder="Pilih Tipe OTP"
                  onChange={this.handleTypeOtp}
                  value={this.state.dataTipeOTP.find((op) => {
                    return op.value === this.state.type_otp;
                  })}
                />
              </div>

              {this.state.type_otp !== "gabungan" ? (
                <div className="form-group">
                  <label>Provider OTP</label>
                  <Select
                    options={this.state.dataProvider}
                    placeholder="Pilih Provider OTP"
                    onChange={this.handleProviderOtp}
                    value={this.state.dataProvider.find((op) => {
                      return op.value === this.state.provider_otp;
                    })}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="form-group">
                <label>
                  Pesan OTP{" "}
                  <button
                    className="badge badge-success"
                    onClick={(event) =>
                      this.handleBtnSubmit(event, "otp_message")
                    }
                  >
                    Simpan
                  </button>
                </label>
                <textarea
                  rows={4}
                  className="form-control"
                  onChange={(event) => this.handleChange(event)}
                  name="otp_message"
                  value={this.state.otp_message}
                ></textarea>
              </div>
              <div className="form-group">
                <label>
                  Pesan Kode Aktivasi{" "}
                  <button
                    className="badge badge-success"
                    onClick={(event) =>
                      this.handleBtnSubmit(event, "aktivasi_message")
                    }
                  >
                    Simpan
                  </button>
                </label>
                <textarea
                  rows={4}
                  className="form-control"
                  onChange={(event) => this.handleChange(event)}
                  name="aktivasi_message"
                  value={this.state.aktivasi_message}
                ></textarea>
              </div>
              <div className="form-group">
                <label>
                  Pesan Transaksi OTP{" "}
                  <button
                    className="badge badge-success"
                    onClick={(event) =>
                      this.handleBtnSubmit(event, "transaksi_message")
                    }
                  >
                    Simpan
                  </button>
                </label>
                <textarea
                  rows={4}
                  className="form-control"
                  onChange={(event) => this.handleChange(event)}
                  name="transaksi_message"
                  value={this.state.transaksi_message}
                ></textarea>
              </div>
              <div className="text-white">
                <h6 className="text-warning">Note:</h6>
                <ul>
                  <li>- Gunakan [nama] untuk nama member secara dinamis.</li>
                  <li>
                    - Gunakan [otp] untuk mengeluarkan kode (otp/aktivasi)
                    secara dinamis.
                  </li>
                  <li>
                    - Untuk memberi <b>Bold</b> pada pesan gunakan tanda '*'
                    pada awal dan akhir kalimat. <br />
                    Cth: *ini text bold*
                  </li>
                </ul>
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
