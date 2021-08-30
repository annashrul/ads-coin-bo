import React, { Component } from "react";

class Cards extends Component {
  render() {
    return (
      <div className={this.props.classCols}>
        <div className="card">
          <div className="card-header bg-transparent border-bottom-0">
            <b>{this.props.title}</b>
          </div>
          <div className="card-body">
            <div
              className="row justify-content-between"
              style={{ paddingLeft: 12, paddingRight: 12 }}
            >
              <h2>
                <i className={this.props.icon} />
              </h2>
              <h2 style={{ paddingLeft: 5 }} className="font-22">
                <b>{this.props.data}</b>
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
