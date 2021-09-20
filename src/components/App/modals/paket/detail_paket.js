import React,{Component} from 'react';
import connect from "react-redux/es/connect/connect";
import WrapperModal from "../_wrapper.modal";
import {ModalToggle} from "redux/actions/modal.action";
import { Avatar, Modal, Rate } from 'rsuite';
import 'moment/locale/id'
import { toCurrency } from '../../../../helper';
class DetailPaket extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    toggle(e){
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
            status,
            category,
            price,
            rating,
            terjual,
            image,
            } = this.props.data_detail;
        return (
            <div>
                <WrapperModal 
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
                    <Modal.Header>
                        <Modal.Title>Detail Produk &nbsp;
                        {status===1?<span className="text-success font-24">●</span>:<span className="text-danger font-24">●</span>}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="img-thumbnail mb-3">
                        <div className="border border-0 w-100" style={{display:'inline-block'}}>
                          <div className="px-2">
                            <div className="card shadow-none bg-light rounded-lg">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                  <p className="">#{category}</p>
                                  <Rate defaultValue={rating} allowHalf readOnly />
                                </div>
                                  <hr className="m-0 p-0"/>
                                <div className="d-flex justify-content-between align-items-center">
                                <p className="m-0 p-0">Harga {toCurrency(parseFloat(price))}</p>
                                  <p className="">{terjual}x terjual</p>
                                </div>
                                <div style={{height:'300px', width:'100%', background:`url(${image}) no-repeat center`, backgroundSize:'cover'}}  >
                                </div>
                                <div className="rounded-lg p-2 mt-4" style={{border:'1px dashed #9e9e9e'}}>
                                    <strong className="font-20 mb-0">{title}</strong>
                                    <div dangerouslySetInnerHTML={{__html: content}} />
                                </div>
                                <hr/>
                                <div className="d-flex align-items-center">
                                  <Avatar src={seller_foto} circle className="mr-2"/>
                                  <div>
                                    <div className="">
                                      <p className="text-dark">Oleh <strong>{seller}</strong></p>
                                    </div>
                                    <div className="">
                                      <p className="text-dark">Biografi : <strong>{seller_bio}</strong></p>
                                    </div>
                                  </div>
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
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        data_detail:state.paketReducer.detail,
        isLoading: state.paketReducer.isLoading,
    }
}
// const mapDispatch
export default connect(mapStateToProps)(DetailPaket);