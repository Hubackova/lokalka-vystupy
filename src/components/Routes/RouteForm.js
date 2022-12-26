import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import { routesRef } from "../../firebase/firebase-store";
import FormRows from "../shared/FormRows";
import Statistics from "../Statistics"; //   - in the end of the year use this component
import { child, getDatabase, push, ref, set } from "firebase/database";

const RouteForm = () => {
  const auth = getAuth();

  const [form, setForm] = useState({
    isPublic: true,
    category: "",
    name: "",
    region: "",
    subregion: "",
    sector: "",
    difficulty: "",
    style: "",
    climbers: "",
    date: "",
    uid: auth.currentUser.uid,
  });

  const addNew = (e) => {
    e.preventDefault();
    if (!form.category || !form.name || !form.climbers || !form.region) {
      return alert(
        "vyplň prosím minimálně jméno cesty, kategorii, lezce a oblast"
      );
    }
    const db = getDatabase();
    const newKey = push(child(ref(db), "routes")).key;
    set(ref(db, "routes/" + newKey), form);
    for (const prop in form) {
      if (form.hasOwnProperty(prop)) {
        form[prop] = "";
      }
    }
  };

  const setDataFromLezec = (e) => {
    setForm({
      ...form,
      difficulty: e.target.getAttribute(["grade"]),
      sector: e.target.getAttribute(["sector"]),
      subregion: e.target.getAttribute(["subregion"]),
      region: e.target.getAttribute(["region"]),
      name: e.target.getAttribute(["name"]),
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleCheckbox = (e) => {
    form[e.target.name] = !form.isPublic;
  };
  const formValues = [
    { type: "checkbox", name: "isPublic", label: "Zveřejnit" },
    {
      type: "select",
      name: "category",
      label: "Kategorie",
      options: [
        "Bouldery",
        "Skalní jednodélky",
        "Skalní vícedélky",
        "Písky",
        "Skalní horské výstupy",
        "Mixové výstupy v horách",
        "Ledy",
      ],
    },
    { name: "name", label: "Jméno cesty", placeholder: "zadejte jméno cesty" },
    {
      name: "region",
      label: "Poloha",
      placeholder: "zadejte podoblast, např. Moravský Kras",
    },
    {
      name: "subregion",
      label: "Oblast",
      placeholder: "zadejte podoblast, např. Sloup",
    },
    { name: "sector", label: "Sektor", placeholder: "zadejte sektor" },
    {
      name: "difficulty",
      label: "Obtížnost",
      placeholder: "zadejte obtížnost cesty",
    },
    {
      name: "style",
      label: "Styl",
      placeholder: "zadejte styl přelezu, např. OS",
    },
    { name: "climbers", label: "Lezci", placeholder: "zadejte lezce" },
    {
      type: "select",
      name: "date",
      label: "Měsíc",
      options: [
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
      ],
    },
  ];
  return (
    <FormWrapper>
      <FormRows
        addNew={addNew}
        formValues={formValues}
        handleChange={handleChange}
        state={form}
        toggleCheckbox={toggleCheckbox}
        setDataFromLezec={setDataFromLezec}
      />
      {/* <Statistics /> */}
    </FormWrapper>
  );
};

export default RouteForm;

RouteForm.propTypes = {
  uid: PropTypes.string,
  ownstore: PropTypes.object,
  routestore: PropTypes.object,
};

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1023px) {
    flex-direction: column;
    margin: 2em auto;
    width: 100%;
  }
`;
