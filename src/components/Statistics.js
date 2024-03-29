/* import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import moment from "moment";
import styled from "styled-components";
import { toJS } from "mobx";
import Countdown from "react-countdown-now";

import { ColoredWrapper } from "./style.js";
import PieChart from "./PieChart";

@inject("ownstore", "routestore")
@observer
class Statistics extends Component {
  render() {
    const ownstoreData = toJS(this.props.ownstore.data);
    const data = toJS(this.props.routestore.data);
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      const timeFormat = ` [Zbývá ještě ${days} dní a ${hours} hodin]`;
      return <span style={{ color: "#cfcfcf" }}>{timeFormat}</span>;
    };

    return (
      <ChartWrapper>
        <h3 style={{ textAlign: "center", paddingBottom: 20 }}>
          <span style={{ fontWeight: "bold" }}>TROCHA STATISTIKY:</span> dáme aspoň{" "}
          <span style={{ color: "red" }}>200</span> cest?
        </h3>
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          {" "}
          <span style={{ fontWeight: "bold" }}>Celkový počet cest:</span>
        </div>
        <PieChart data={data} hasLegend />
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          {" "}
          <span style={{ fontWeight: "bold" }}>Tvůj počet cest:</span>
        </div>
        <PieChart data={ownstoreData} hasLegend />
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <span style={{ fontWeight: "bold" }}>Deadline: </span>
          <span style={{ color: "red", fontWeight: "bold" }}>31.12.2021</span>
          <Countdown date={moment().endOf("year")} renderer={renderer} />
        </div>
      </ChartWrapper>
    );
  }
}
const ChartWrapper = styled.div`
  margin: 64px;
  width: 30%;
  text-align: center;
  @media only screen and (max-width: 1023px) {
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    margin: 5px;
  }
`;

export default Statistics;

Statistics.propTypes = {
  ownstore: PropTypes.object,
  routestore: PropTypes.object
};
 */