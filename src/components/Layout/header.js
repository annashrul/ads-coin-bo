import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "redux/actions/authActions";
import PropTypes from "prop-types";
import { setEcaps } from "redux/actions/site.action";
import { setMobileEcaps } from "redux/actions/site.action";
import { Link } from "react-router-dom";
import isMobile from "react-device-detect";
import BgAuth from "assets/logo.png";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { noImage } from "../../helper";
// import socketIOClient from "socket.io-client";

// const socket = socketIOClient(HEADERS.URL);

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleEcaps = this.handleEcaps.bind(this);
    this.handleMobileEcaps = this.handleMobileEcaps.bind(this);
    this.handleToggleMobileNav = this.handleToggleMobileNav.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      toggleMobileNav: false,
      isShowNotif: false,
      isDay: 7,
      tanggal_tempo: "",
      server_price: "",
      acc_name: "",
      acc_number: "",
      invest: [],
      withdraw: [],
      user: [],
      contact: [],
      isSetHeightInvest: false,
      isSetHeightWithdraw: false,
      isSetHeightUser: false,
      isSetHeightContact: false,
      isNotif: false,
    };
  }

  handleLogout = () => {
    this.props.logoutUser();
  };

  handleEcaps = () => {
    const bool = !this.props.triggerEcaps;
    this.props.setEcaps(bool);
  };
  handleMobileEcaps = () => {
    const bool = !this.props.triggerMobileEcaps;
    this.props.setMobileEcaps(bool);
  };
  handleToggleMobileNav = () => {
    this.setState({
      toggleMobileNav: !this.state.toggleMobileNav,
    });
  };
  componentWillMount() {}

  handleUpdate = (e, id, param) => {
    e.preventDefault();
    this.props.putInbox({ status: 1 }, id);
    this.refreshData();
    this.setState({});
    // this.props.updateContact({status:1},id);

    // this.props.dispatch(putInbox({status:1},id));
    // this.props.dispatch(putInbox({status:1},id));
  };

  render() {
    return (
      // <!-- Top Header Area -->
      <header
        className="top-header-area d-flex align-items-center justify-content-between  "
        style={{
          boxShadow: "none",
          backgroundColor: !isMobile ? "" : "#242939",
        }}
      >
        <div className="left-side-content-area d-flex align-items-center">
          {/* Mobile Logo */}
          <div className="mobile-logo mr-3 mr-sm-4">
            <Link to={"./"}>
              <img
                src={BgAuth}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${noImage()}`;
                }}
                alt="Mobile Logo"
              />
            </Link>
          </div>
          {/* <!-- Triggers --> */}
          <div className="ecaps-triggers mr-1 mr-sm-3">
            <div
              className="menu-collasped"
              id="menuCollasped"
              onClick={(e) => {
                e.preventDefault();
                this.handleEcaps();
              }}
            >
              <i className="zmdi zmdi-menu" style={{ color: "white" }} />
            </div>
            <div
              className="mobile-menu-open"
              id="mobileMenuOpen"
              onClick={(e) => {
                e.preventDefault();
                this.handleMobileEcaps();
              }}
            >
              <i className="zmdi zmdi-menu" />
            </div>
          </div>

          {/* <!-- Left Side Nav --> */}
          <ul className="left-side-navbar d-flex align-items-center"></ul>
        </div>

        <div className="right-side-navbar d-flex align-items-center justify-content-end">
          {/* <!-- Mobile AREAAAAAA --> */}
          <div
            className="right-side-trigger"
            style={{
              width: "unset",
              height: "unset",
              marginRight: "unset",
            }}
          >
            <div
              className="nav-item dropdown"
              style={{ listStyleType: "none" }}
            >
              <UncontrolledButtonDropdown nav>
                <DropdownToggle caret className="nohover">
                  <img
                    src={this.props.auth.user.foto}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${noImage()}`;
                    }}
                    alt=""
                  />
                </DropdownToggle>
                <DropdownMenu right>
                  <div className="user-profile-area">
                    <div className="user-profile-heading">
                      <div className="profile-img">
                        <img
                          className="chat-img mr-2"
                          src={this.props.auth.user.foto}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${noImage()}`;
                          }}
                          alt=""
                        />
                      </div>
                      <div className="profile-text">
                        <h6>{this.props.auth.user.name}</h6>
                        <span className="text-white">
                          {this.props.auth.user.level}
                        </span>
                      </div>
                    </div>
                    <DropdownItem onClick={this.handleLogout}>
                      <i
                        className="fa fa-chain-broken profile-icon bg-warning"
                        aria-hidden="true"
                      />{" "}
                      Sign-out
                    </DropdownItem>
                  </div>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </div>

          {/* <!-- END Mobile AREAAAAAA --> */}

          {/* <!-- Top Bar Nav --> */}
          <ul
            className={
              "right-side-content d-flex align-items-center " +
              (this.state.toggleMobileNav === true ? "active" : "")
            }
          >
            <div className="nav-item dropdown">
              <UncontrolledButtonDropdown nav>
                <DropdownToggle caret className="nohover">
                  <img
                    src={this.props.auth.user.foto}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${noImage()}`;
                    }}
                    alt=""
                  />
                  <div className="user-name">
                    <table>
                      <thead>
                        <tr>
                          <td className="fs1">
                            <p>{this.props.auth.user.name}</p>
                            <span className="text-white">
                              {this.props.auth.user.level}
                            </span>
                          </td>
                          <td className="fs1" style={{ paddingLeft: "10px" }}>
                            <p>
                              <i className="fa fa-angle-down lnr" />
                            </p>
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </DropdownToggle>
                <DropdownMenu right>
                  <div className="user-profile-area">
                    <div className="user-profile-heading">
                      <div className="profile-img">
                        <img
                          className="chat-img mr-2"
                          src={this.props.auth.user.foto}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${noImage()}`;
                          }}
                          alt=""
                        />
                      </div>
                      <div className="profile-text">
                        <h6>{this.props.auth.user.name}</h6>
                        <span>{this.props.auth.user.level}</span>
                      </div>
                    </div>
                    <DropdownItem onClick={this.handleLogout}>
                      <i
                        className="fa fa-chain-broken profile-icon bg-warning"
                        aria-hidden="true"
                      />{" "}
                      Sign-out
                    </DropdownItem>
                  </div>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </ul>
        </div>
      </header>
    );
  }
}
Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  setEcaps: PropTypes.func.isRequired,
  setMobileEcaps: PropTypes.func.isRequired,
  auth: PropTypes.object,
  triggerEcaps: PropTypes.bool,
  triggerMobileEcaps: PropTypes.bool,
};

const mapStateToProps = ({ auth, siteReducer }) => {
  return {
    auth: auth,
    triggerEcaps: siteReducer.triggerEcaps,
    triggerMobileEcaps: siteReducer.triggerMobileEcaps,
  };
};

export default connect(mapStateToProps, {
  logoutUser,
  setEcaps,
  setMobileEcaps,
})(Header);
