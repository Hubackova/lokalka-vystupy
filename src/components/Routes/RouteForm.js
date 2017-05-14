import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {observable, toJS} from 'mobx';
import {routesRef} from '../../firebase/firebase-store';
import FormRows from '../shared/FormRows';
import {ColoredWrapper} from '../style.js';

let state = observable({
  isPublic: true,
  category: '',
  name: '',
  region: '',
  subregion: '',
  difficulty: '',
  style: '',
  climbers: '',
  date: '',
  uid: ''
});

@inject('uid') @observer class RouteForm extends Component {
  addNew = e => {
    e.preventDefault();
    state.uid = this.props.uid;
    routesRef.push(state);
    for (const prop in state) {
      state[prop] = '';
     }
    state.isPublic = true;
  };

  handleChange = e => {
    state[e.target.name] = e.target.value;
  };

  toggleCheckbox = (e) => {
    state[e.target.name] = !state.isPublic;
  }

  render() {
    const formValues = [
      {type: 'checkbox', name: 'isPublic', label: 'Zveřejnit'},
      {
        type: 'select',
        name: 'category',
        label: 'Kategorie',
        options: ['Bouldery', 'Skalní jednodélky', 'Skalní vícedélky', 'Písky', 'Skalní horské výstupy', 'Mixové výstupy v horách', 'Ledy']
      },
      {name: 'name', label: 'Jméno cesty', placeholder: 'zadejte jméno cesty'},
      {name: 'region', label: 'Oblast', placeholder: 'zadejte podoblast, např. Moravský Kras'},
      {name: 'subregion', label: 'Podoblast', placeholder: 'zadejte podoblast, např. Sloup'},
      {name: 'difficulty', label: 'Obtížnost', placeholder: 'zadejte obtížnost cesty'},
      {name: 'style', label: 'Styl', placeholder: 'zadejte styl přelezu, např. OS'},
      {name: 'climbers', label: 'Lezci', placeholder: 'zadejte lezce'},
      {name: 'date', label: 'Datum', placeholder: 'zadejte datum přelezu, např. 24.12.'}
    ];
    return (
      <ColoredWrapper>
        <FormRows addNew={this.addNew} handleChange={this.handleChange} toggleCheckbox={this.toggleCheckbox} formValues={formValues} state={state} />
      </ColoredWrapper>
    );
  }
}

export default RouteForm;
