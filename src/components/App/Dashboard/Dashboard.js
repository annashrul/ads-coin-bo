import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import moment from "moment";
import "bootstrap-daterangepicker/daterangepicker.css";
// import socketIOClient from "socket.io-client";

import Cards from "./src/Cards";
import Filter from "./src/Filter";
import Chart from "./src/charts";
import Clock from "../../common/clock";
import Default from "assets/default.png";
import { toCurrency } from "../../../helper";
import { FetchBo } from "../../../redux/actions/dashboard/dashboard.action";

// const socket = socketIOClient(HEADERS.URL);
//
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date()).format("yyyy-MM-DD"),
      endDate: moment(new Date()).format("yyyy-MM-DD"),
      saldo_member: 0,
      total_penarikan: 0,
      slot_aktif: 0,
      total_modal: 0,
      total_member: 0,
      member_aktif: [],
      member_omset: {},
      // penjualan_paket:[],
      // saldo_member:0,
      // total_penarikan:0,
      // total_member:0,
      // total_penjualan:0,
      get_sponsor_terbaik: [],
      get_member_baru: [],
      location_data: [],
      location: "-",
      // penjualan_pin:{
      //     series: [{
      //         name: 'series1',
      //         data: [31, 40]
      //     }, {
      //         name: 'series2',
      //         data: [11, 32]
      //     }],
      //     options: {
      //         chart: {
      //             height: 350,
      //             type: 'area'
      //         },
      //         dataLabels: {
      //             enabled: false
      //         },
      //         stroke: {
      //             curve: 'smooth'
      //         },
      //         xaxis: {
      //             type: 'date',
      //             categories: ["2018-09-19", "2018-09-19"]
      //         },
      //         tooltip: {
      //             x: {
      //                 format: 'dd/MM/yy'
      //             },
      //         },
      //     },
      // },
      penjualan_paket: {
        series: [
          {
            name: "series1",
            data: [31, 40],
          },
          {
            name: "series2",
            data: [11, 32],
          },
        ],
        options: {
          chart: {
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "date",
            categories: ["2018-09-19", "2018-09-19"],
          },
          tooltip: {
            x: {
              format: "dd/MM/yy",
            },
          },
        },
      },
      // pie_membership: {
      //     series: [44, 55],
      //     options: {
      //         labels: ['Team A', 'Team B'],
      //         responsive: [{
      //             breakpoint: 480,
      //             options: {
      //                 chart: {
      //                     width: 200
      //                 },
      //                 legend: {
      //                     position: 'bottom'
      //                 }
      //             }
      //         }]
      //     },
      // },
      // pie_karir: {
      //     series: [44, 55],
      //     options: {
      //         labels: ['Team A', 'Team B'],
      //         responsive: [{
      //             breakpoint: 480,
      //             options: {
      //                 chart: {
      //                     width: 200
      //                 },
      //                 legend: {
      //                     position: 'bottom'
      //                 }
      //             }
      //         }]
      //     },
      // },
      // pie_signup: {
      //     series: [44, 55],
      //     options: {
      //         labels: ['Team A', 'Team B'],
      //         responsive: [{
      //             breakpoint: 480,
      //             options: {
      //                 chart: {
      //                     width: 200
      //                 },
      //                 legend: {
      //                     position: 'bottom'
      //                 }
      //             }
      //         }]
      //     },
      // }
    };
    this.handleEvent = this.handleEvent.bind(this);

    // socket.on('refresh_dashboard',(data)=>{
    //     this.refreshData();
    // })

    // socket.on("set_dashboard_bo", (data) => {
    //     this.setState({
    //         penjualan_pin:data.penjualan_pin,
    //         penjualan_paket:data.penjualan_paket,
    //         pie_membership:data.pie_membership,
    //         pie_karir:data.pie_karir,
    //         pie_signup:data.pie_signup,
    //         saldo_member: data.saldo_member,
    //         total_penarikan: data.total_penarikan,
    //         total_member: data.total_member,
    //         total_penjualan: data.total_penjualan,
    //         get_sponsor_terbaik: data.get_sponsor_terbaik,
    //         get_member_baru: data.get_member_baru,
    //     });
    // });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth.user) {
      let lk = [
        {
          value: "-",
          label: "Semua Lokasi",
        },
      ];
      let loc = nextProps.auth.user.lokasi;
      if (loc !== undefined) {
        loc.map((i) => {
          lk.push({
            value: i.kode,
            label: i.nama,
          });
          return null;
        });

        this.setState({
          location_data: lk,
          userid: nextProps.auth.user.id,
        });
      }
    }
    if (this.props.resBo.saldo_member !== undefined) {
      this.setState({
        saldo_member: this.props.resBo.saldo_member,
        total_penarikan: this.props.resBo.total_penarikan,
        slot_aktif: this.props.resBo.slot_aktif,
        total_modal: this.props.resBo.total_modal,
        total_member: this.props.resBo.total_member,
        member_aktif: this.props.resBo.member_aktif,
        member_omset: this.props.resBo.member_omset,
        penjualan_paket: this.props.resBo.penjualan_paket,
      });
      console.log("object", this.props.resBo);
    }
    console.log("object", this.props.resBo);
  };

  refreshData(start = null, end = null) {
    // socket.emit('get_dashboard_bo', {
    //     datefrom: start!==null?start:this.state.startDate,
    //     dateto: end!==null?end:this.state.endDate,
    // })
  }

  componentWillMount() {
    this.props.dispatch(FetchBo());
    this.refreshData();
    // this.props.dispatch(CheckDaily());
  }

  componentWillUnmount() {
    localStorage.removeItem("startDateProduct");
    localStorage.removeItem("endDateDashboard");
  }

  onChange = (date) => this.setState({ date });

  handleEvent = (event, picker) => {
    // end:  2020-07-02T16:59:59.999Z
    const awal = picker.startDate._d.toISOString().substring(0, 10);
    const akhir = picker.endDate._d.toISOString().substring(0, 10);
    this.setState({
      startDate: awal,
      endDate: akhir,
    });
    this.refreshData(awal, akhir);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(
      FetchBo(`datefrom=${this.state.startDate}&dateto=${this.state.endDate}`)
    );
    // this.refreshData();
  };

  render() {
    return (
      <Layout page="Dashboard">
        <div className="row align-items-center">
          <div className="col-6">
            <div className="dashboard-header-title mb-3">
              <Filter
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                handleEvent={this.handleEvent}
              />
            </div>
          </div>
          {/* Dashboard Info Area */}
          <div className="col-6">
            <div className="dashboard-infor-mation d-flex flex-wrap align-items-center mb-3">
              <div className="dashboard-clock">
                <div id="dashboardDate" className="text-muted">
                  {moment().format("dddd, Do MMM YYYY")}
                </div>
                <Clock />
              </div>
              <div className="dashboard-btn-group d-flex align-items-center">
                <button
                  type="button"
                  onClick={(e) => this.handleSubmit(e)}
                  className="btn btn-primary ml-1 float-right"
                >
                  <i className="fa fa-refresh" />
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-12" style={{ zoom: "90%" }}>
            {/* Dashboard Widget Area */}
            <div className="row">
              <Cards
                classCols="col-md-6 col-xl-3 box-margin"
                title="TOTAL SALDO MEMBER"
                data={toCurrency(this.state.saldo_member)}
                icon="fa fa-money"
              />
              <Cards
                classCols="col-md-6 col-xl-3 box-margin"
                title="TOTAL MODAL"
                data={toCurrency(this.state.total_modal)}
                icon="fa fa-shopping-cart "
              />
              <Cards
                classCols="col-md-6 col-xl-3 box-margin"
                title="MEMBER AKTIF"
                data={this.state.total_member}
                icon="fa fa-users "
              />
              <Cards
                classCols="col-md-6 col-xl-3 box-margin"
                title="SLOT AKTIF"
                data={this.state.slot_aktif}
                icon="fa fa-list "
              />
            </div>
            {/* Dashboard Widget Area */}
          </div>
        </div>
        <div className="row">
          {/* <div className="col-md-7 box-margin">
                        <Chart
                        data={this.state.penjualan_pin}
                        title="Penjualan PIN"
                        type="area"
                        height={300} />
                    </div> */}
          {/* <div className="col-md-5 col-xl-5 box-margin">
                        <Chart
                        style={{marginTop:'30px'}}
                        data={this.state.pie_membership}
                        title="Membership Status"
                        type="pie"
                        height={300} />
                    </div> */}
        </div>
        <div className="row">
          {/* <div className="col-md-5 col-xl-5 box-margin">
                        <Chart
                        style={{marginTop:'30px'}}
                        data={this.state.pie_karir}
                        title="Jenjang Karir Member"
                        type="pie"
                        height={300} />
                    </div> */}
          <div className="col-md-12 box-margin">
            <Chart
              data={this.state.penjualan_paket}
              title="Penjualan Paket"
              type="area"
              height={300}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-xl-6 box-margin">
            <div className="card">
              <div className="card-header bg-transparent user-area d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0">
                  Member Dengan Slot Terbanyak
                </h5>
              </div>
              <div
                className="card-body"
                style={{ overflowX: "auto", height: "300px" }}
              >
                <ul className="total-earnings-list">
                  {this.state.member_aktif.length > 0
                    ? this.state.member_aktif.map((item, i) => (
                        <li key={i}>
                          <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                              <img
                                src={item.foto}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `${Default}`;
                                }}
                                alt={item.fullname}
                              />
                            </div>
                            <div className="author-text">
                              <h6 className="mb-0 text-light">
                                {item.fullname}
                              </h6>
                              <p
                                className="mb-0 text-muted"
                                style={{ fontSize: ".7em" }}
                              >
                                Slot Aktif: {item.slot_active}
                              </p>
                            </div>
                          </div>
                          {/*<a href={"#"} className="text-light badge badge-primary">{item.membership}</a>*/}
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-6 box-margin">
            <div className="card">
              <div className="card-header bg-transparent user-area d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0">
                  Member Dengan Omset Terbanyak
                </h5>
              </div>
              <div
                className="card-body"
                style={{ overflowX: "auto", height: "300px" }}
              >
                <ul className="total-earnings-list">
                  {this.state.member_omset.length > 0
                    ? this.state.member_omset.map((item, i) => (
                        <li key={i}>
                          <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                              <img
                                src={item.foto}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `${Default}`;
                                }}
                                alt={item.fullname}
                              />
                            </div>
                            <div className="author-text">
                              <h6 className="mb-0 text-light">
                                {item.fullname}
                              </h6>
                              <p
                                className="mb-0 text-muted"
                                style={{ fontSize: ".7em" }}
                              >
                                Downline Omset:{" "}
                                {toCurrency(item.downline_omset)}
                              </p>
                            </div>
                          </div>
                          {/*<a href={"#"} className="text-light badge badge-primary">{item.membership}</a>*/}
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-xl-4 box-margin d-none">
            <div className="card">
              <div className="card-header bg-transparent user-area d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0">
                  10 Sponsor Terbaik
                </h5>
              </div>
              <div
                className="card-body"
                style={{ overflowX: "auto", height: "340px" }}
              >
                <ul className="total-earnings-list">
                  {this.state.get_sponsor_terbaik.length > 0
                    ? this.state.get_sponsor_terbaik.map((item, i) => (
                        <li key={i}>
                          <div className="author-info d-flex align-items-center">
                            <div className="author-img mr-3">
                              <img
                                src={item.picture}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `${Default}`;
                                }}
                                alt={item.title}
                              />
                            </div>
                            <div className="author-text">
                              <h6 className="mb-0">
                                {item.full_name}{" "}
                                <img
                                  src={item.membership}
                                  width={20}
                                  alt={item.title}
                                />
                              </h6>
                              <p className="mb-0">{item.jenjang_karir}</p>
                            </div>
                          </div>
                          <p className="text-light badge badge-warning">
                            {item.sponsor}
                            <br />
                            Sponsor
                          </p>
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-xl-5 box-margin">
            {/* <Chart
                        style={{marginTop:'30px'}}
                        data={this.state.pie_signup}
                        title="Platform Pendaftaran"
                        type="pie"
                        height={300} /> */}
          </div>
        </div>
      </Layout>
    );
  }
}
// Dashboard.propTypes = {
//     auth: PropTypes.object
// }

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    stock: state.dashboardReducer.data,
    resBo: state.dashboardReducer.data_bo,
    isLoading: state.dashboardReducer.isLoadingBo,
    // skipped: state.transactionReducer.skipped,
    // isLoadingCheck: state.transactionReducer.isLoadingCheck,
  };
};

export default connect(mapStateToProps)(Dashboard);
