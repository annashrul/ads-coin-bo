import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import moment from "moment";
import "bootstrap-daterangepicker/daterangepicker.css";

import Cards from "./src/Cards";
import Filter from "./src/Filter";
import Chart from "./src/charts";
import Clock from "../../common/clock";
import Default from "assets/default.png";
import { toCurrency } from "../../../helper";
import { FetchBo } from "../../../redux/actions/dashboard/dashboard.action";
import { Button, Icon, Nav, Rate } from "rsuite";
import { getMemberTopKontributor } from "../../../redux/actions/masterdata/member.action";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";

// const socket = socketIOClient(HEADERS.URL);
//
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date()).format("yyyy-MM-DD"),
      endDate: moment(new Date()).format("yyyy-MM-DD"),
      saldo_member: 0,
      total_komisi_perusahaan: 0,
      slot_aktif: 0,
      total_omset_penjualan: 0,
      total_member_aktif: 0,
      selectedIndex: 0,
      member_aktif: [],
      member_omset: {},
      recent_order: [],
      get_sponsor_terbaik: [],
      get_member_baru: [],
      location_data: [],
      location: "-",
      chart_column_omset: {
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
      chart_pie_penjualan: {
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
    };
    this.handleEvent = this.handleEvent.bind(this);

    // socket.on('refresh_dashboard',(data)=>{
    //     this.refreshData();
    // })

    // socket.on("set_dashboard_bo", (data) => {
    //     this.setState({
    //         penjualan_pin:data.penjualan_pin,
    //         chart_column_omset:data.chart_column_omset,
    //         pie_membership:data.pie_membership,
    //         pie_karir:data.pie_karir,
    //         pie_signup:data.pie_signup,
    //         saldo_member: data.saldo_member,
    //         total_komisi_perusahaan: data.total_komisi_perusahaan,
    //         total_member_aktif: data.total_member_aktif,
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
    if (this.props.resBo.widget !== undefined) {
      this.setState({
        saldo_member: this.props.resBo.widget.total_saldo_member,
        total_komisi_perusahaan: this.props.resBo.widget.total_komisi_perusahaan,
        total_omset_penjualan: this.props.resBo.widget.total_omset_penjualan,
        total_member_aktif: this.props.resBo.widget.total_member_aktif,
        slot_aktif: this.props.resBo.slot_aktif,
        member_aktif: this.props.resBo.member_aktif,
        member_omset: this.props.resBo.member_omset,
        chart_column_omset: this.props.resBo.chart_column_omset,
        chart_pie_penjualan: this.props.resBo.chart_pie_penjualan,
        recent_order: this.props.resBo.recent_order,
      });
    }
  };

  refreshData(start = null, end = null) {
    // socket.emit('get_dashboard_bo', {
    //     datefrom: start!==null?start:this.state.startDate,
    //     dateto: end!==null?end:this.state.endDate,
    // })
  }

  componentWillMount() {
    this.props.dispatch(FetchBo());
    this.props.dispatch(getMemberTopKontributor(1,`&type=${this.state.selectedIndex===0?'penjualan':'rating'}`));
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
  handleSelect = (index) => {
    this.props.dispatch(getMemberTopKontributor(1,`&type=${index===0?'penjualan':'rating'}`));
    this.setState({ selectedIndex: index }, () => {});
  };
  render() {
    
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
                <Button
                  size="md"
                  color="blue"
                  appearance="default"
                  className=""
                  onClick={(e) => this.handleSubmit(e)}>
                  <Icon icon="refresh" />
                </Button>
              </div>
            </div>
          </div>

          <div className="col-md-12" style={{ zoom: "90%" }}>
            {/* Dashboard Widget Area */}
            <div className="row">
              <Cards
                classCols="col-md-6 col-xl-3 box-margin"
                title="TOTAL SALDO MEMBER"
                data={toCurrency(parseFloat(this.state.saldo_member).toFixed(2))}
                icon="fa fa-money"
              />
              <Cards
                classCols="col-md-6 col-xl-3 box-margin"
                title="TOTAL OMSET PENJUALAN"
                data={toCurrency(parseFloat(this.state.total_omset_penjualan).toFixed(2))}
                icon="fa fa-shopping-cart "
              />
              <Cards
                classCols="col-md-6 col-xl-3 box-margin"
                title="TOTAL MEMBER AKTIF"
                data={this.state.total_member_aktif}
                icon="fa fa-users "
              />
              <Cards
                classCols="col-md-6 col-xl-3 box-margin"
                title="TOTAL KOMISI PERUSAHAAN"
                data={toCurrency(parseFloat(this.state.total_komisi_perusahaan).toFixed(2))}
                icon="fa fa-list "
              />
            </div>
            {/* Dashboard Widget Area */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 box-margin">
            <Chart
              data={this.state.chart_column_omset}
              title="OMSET"
              type="bar"
              height={300}
            />
          </div>
          <div className="col-md-4 box-margin">
            <Chart
              data={this.state.chart_pie_penjualan}
              title="Penjualan"
              type="pie"
              height={300}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 box-margin">
            <div className="card">
              <div className="card-header bg-transparent user-area d-flex align-items-center justify-content-between">
                  <h4 className="card-title mt-3">KONTRIBUTOR TERATAS</h4>
                  <Nav style={{ backgroundColor: "transparent" }} appearance="subtle" activeKey={this.state.selectedIndex}>
                    {/* Filter : &nbsp; */}
                    <Nav.Item active={this.state.selectedIndex===0} eventKey={0} onSelect={() => this.handleSelect(0)}>Penjualan</Nav.Item>
                    <Nav.Item active={this.state.selectedIndex===1} eventKey={1} onSelect={() => this.handleSelect(1)}>Rating</Nav.Item>
                  </Nav>
              </div>
              <div className="card-body" style={{height: '355px', overflowY: 'auto'}}>
                {
                  this.props.resTop.length!==0?
                  (
                      this.props.resTop.map((i,_inx)=>{
                          return(
                              <div className="widget-download-file d-flex align-items-center justify-content-between mb-4">
                                  <div className="d-flex align-items-center mr-3">
                                      <div className="download-file-icon mr-3" style={{padding:'unset', backgroundColor:'grey'}}>
                                          <img src={i.foto} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} alt="img" className="thumb-md mb-2 mr-2 rounded-circle" style={{maxHeight:'unset', width:'40px', height:'40px'}}></img>
                                      </div>
                                      <div className="user-text-table">
                                      <h6 className="d-inline-block font-15 mb-0">{i.fullname} - {i.referral}</h6>
                                      <p className="mb-0">Penjualan : {i.copy_terjual} copy</p>
                                      </div>
                                  </div>
                                  <Rate defaultValue={i.rating} allowHalf readOnly />
                              </div>
                          )
                      })
                  )
                  :
                  (
                      <div style={{textAlign:'center',fontSize:"11px",fontStyle:"italic"}}>Tidak tersedia.</div>
                  )
                }
              </div>
            </div>
          </div>
          <div className="col-md-7 box-margin">
            <div className="card">
              <div className="card-header bg-transparent user-area d-flex align-items-center justify-content-between">
                  <h4 className="card-title mt-3">10 ORDERAN TERAKHIR</h4>
              </div>
              <div className="card-body" style={{height: '355px', overflowY: 'auto'}}>
                
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-hover  table-noborder"><thead>
                      <tr>
                        <th rowSpan="2" style={columnStyle}>
                          DETAIL PEMBELI
                        </th>
                        <th rowSpan="2" style={columnStyle}>
                          PENJUAL
                        </th>
                        <th rowSpan="2" style={columnStyle}>
                          CHANEL
                          <br/>
                          PEMBAYARAN
                        </th>
                        <th rowSpan="2" style={columnStyle}>
                          BIAYA
                          <br/>
                          ADMIN
                        </th>
                        <th rowSpan="2" style={columnStyle}>
                          GRAND
                          <br/>
                          TOTAL
                        </th>
                        <th rowSpan="2" style={columnStyle}>
                          DETAIL PEMBELIAN
                        </th>
                        <th rowSpan="2" style={columnStyle}>
                          STATUS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.recent_order.length!==0 ? (
                          this.state.recent_order.map((v,i)=>{
                            let status = "";
                            if (v.status === 0) {
                              status = (
                                <span className={"badge badge-warning"}>Pending</span>
                              );
                            }
                            if (v.status === 1) {
                              status = (
                                <span className={"badge badge-success"}>Sukses</span>
                              );
                            }
                            if (v.status === 2) {
                              status = (
                                <span className={"badge badge-danger"}>Gagal</span>
                              );
                            }
                            return (
                              <tr key={i}>
                                <td style={{...cusStyle, width:'1%'}}>
                                  <strong className="text-dark">{v.kd_trx}</strong>
                                  <br />
                                  <small>a/n</small> &bull; <strong className="text-dark">{v.fullname}</strong>
                                </td>
                                <td style={cusStyle} className="poin">
                                  <small className="text-dark">
                                    {v.seller}
                                  </small>
                                </td>
                                <td style={columnStyle}>
                                  <small className="text-dark">
                                    {v.payment_channel}
                                  </small>
                                </td>
                                <td style={cusStyle} className="poin">
                                  <strong className="text-dark">
                                    {toCurrency(v.biaya_admin)}
                                  </strong>
                                </td>
                                <td style={cusStyle} className="poin">
                                  <strong className="text-dark">
                                    {toCurrency(v.grand_total)}
                                  </strong>
                                </td>
                                <td style={cusStyle}>
                                  <div
                                    class="row"
                                    style={{
                                      verticalAlign: "middle",
                                      paddingTop: "13px",
                                      width:'max-content'
                                    }}
                                  >
                                    <div class="mx-2">
                                      <img
                                        src={v.image_product}
                                        className=""
                                        onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} 
                                        alt=""
                                        style={{ height: "50px", width: "100px" }}
                                      />
                                    </div>
                                    <p className="text-left text-dark">
                                      {v.title}
                                      <br />
                                      <small className="txtGreen">
                                        Preview : <b>{v.preview}</b>
                                      </small>
                                    </p>
                                  </div>
                                </td>

                                <td style={{...cusStyle, width:'1%'}}>{status}</td>
                              </tr>
                            );
                          })
                        ) : (
                        <tr>
                          <td colSpan={9} style={columnStyle}>
                            <img alt={"-"} src={`${NOTIF_ALERT.NO_DATA}`} />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>


                  {/* {
                      this.state.recent_order.length!==0?
                      (
                          this.state.recent_order.map((i,_inx)=>{
                              return(
                                  <div className="widget-download-file d-flex align-items-center justify-content-between mb-4">
                                      <div className="d-flex align-items-center mr-3">
                                          <div className="download-file-icon mr-3" style={{padding:'unset', backgroundColor:'grey'}}>
                                              <img src={i.image_product} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}} alt="img" className="thumb-md rounded-circle" style={{maxHeight:'unset', width:'40px', height:'40px'}}></img>
                                          </div>
                                          <div className="user-text-table">
                                          <h6 className="d-inline-block font-15 mb-0">{i.kd_trx} - {i.title}</h6>
                                          <p className="mb-0">{i.fullname}</p>
                                          </div>
                                      </div>
                                      <a href="about:blank" className={"download-link badge badge-info badge-pill"} style={{padding:'8px'}}>{i.category}</a>
                                  </div>
                              )
                          })
                      )
                      :
                      (
                          <div style={{textAlign:'center',fontSize:"11px",fontStyle:"italic"}}>Tidak tersedia.</div>
                      )
                  } */}
                  
              </div>
            </div>
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
    resTop: state.memberReducer.data_top_kontributor,
    

    // skipped: state.transactionReducer.skipped,
    // isLoadingCheck: state.transactionReducer.isLoadingCheck,
  };
};

export default connect(mapStateToProps)(Dashboard);
