import React,{Component} from 'react';
// import {ModalBody, ModalHeader} from "reactstrap";
import connect from "react-redux/es/connect/connect";
import WrapperModal from "../_wrapper.modal";
import {ModalToggle} from "redux/actions/modal.action";
import { Modal, Rate } from 'rsuite';
import 'moment/locale/id'
class DetailPaket extends Component{
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
            seller,
            seller_foto,
            seller_bio,
            content,
            preview,
            status,
            category,
            price,
            rating,
            terjual,
            image,
            created_at,
            status_beli,
            } = this.props.data_detail;
        const columnStyle = {verticalAlign: "middle", textAlign: "center",};
        return (
            <div>
                <WrapperModal 
                    // isOpen={this.props.isOpen && this.props.type === "detailPaket"} size="lg" style={{maxWidth: '1600px', width: '100%'}}
                    
                    backdropClassName="rs-modal-backdrop"
                    size="lg"
                    overflow={false}
                    autoFocus={true}
                    backdrop={true}
                    // full
                    show={this.props.isOpen && this.props.type === "detailPaket"}
                    onHide={() => this.toggle()}
                    onEnter={() => {
                    }}>
                    {/* <ModalHeader toggle={this.toggle}>Detail Paket</ModalHeader> */}
                    
                    <Modal.Header>
                        <Modal.Title>Detail Produk &nbsp;
                        {status===1?<span className="text-success font-24">●</span>:<span className="text-danger font-24">●</span>}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="img-thumbnail mb-3">
                        <div className="border border-0 w-100" style={{display:'inline-block'}}>
                          <div className="chat">
                            <div className="d-flex justify-content-between align-items-center pt-3 pb-2 px-2">
                              <div className="chat-header-text d-flex align-items-center w-100">
                                <div className="chat-header-thumb">
                                  <img src={seller_foto} alt="avatar" style={{width:'50px'}}/>
                                </div>
                                <div className="chat-about">
                                  <div className="chat-with font-18">{seller}</div>
                                  {/* <div className="chat-num-messages font-14">{v.seller_bio}</div> */}
                                </div>
                              </div>
                              <div className="chat-features text-right" style={{width:'-webkit-fill-available'}}>
                                {/* <Rate defaultValue={v.rating} allowHalf readOnly /> */}
                              </div>
                            </div>
                          </div>
                          <div className="px-2">
                            <div className="card shadow-none bg-light rounded-lg">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                  <p className="">#{category}</p>
                                  <Rate defaultValue={rating} allowHalf readOnly />
                                </div>
                                  <hr className="m-0 p-0"/>
                                <div className="d-flex justify-content-between align-items-center">
                                <p className="m-0 p-0">Harga {price} COIN</p>
                                  <p className="">{terjual}x terjual</p>
                                </div>
                                <div style={{height:'300px', width:'100%', background:`url(${image}) no-repeat center`, backgroundSize:'cover'}} className="imgExpand" >
                                </div>
                                <div className="rounded-lg p-2 mt-4" style={{border:'1px dashed #9e9e9e'}}>
                                    <strong className="font-20 mb-0">{title}</strong>
                                    <div dangerouslySetInnerHTML={{__html: content}} />
                                </div>
                                
                              </div>
                            </div>
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
    console.log("state.paketReducer",state.paketReducer);
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        data_detail:state.paketReducer.detail,
        isLoading: state.paketReducer.isLoading,
    }
}
// const mapDispatch
export default connect(mapStateToProps)(DetailPaket);