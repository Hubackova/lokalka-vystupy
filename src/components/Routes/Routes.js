import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import PropTypes from "prop-types";
import List from "../shared/List";
import { Switcher } from "../style.js";

const Routes = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [pubicRoutes, setPubicRoutes] = useState(false);
  const [routes, setRoutes] = useState(false);
  const switchRoutes = () => {
    setPubicRoutes(!pubicRoutes);
  };

  useEffect(() => {
    onValue(ref(db, "routes/"), (snapshot) => {
      const items = [];
      snapshot.forEach((child) => {
        let childItem = child.val();
        childItem.key = child.key;
        items.push(childItem);
      });
      setRoutes(items);
    });
  }, [db]);

  const ownData =
    routes.length > 0
      ? routes.filter((el) => el.uid === auth.currentUser.uid)
      : [];

  const filteredData =
    auth.currentUser.uid === "Xs0w4MJr5xakWA4XBtAVAhawqzI3"
      ? routes
      : routes.length > 0
      ? routes.filter(
          (el) => el.isPublic === true || el.uid === auth.currentUser.uid
        )
      : [];

  const switcherText = pubicRoutes === false ? "Všechny cesty" : "Moje cesty";
  if (!auth.currentUser.uid) return;
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Switcher onClick={switchRoutes}>zobrazit {switcherText}</Switcher>
      </div>
      {pubicRoutes === false ? (
        <div>{routes && <List data={ownData} isEditable />}</div>
      ) : (
        <div>{routes && <List data={filteredData} isEditable={false} />}</div>
      )}
    </div>
  );
};

/* @inject('ownstore', 'routestore', 'uid') */

export default Routes;

Routes.propTypes = {
  uid: PropTypes.string,
  ownstore: PropTypes.object,
  routestore: PropTypes.object,
};
