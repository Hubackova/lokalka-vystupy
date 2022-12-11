import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { toJS } from "mobx";

import List from "../shared/List";
import { Switcher } from "../style.js";

const Routes = observer((...props) => {
  const [pubicRoutes, setPubicRoutes] = useState(false);
  const switchRoutes = () => {
    setPubicRoutes(!pubicRoutes);
  };
  const { uid, ownstore, routestore } = props;
  const ownstoreData = toJS(ownstore.data);
  const hasownstoreData = ownstoreData.length !== 0;
  const data = toJS(routestore.data);
  const filteredData = data.filter(function(el) {
    return el.isPublic === true || el.uid === uid;
  });
  const hasfilteredData = data.length !== 0;
  const switcherText = pubicRoutes === false ? "Všechny cesty" : "Moje cesty";
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Switcher onClick={switchRoutes}>
          <i className="fa fa-refresh" />
          {switcherText}
        </Switcher>
      </div>
      {pubicRoutes === false ? (
        <div>{hasownstoreData && <List data={ownstoreData} isEditable />}</div>
      ) : (
        <div>
          {hasfilteredData && <List data={filteredData} isEditable={false} />}
        </div>
      )}
    </div>
  );
});

/* @inject('ownstore', 'routestore', 'uid') */

export default Routes;

Routes.propTypes = {
  uid: PropTypes.string,
  ownstore: PropTypes.object,
  routestore: PropTypes.object,
};
