import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import moment from "moment";
import General from "./general";
import Fee from "./fee";
import { fetchGeneral } from "../../../../redux/actions/setting/general.action";
import { Nav } from "rsuite";
class IndexSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      type: 0,
      selectedIndex: 0,
      last: "",
      dateFrom: moment().format("yyyy-MM-DD"),
      dateTo: moment().format("yyyy-MM-DD"),
    };
    this.handleSelect = this.handleSelect.bind(this)
  }
  componentWillMount() {
    this.props.dispatch(fetchGeneral());
  }

  handleSelect = (index) => {
    this.setState({ selectedIndex: index }, () => {});
  };

  render() {
    return (
      <Layout page={"Pengaturan Umum"}>
        <div className="row">
          <div className="col-12 box-margin">
            
            
            <Nav style={{ backgroundColor: "transparent" }} appearance="subtle" activeKey={this.state.selectedIndex}>
              <Nav.Item active={this.state.selectedIndex===0} eventKey={0} onSelect={() => this.handleSelect(0)}>Fee</Nav.Item>
              <Nav.Item active={this.state.selectedIndex===1} eventKey={1} onSelect={() => this.handleSelect(1)}>General</Nav.Item>
            </Nav>

          
            <div className="mt-4">
              <div className={this.state.selectedIndex===0?'':'d-none'}>
                <Fee res_fee={this.props.resData} />
              </div>
              <div className={this.state.selectedIndex===1?'':'d-none'}>
                <General res_general={this.props.resData} />
              </div>
            </div>
            {/* <Tabs>
              <TabList style={{ margin: "0px" }}>
                <Tab>Fee</Tab>
                <Tab>General</Tab>
              </TabList>

              <TabPanel>
                <Fee res_fee={this.props.resData} />
              </TabPanel>
              <TabPanel>
                <General res_general={this.props.resData} />
              </TabPanel>
            </Tabs> */}
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isOpen: state.modalReducer,
    resData: state.generalReducer.data,
  };
};

export default connect(mapStateToProps)(IndexSetting);
