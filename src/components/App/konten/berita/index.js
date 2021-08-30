import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import { myDate, rmHtml } from "../../../../helper";
import moment from "moment";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import {
  deleteContent,
  getContent,
} from "../../../../redux/actions/konten/konten.action";
import { ModalToggle, ModalType } from "../../../../redux/actions/modal.action";
import FormBerita from "../../modals/konten/berita/form_berita";
import * as Swal from "sweetalert2";
import { NOTIF_ALERT } from "../../../../redux/actions/_constants";

moment.locale("id"); // en

class IndexBerita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      title: "",
      id: "",
      perpage: 10,
      scrollPage: 0,
      isScroll: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getContent("berita", `page=1`));
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleValidate() {
    let where = "";
    let page = localStorage.getItem("pageBerita");
    let any = this.state.any;

    if (page !== null && page !== undefined && page !== "") {
      where += `page=${page}`;
    } else {
      where += "page=1";
    }
    if (any !== null && any !== undefined && any !== "") {
      where += `&q=${any}`;
    }
    return where;
  }

  handlePage(pageNumber) {
    localStorage.setItem("pageBerita", pageNumber);
    let where = this.handleValidate();
    this.props.dispatch(getContent("berita", where));
  }
  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getContent("berita", where));
  }
  handleModal(e, par) {
    if (par !== "") {
      this.setState({
        detail: {
          caption: this.props.data.data[par].caption,
          id_category: this.props.data.data[par].id_category,
          category: this.props.data.data[par].category,
          created_at: this.props.data.data[par].created_at,
          id: this.props.data.data[par].id,
          picture: this.props.data.data[par].picture,
          title: this.props.data.data[par].title,
          type: this.props.data.data[par].type,
          type_no: this.props.data.data[par].type_no,
          updated_at: this.props.data.data[par].updated_at,
          video: this.props.data.data[par].video,
          writer: this.props.data.data[par].writer,
        },
      });
    } else {
      this.setState({
        detail: {
          id: "",
        },
      });
    }
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("formBerita"));
  }

  handleDelete(e, id) {
    e.preventDefault();
    Swal.fire({
      title: "Perhatian !!!",
      html: `anda yakin akan menghapus data ini ??`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Oke, Hapus`,
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.value) {
        this.props.dispatch(deleteContent(id, "berita"));
      }
    });
  }

  render() {
    const { data } = this.props.data;

    return (
      <Layout page={"Berita"}>
        <div className="row">
          <div className="col-8 col-xs-8 col-md-10">
            <div className="row">
              <div className="col-md-5">
                <div className="form-group">
                  <label>Cari</label>
                  <input
                    type="text"
                    className="form-control"
                    name="any"
                    placeholder={"cari disini"}
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
          <div className="col-4 col-xs-4 col-md-2 text-right">
            <div className="form-group">
              <button
                style={{ marginTop: "27px" }}
                type="button"
                className="btn btn-primary"
                onClick={(e) => this.handleSearch(e)}
              >
                <i className="fa fa-search" />
              </button>
              <button
                style={{ marginTop: "27px", marginLeft: "5px" }}
                type="button"
                className="btn btn-primary"
                onClick={(e) => this.handleModal(e, "")}
              >
                <i className="fa fa-plus" />
              </button>
            </div>
          </div>
          <br />
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <main>
                  {typeof data === "object" ? (
                    data.length > 0 ? (
                      data.map((v, i) => {
                        return (
                          <article key={i}>
                            <div className="box-margin">
                              <div
                                className="coupon"
                                style={{
                                  borderRadius: "15px",
                                  margin: "0 auto",
                                  breakInside: "avoid-column",
                                }}
                              >
                                <div className="ribbon-wrapper ">
                                  <div className="ribbon ribbon-bookmark ribbon-success">
                                    {v.category}
                                  </div>
                                  <img
                                    src={`${v.picture}`}
                                    style={{ width: "100%" }}
                                    alt="member"
                                  />
                                  <br />
                                  <div className="row">
                                    <div
                                      className="col-md-12 text-muted"
                                      style={{ padding: "5" }}
                                    >
                                      <br />
                                      <p className="text-muted">
                                        {myDate(v.created_at)}
                                      </p>
                                      <h4 className="text-white">{v.title}</h4>
                                      <p className="text-muted">
                                        {rmHtml(v.caption)}
                                      </p>
                                    </div>
                                    <div className="col-md-12">
                                      <div
                                        className="btn-group btn-block"
                                        style={{ textAlign: "right" }}
                                      >
                                        <UncontrolledButtonDropdown nav>
                                          <DropdownToggle
                                            caret
                                            className="myDropdown"
                                          >
                                            Pilihan
                                          </DropdownToggle>
                                          <DropdownMenu>
                                            <DropdownItem
                                              onClick={(e) =>
                                                this.handleModal(e, i)
                                              }
                                            >
                                              Ubah
                                            </DropdownItem>
                                            <DropdownItem
                                              onClick={(e) =>
                                                this.handleDelete(e, v.id)
                                              }
                                            >
                                              Hapus
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </UncontrolledButtonDropdown>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })
                    ) : (
                      <img src={NOTIF_ALERT.NO_DATA} alt="member" />
                    )
                  ) : (
                    <img src={NOTIF_ALERT.NO_DATA} alt="member" />
                  )}
                </main>
              </div>
            </div>
          </div>
        </div>

        {this.props.isOpen === true ? (
          <FormBerita detail={this.state.detail} />
        ) : null}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.contentReducer.isLoading,
    isOpen: state.modalReducer,
    data: state.contentReducer.data,
    kategori: state.kategoriReducer.data,
    isLoadingPost: state.kategoriReducer.isLoadingPost,
    isError: state.kategoriReducer.isError,
    isLoadingKategori: state.kategoriReducer.isLoading,
  };
};

export default connect(mapStateToProps)(IndexBerita);
