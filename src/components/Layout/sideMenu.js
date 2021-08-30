import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "redux/actions/authActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Preloader from "../../Preloader";
import OneMenu from "../common/oneMenu";
import TwoMenu from "../common/twoMenu";
import ThreeMenu from "../common/threeMenu";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aksesMember: [],
      token: "",
    };
  }
  menuChange(argument) {
    let arr = this.state.aksesMember;
    arr.forEach((v) => {
      if (argument.parent === v.label && argument.child === "") {
        v.isToggle = !v.isToggle;
      } else {
        v.isToggle = false;
      }
      if (v.sub !== undefined) {
        v.sub.forEach((row) => {
          if (argument.parent === v.label && argument.child !== "") {
            if (argument.child === row.label) {
              v.isToggle = true;
              row.isToggle = !row.isToggle;
            } else {
              row.isToggle = false;
            }
          }
        });
      }
    });
    this.setState({ aksesMember: arr });
  }
  handleToggle(props, array) {
    const path = props.location.pathname;
    array.forEach((v) => {
      v.isToggle = false;
      if (v.sub !== undefined) {
        v.sub.forEach((val) => {
          if (val.sub === undefined) {
            if (val.path === path) {
              if (val.parent === v.label) {
                v.isToggle = !v.isToggle;
              }
            }
          }
          val.isToggle = false;
          if (val.sub !== undefined) {
            val.sub.forEach((row) => {
              if (row.path === path) {
                v.isToggle = true;
                val.isToggle = !val.isToggle;
              }
            });
          }
        });
      }
    });
    this.setState({ aksesMember: array });
  }
  getProps(param) {
    if (param.auth.user) {
      if (param.auth.user !== undefined) {
        let akses = param.auth.user.access_level;
        if (akses !== undefined) {
          this.handleToggle(param, akses);
          this.setState({ token: param.auth.user.token });
          // console.log(param.auth.user);
        }
      }
    }
  }
  componentWillMount() {
    this.getProps(this.props);
  }
  componentDidMount() {
    this.getProps(this.props);
  }
  componentWillReceiveProps = (nextProps) => {
    this.getProps(nextProps);
  };
  handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin akan logout aplikasi?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya!",
    }).then((result) => {
      if (result.value) {
        this.props.logoutUser();
      }
    });
  };

  render() {
    const path = this.props.location.pathname;
    const { aksesMember } = this.state;
    return this.props.auth.user.access_level === undefined ? (
      <Preloader />
    ) : (
      <nav>
        <ul className="sidebar-menu" data-widget="tree">
          <OneMenu
            display={"1"}
            isActive={path === "/" ? "active" : ""}
            path={"/"}
            icon={"fa fa-dashboard"}
            label={"Dashboard"}
          />
          {(() => {
            let child = [];
            aksesMember.forEach((val, idx) => {
              if (val.sub === undefined && val.otherSub === undefined) {
                child.push(
                  <OneMenu
                    key={idx}
                    display={val.isChecked}
                    isActive={path === val.path ? "active" : ""}
                    path={`${val.path}`}
                    icon={val.icons}
                    label={val.label}
                  />
                );
              } else if (val.sub !== undefined && val.otherSub === undefined) {
                child.push(
                  <TwoMenu
                    key={idx}
                    changeMenu={this.menuChange.bind(this)}
                    isActive={val.isToggle}
                    isDisplay={val.isChecked}
                    arg1={val.label}
                    arg2={""}
                    icon={val.icons}
                    label={val.label}
                    path={path}
                    data={(() => {
                      let subChild = [];
                      val.sub.forEach((menuVal) => {
                        if (menuVal.label !== "") {
                          subChild.push({
                            path: menuVal.path,
                            display: menuVal.isChecked,
                            label: menuVal.label,
                          });
                        }
                        return null;
                      });
                      return subChild;
                    })()}
                  />
                );
              } else {
                child.push(
                  <ThreeMenu
                    key={idx}
                    changeMenu={this.menuChange.bind(this)}
                    changeSubMenu={this.menuChange.bind(this)}
                    isActive={val.isToggle}
                    isDisplay={val.isChecked}
                    arg1={val.label}
                    arg2={""}
                    label={val.label}
                    path={path}
                    icon={val.icons}
                    data={(() => {
                      let subChild = [];
                      val.sub.forEach((valKey) => {
                        subChild.push({
                          isActive: valKey.isToggle,
                          isDisplay: valKey.isChecked,
                          arg1: valKey.label,
                          label: valKey.label
                            .replaceAll("_", " ")
                            .toLowerCase(),
                          path: valKey.path,
                          data: (() => {
                            let thirdSub = [];

                            if (valKey.sub !== undefined)
                              valKey.sub.forEach((row, idx) => {
                                thirdSub.push({
                                  isDisplay: row.isChecked,
                                  label: row.label,
                                  path: row.path,
                                });
                                return null;
                              });
                            return thirdSub;
                          })(),
                        });
                      });
                      return subChild;
                    })()}
                  />
                );
              }
              return null;
            });
            return child;
          })()}

          {/* ===================================LOGOUT MODUL START */}
          <li>
            <a
              href="about:blank"
              style={{ cursor: "pointer", color: "#a6b6d0" }}
              onClick={(event) => this.handleLogout(event)}
            >
              <i className="fa fa-sign-out" />
              <span> Logout</span>
            </a>
          </li>
          {/* ===================================LOGOUT MODUL END=================================== */}
        </ul>
      </nav>
    );
  }
}
SideMenu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRouter(connect(mapStateToProps, { logoutUser })(SideMenu));
