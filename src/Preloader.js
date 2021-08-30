import React, { Component } from "react";
import { WaveLoading } from "react-loadingg";

export default class Preloader extends Component {
  render() {
    return (
      <div className="loadingCircle">
        <div className="wrapperLoading">
          <WaveLoading />
        </div>
      </div>
      // <div>
      //     <div className="loading">Loading&#8230;</div>
      // </div>
    );
  }
}
