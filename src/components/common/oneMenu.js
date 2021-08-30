import React, { Component } from 'react';
import {Link} from "react-router-dom"

class OneMenu extends Component {
    render(){
        return(
            <li style={{display:this.props.display?'block':'none'}} className={this.props.isActive}><Link to={this.props.path}> <i className={`${this.props.icon}`}/><span> {this.props.label}</span></Link></li>
        );
    }
}

export  default OneMenu;