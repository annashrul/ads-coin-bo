import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import SideMenu from "./sideMenu";
import { connect } from "react-redux";
import Default from "assets/default.png";
import { logoutUser } from "redux/actions/authActions";
import PropTypes from "prop-types";
import BgAuth from "assets/logo.png";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.mouseEnterHandle = this.mouseEnterHandle.bind(this);
    this.mouseOutHandle = this.mouseOutHandle.bind(this);
    this.state = {
      sideHover: "deactive",
    };
  }

  componentWillMount() {
    this.getProps(this.props);
  }
  handleLogout = () => {
    this.props.logoutUser();
  };
  getFaviconEl() {
    return document.getElementById("favicon");
  }
  getTimeout() {
    return document.getElementById("coolyeah").value;
  }

  getProps(param) {}

  componentDidMount() {
    this.getProps(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth.user) {
      const favicon = this.getFaviconEl(); // Accessing favicon element
      favicon.href = nextProps.auth.user.fav_icon;
      document.title = `ADS-COIN - ${this.props.page}`;
      this.getProps(nextProps);
    }
  };

  mouseEnterHandle() {
    this.setState({
      sideHover: "active",
    });
  }
  mouseOutHandle() {
    this.setState({
      sideHover: "deactive",
    });
  }

  render() {
    return (
      <div
        className={
          this.props.triggerEcaps
            ? "ecaps-page-wrapper sidemenu-hover-" +
              this.state.sideHover +
              " menu-collasped-active"
            : "ecaps-page-wrapper " +
              (this.props.triggerMobileEcaps ? "mobile-menu-active" : "")
        }
      >
        {/* Side Menu */}
        <div
          className="ecaps-sidemenu-area "
          onMouseEnter={this.mouseEnterHandle}
          onMouseLeave={this.mouseOutHandle}
          style={{ boxShadow: "none" }}
        >
          {/* Desktop Logo */}
          <div className="ecaps-logo " style={{ boxShadow: "none" }}>
            <Link to="/">
              <img
                className="desktop-logo"
                src={BgAuth}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${Default}`;
                }}
                alt="Desktop Logo"
                style={{ maxHeight: "30px" }}
              />{" "}
              <img
                className="small-logo"
                src={BgAuth}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${Default}`;
                }}
                alt="Mobile Logo"
              />
            </Link>
          </div>
          {/* Side Nav */}
          <div
            className="slimScrollDiv "
            style={{
              position: "relative",
              width: "auto",
              height: "100%",
              boxShadow: "none",
            }}
          >
            <div
              className="ecaps-sidenav"
              id="ecapsSideNav"
              style={{ overflowY: "unset", width: "auto", height: "100%" }}
            >
              <div
                className="side-menu-area "
                style={{ paddingRight: "8px", marginTop: "unset" }}
              >
                {/* Sidebar Menu */}
                <SideMenu />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}

        <div className="ecaps-page-content">
          {/* Top Header Area */}
          <Header />
          {/* Main Content Area */}
          <div className="main-content">
            <div className="container-fluid">
              {/* content */}
              {this.props.children}
            </div>
          </div>
          {/* Page Footer*/}
          {/* <Footer/>        */}
        </div>
      </div>
    );
  }
}
Layout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, siteReducer }) => {
  return {
    auth: auth,
    triggerEcaps: siteReducer.triggerEcaps,
    triggerMobileEcaps: siteReducer.triggerMobileEcaps,
  };
};
export default connect(mapStateToProps, { logoutUser })(Layout);
