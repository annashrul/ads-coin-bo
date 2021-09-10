import React, {Component} from 'react'
import { connect } from 'react-redux'
import WrapperModal from '../../_wrapper.modal'
import {
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import {ModalToggle} from "../../../../../redux/actions/modal.action";
import {NOTIF_ALERT} from "../../../../../redux/actions/_constants";

class DetailBank extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    toggle = (e) => {
        e.preventDefault();
        localStorage.removeItem("isBank");

        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
    };

    componentWillReceiveProps(nextProps){
    }

    render(){
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "detailBank"} size="lg">
                <ModalHeader toggle={this.toggle}>Akun Bank Anda</ModalHeader>
                <ModalBody>
                    <div className="row">
                        {
                            this.props.detail!==undefined?this.props.detail.length>0?this.props.detail.map((v,i)=>{
                                return(
                                    <div className="col-md-6" key={i}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="single-smart-card d-flex justify-content-between">
                                                    <div className="text">
                                                        <h5>{v.bank_name}</h5>
                                                        <p>{v.acc_name} <br/> {v.acc_no}</p>
                                                    </div>
                                                    <div className="icon">
                                                        <i className={`fa fa-check font-40 text-primary`}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }):"No data": (
                                <div className="col-md-12">
                                    <center>
                                        <img src={NOTIF_ALERT.NO_DATA} alt=""/>
                                    </center>
                                </div>
                            )
                        }
                    </div>
                </ModalBody>

            </WrapperModal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
    }
}
export default connect(mapStateToProps)(DetailBank);