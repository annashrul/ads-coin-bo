import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BgAuth from "../../../../assets/logo.png"
import './login.css'
import {loginUser} from '../../../../redux/actions/authActions';
import Swal from 'sweetalert2'
import moment from 'moment';
import { HEADERS } from '../../../../redux/actions/_constants';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            // disableButton:false,
            // server_price:0,
            // acc_name:"",
            // acc_number:0,
            errors:{
            },
            logo: BgAuth,
            width:'200px'
         };
    }
    getFaviconEl() {
        return document.getElementById("favicon");
    }

    // componentDidMount (){
    //     if(this.props.auth.isAuthenticated){
    //         this.props.history.push('/')
    //     }
    //     // this.initFetch(false);
    // }

    
  componentWillMount() {
      
    this.getProps(this.props);
    fetch(HEADERS.URL + `site/config/info`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then(
        (data) => {

    // let data = {
    //     "result": [
    //         {
    //             "billing_expired": "2021-10-31T17:00:00.000Z",
    //             "billing_saminggu": "2021-10-25T13:21:51.747Z"
    //         }
    //     ],
    //     "meta": [],
    //     "total": [],
    //     "msg": "Berhasil mengambil data.",
    //     "status": "success"
    // }

          let dateNow = moment(Date.now());
          let dateExp = moment(data.result[0].billing_expired);
          let dateSmg = moment(data.result[0].billing_saminggu);
            
          if (
            dateNow.diff(dateExp, 'days',false) === 0
          ) {
            Swal.fire({
              allowOutsideClick: false,
              title: "Warning!",
              html: `<h6>Aplikasi telah kedaluarsa.</h6><br/>
                            <p>Silahkan lakukan pembayaran</p>`,
              icon: "warning",
              confirmButtonColor: "#ff9800",
              confirmButtonText: "Oke",
            }).then((result) => {});
            // this.props.logoutUser();
          } else
          if (
            dateNow.diff(dateExp, 'days',false) < dateNow.diff(dateSmg, 'days',false) ? true : false
          ) {
            Swal.fire({
              allowOutsideClick: false,
              title: "Warning!",
              html: `<h6>Server akan kadaluarsa dalam ${Math.abs(dateNow.diff(dateExp, 'days',false))} hari lagi</h6><br/>
                            <p>Silahkan lakukan pembayaran sebelum masa tenggang.</p>`,
              icon: "warning",
              confirmButtonColor: "#ff9800",
              confirmButtonText: "Oke",
            }).then((result) => {});
            // this.props.logoutUser();
          }

          this.setState({
            isShowNotif: dateNow.diff(dateExp, 'days',false) < dateNow.diff(dateSmg, 'days',false) ? true : false,
            isDay: Math.abs(dateNow.diff(dateExp, 'days',false)),
            tanggal_tempo: moment(data.result[0].billing_expired).format("yyyy-MM-DD"),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }




    componentWillReceiveProps = (nextProps)=>{
        this.getProps(nextProps)
     }
    //  componentWillMount(){
    //     this.getProps(this.props);
    //  }
     getProps(param){
         if(param.auth.isAuthenticated){
             param.history.push('/');
         }else{
             if(param.errors){
                 this.setState({errors: param.errors})
             }
         }
     }

    submitHandelar = (event)=>{
        event.preventDefault();
        const {username,password} = this.state;
        if(username!==''&&password!==''){
            const user = {
                username: username,
                password: password
            };
            this.props.loginUser(user);
        }else{
            Swal.fire(
                'Isi Username dan Password Terlebih Dahulu! ',
                'Lengkapi form untuk melanjutkan.',
                'error'
            )
        }
    }

    handleInputChange =(event)=> {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    render() {
        const {username,password, errors,disableButton} = this.state;
        return (
        <div className="limiter">
            <div className="container-login100">
                <div className="row">
                    <div className={'col-md-12'}>
                        <div className="wrap-login100 p-b-160 p-t-50">
                            <form className="login100-form validate-form" action="#">
                                <span className="login100-form-title p-b-43 mb-5">
                                <img alt="logos" src={this.state.logo} className='' width={this.state.width} style={{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', display: 'block'}}/>
                                    {/* Account Login */}
                                </span>
                                <div className="wrap-input100 rs1 validate-input" data-validate="Username is required">
                                    <input type="text" readOnly={disableButton}
                                           className={username !== '' ? 'input100 has-val' : 'input100'}
                                           placeholder="Username"
                                           name="username"
                                           value={username}
                                           onChange={this.handleInputChange}/>
                                    <span className="label-input100">Username</span>
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                </div>
                                <div className="wrap-input100 rs2 validate-input" data-validate="Password is required">
                                    <input
                                        readOnly={disableButton}
                                        type="password"
                                        className={password !== '' ? 'input100 has-val' : 'input100'}
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={this.handleInputChange}/>
                                    <span className="label-input100">Password</span>
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn" type="submit"
                                            onClick={this.submitHandelar}>
                                        Sign in
                                    </button>
                                </div>
                                <div className="text-center w-full p-t-23">
                                    <a href="about:blank" className="txt1">
                                        {/* Login ke backoffice. */}
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
              );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object,
    errors: PropTypes.object
}

const mapStateToProps = ({auth, errors}) =>{
    return{
        auth : auth,
        errors: errors.errors
    }
}

export default connect(mapStateToProps,{loginUser})(Login);