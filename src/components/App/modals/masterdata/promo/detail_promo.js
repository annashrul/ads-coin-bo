import React,{Component} from 'react';
// import {ModalBody, ModalHeader} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import WrapperModal from "../../_wrapper.modal";
import {ModalToggle} from "redux/actions/modal.action";
import { Modal } from 'rsuite';
import moment from 'moment';
import 'moment/locale/id'
import { toRp } from '../../../../../helper';
class DetailPromo extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    toggle(e){
        // e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        localStorage.removeItem("code");
        localStorage.removeItem("barcode");
        localStorage.removeItem("name");
    };

    render(){
        
        const {
            title,
            deskripsi,
            image,
            type,
            nominal,
            kelipatan,
            periode_start,
            periode_end,
            max_user_uses,
            max_uses,
            status,
            created_at,
            } = this.props.data_detail;
        const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        return (
            <div>
                <WrapperModal 
                    // isOpen={this.props.isOpen && this.props.type === "detailPromo"} size="lg" style={{maxWidth: '1600px', width: '100%'}}
                    
                    backdropClassName="rs-modal-backdrop"
                    size="lg"
                    overflow={false}
                    autoFocus={true}
                    backdrop={true}
                    // full
                    show={this.props.isOpen && this.props.type === "detailPromo"}
                    onHide={() => this.toggle()}
                    onEnter={() => {
                    }}>
                    {/* <ModalHeader toggle={this.toggle}>Detail Promo</ModalHeader> */}
                    
                    <Modal.Header>
                        <Modal.Title>Detail Promo &nbsp;
                        {status===1?<span className="text-success font-24">●</span>:<span className="text-danger font-24">●</span>}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="img-thumbnail mb-3">
                            <div className="row">
                                <div className="col-lg-3">
                                    {/* Product image */}
                                    <a href={null} className="text-center d-block mb-4">
                                        <img src={image} onError={(e)=>{e.target.onerror = null; e.target.src=`https://icoconvert.com/images/noimage2.png`}} className="img-fluid" alt="Product" />
                                    </a>
                                </div>

                                <div className="col-lg-9">
                                    <form className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h3 className="mt-0 font-24">{title}</h3>
                                                    {/* <p className="mb-1 font-15">Created Date: {moment(created_at).format('YYYY-MM-DD')}</p> */}
                                                    <div className="mt-2">
                                                        <small>Periode:</small>
                                                        <p>Dari: {moment(periode_start).format('ddd, Do MMM YYYY')}
                                                            <br/>Sampai : {moment(periode_end).format('ddd, Do MMM YYYY')}
                                                        </p>
                                                    </div>
                                                    <div className="mt-2">
                                                        <small>Ketentuan :</small>
                                                        <div className="d-flex align-item-start border border-1 rounded p-2">
                                                            <ul className="w-100">
                                                                <li>Max Pemakaian : <strong className="text-dark"> {max_uses}</strong></li>
                                                                <li>Max pemakaian per pengguna : <strong className="text-dark"> {max_user_uses}</strong></li>
                                                                <li>Min trx : <strong className="text-dark"> {(kelipatan)}</strong></li>
                                                                <li>Nominal : <strong className="text-dark"> {type===1?'Rp. ':''}{(nominal)}{type===0?' Coin':''}</strong></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <div className="row">
                                                        <div className="col-md-6">
                                                            <small className="font-16 mb-2">Tipe:</small>
                                                            <p className="font-20 mb-0 font-weight-bold text-dark">{type===0?'Bonus':type===1?'Konversi':'Undefined'}</p>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mt-4">
                                                        <small>Deskripsi :</small>
                                                        <p className="font-15">{deskripsi}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                </WrapperModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("state.promoReducer",state.promoReducer);
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        data_detail:state.promoReducer.data_detail,
        isLoading: state.promoReducer.isLoading,
    }
}
// const mapDispatch
export default connect(mapStateToProps)(DetailPromo);