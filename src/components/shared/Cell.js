import React, { useState } from "react";
import PropTypes from "prop-types";
import { inputStyle, inputReadStyle, Td } from "../style.js";
import { getDatabase, ref, set } from "firebase/database";

const Cell = ({ item, itemName, isEditable, handleChange }) => {
  const [editing, setEditing] = useState(false);

  const db = getDatabase();
  const options =
    itemName === "category"
      ? [
          "Bouldery",
          "Skalní jednodélky",
          "Skalní vícedélky",
          "Písky",
          "Skalní horské výstupy",
          "Mixové výstupy v horách",
          "Ledy",
        ]
      : [
          "leden",
          "únor",
          "březen",
          "duben",
          "květen",
          "červen",
          "červenec",
          "srpen",
          "září",
          "říjen",
          "listopad",
          "prosinec",
        ];

  const onFocus = (e) => {
    setEditing(true);
  };

  const update = (e) => {
    const { key, ...rest } = item;
    set(ref(db, "routes/" + item.key), {
      ...rest,
      [itemName]: e.target.value,
    });
    setEditing(false);
  };

  const onBlur = (e) => {
    update(e);
  };

  const keyDown = (e) => {
    if (e.keyCode === "13" && editing) {
      update(e);
    }
  };

  return isEditable === false ? (
    <Td>{item[itemName]}</Td>
  ) : itemName === "category" || itemName === "date" ? (
    <Td>
      <select
        name={itemName}
        defaultValue={item[itemName]}
        onChange={(e) => {
          update(e);
        }}
        style={editing ? inputStyle : inputReadStyle}
      >
        <option disabled value="">
          vyberte
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
        ;
      </select>
    </Td>
  ) : editing ? (
    <Td>
      <input
        name={itemName}
        onBlur={onBlur}
        onChange={handleChange}
        onKeyDown={keyDown}
        style={inputStyle}
      />
    </Td>
  ) : (
    <Td>
      <input
        name={item.name}
        onClick={onFocus}
        style={inputReadStyle}
        defaultValue={item[itemName]}
      />
    </Td>
  );
};
export default Cell;

Cell.propTypes = {
  itemName: PropTypes.string,
  itemId: PropTypes.string,
  isEditable: PropTypes.bool,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};
