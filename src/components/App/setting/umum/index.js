import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import moment from "moment";
import General from "./general";
import Alokasi from "./alokasi";
import { fetchGeneral } from "../../../../redux/actions/setting/general.action";
class IndexSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      type: 0,
      last: "",
      dateFrom: moment().format("yyyy-MM-DD"),
      dateTo: moment().format("yyyy-MM-DD"),
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchGeneral());
  }

  render() {
    return (
      <Layout page={"Pengaturan Umum"}>
        <div className="row">
          <div className="col-12 box-margin">
            <Tabs>
              <TabList style={{ margin: "0px" }}>
                <Tab>Alokasi</Tab>
                <Tab>General</Tab>
              </TabList>

              <TabPanel>
                <Alokasi res_alokasi={this.props.resData} />
              </TabPanel>
              <TabPanel>
                <General res_general={this.props.resData.general} />
              </TabPanel>
            </Tabs>
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
