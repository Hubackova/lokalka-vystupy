import { observable } from "mobx";
import React, { useEffect } from "react";
import { Fb } from "./firebase-store";
import { getDatabase, onValue, ref, set, update } from "firebase/database";

const Store = () => {
  let data = observable([]);

  useEffect(() => {
    onValue(ref(db, "routes/"), (snapshot) => {
      var items = [];
      // this.setState({data: snapshot.val()}) is also possible, but thanks to forEach is possible to arrange Object as we want and add key
      snapshot.forEach((child) => {
        let childItem = child.val();
        childItem.key = child.key;
        items.push(childItem);
      });
      data = items;
    });
  });

  const removeItem = (key, ref) => {
    ref.child(key).remove();
  };
};

export { Store };
