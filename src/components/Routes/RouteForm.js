import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import styled from "styled-components";

import { routesRef } from "../../firebase/firebase-store";
import FormRows from "../shared/FormRows";
import Statistics from "../Statistics"; //   - in the end of the year use this component

let state = observable({
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
  uid: ""
});

@inject("uid")
@observer
class RouteForm extends Component {
  addNew = e => {
    e.preventDefault();
    if (!state.category || !state.name ||!state.climbers || !state.region ) {
      return alert("vyplň prosím minimálně jméno cesty, kategorii, lezce a oblast")
    }
    state.uid = this.props.uid;
    routesRef.push(state);
    for (const prop in state) {
      if (state.hasOwnProperty(prop)) {
        state[prop] = "";
      }
    }
    state.isPublic = true;
  };

  setDataFromLezec = e => {
    state.name = e.target.getAttribute(["name"]);
    state.difficulty = e.target.getAttribute(["grade"]);
    state.sector = e.target.getAttribute(["sector"]);
    state.subregion = e.target.getAttribute(["subregion"]);
    state.region = e.target.getAttribute(["region"]);
  };

  handleChange = e => {
    state[e.target.name] = e.target.value;
  };

  toggleCheckbox = e => {
    state[e.target.name] = !state.isPublic;
  };

  render() {
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
          "Ledy"
        ]
      },
      { name: "name", label: "Jméno cesty", placeholder: "zadejte jméno cesty" },
      { name: "region", label: "Oblast", placeholder: "zadejte podoblast, např. Moravský Kras" },
      { name: "subregion", label: "Podoblast", placeholder: "zadejte podoblast, např. Sloup" },
      { name: "sector", label: "Sektor", placeholder: "zadejte sektor" },
      { name: "difficulty", label: "Obtížnost", placeholder: "zadejte obtížnost cesty" },
      { name: "style", label: "Styl", placeholder: "zadejte styl přelezu, např. OS" },
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
          "prosinec"
        ]
      }
    ];

    return (
      <FormWrapper>
        <FormRows
          addNew={this.addNew}
          formValues={formValues}
          handleChange={this.handleChange}
          state={state}
          toggleCheckbox={this.toggleCheckbox}
          setDataFromLezec={this.setDataFromLezec}
        />
        {/* <Statistics /> */}
      </FormWrapper>
    );
  }
}

export default RouteForm;

RouteForm.propTypes = {
  uid: PropTypes.string,
  ownstore: PropTypes.object,
  routestore: PropTypes.object
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
