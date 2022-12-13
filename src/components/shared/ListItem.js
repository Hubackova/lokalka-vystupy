import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { getDatabase, set, ref, remove, update } from "firebase/database";
import { Fb, routesRef } from "../../firebase/firebase-store";
import { Td, Tr } from "../style.js";
import Cell from "./Cell";

let updatedItem = observable({
  category: "",
  name: "",
  region: "",
  subregion: "",
  subregion: "",
  difficulty: "",
  style: "",
  climbers: "",
  date: "",
  uid: "",
});

const ListItem = ({ isEditable, item }) => {
  const [editable, setEditable] = useState(isEditable);
  const db = getDatabase();
  const removeItem = () => {
    remove(ref(db, "routes/" + item.key));
  };

  const handleChange = (e) => {
    updatedItem[e.target.name] = e.target.value;
  };

  function renderCells() {
    // ES7 version: const entries = Object.entries(item);
    let entries = [];
    Object.keys(item).forEach((keyName, keyIndex) => {
      entries.push([keyName, item[keyName]]);
    });
    const sortedEntries = [
      entries[0],
      entries[5],
      entries[6],
      entries[9],
      entries[7],
      entries[3],
      entries[8],
      entries[1],
      entries[2],
    ];

    const cells = sortedEntries.map((i) => (
      <Cell
        item={item}
        handleChange={handleChange}
        isEditable={isEditable}
        itemName={i ? i[0] : ""}
        key={Math.random()}
      />
    ));

    return cells;
  }

  const handlePublicChange = (e) => {
    if (!isEditable) return;
    const { key, ...rest } = item;
    set(ref(db, "routes/" + item.key), {
      ...rest,
      isPublic: !item.isPublic,
    });
    setEditable(false);
  };

  return (
    <Tr>
      <Td>
        <input
          defaultChecked={item.isPublic}
          disabled={!editable}
          onClick={handlePublicChange}
          type="checkbox"
        />
      </Td>
      {renderCells()}
      {editable && (
        <Td style={{ textAlign: "right" }}>
          <a onClick={removeItem}>🗑️</a>
        </Td>
      )}
    </Tr>
  );
};

export default ListItem;

ListItem.propTypes = {
  itemName: PropTypes.string,
  isEditable: PropTypes.bool,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};
