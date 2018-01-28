import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {observer, inject} from 'mobx-react'
import {observable, toJS} from 'mobx'
import {routesRef} from '../../firebase/firebase-store'
import FormRows from '../shared/FormRows'
import {ColoredWrapper} from '../style.js'
import PieChart from '../PieChart'
import styled from 'styled-components'
import Countdown from 'react-countdown-now'
import moment from 'moment'

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
})

@inject('ownstore', 'routestore', 'uid') @observer class RouteForm extends Component {
  addNew = e => {
    e.preventDefault()
    state.uid = this.props.uid
    routesRef.push(state)
    for (const prop in state) {
      state[prop] = ''
    }
    state.isPublic = true
  };

  handleChange = e => {
    state[e.target.name] = e.target.value
  };

  toggleCheckbox = (e) => {
    state[e.target.name] = !state.isPublic
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
      {
        type: 'select',
        name: 'date',
        label: 'Měsíc',
        options: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec']
      }
    ]

    const ownstoreData = toJS(this.props.ownstore.data)
    const data = toJS(this.props.routestore.data)

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      const timeFormat = ` [Zbývá ještě ${days} dní a ${hours} hodin]`
      return <span style={{color: '#cfcfcf'}}>{timeFormat}</span>
    }
    return (
      <div>
        <FormRows addNew={this.addNew} formValues={formValues} handleChange={this.handleChange} state={state} toggleCheckbox={this.toggleCheckbox} />
        {/*<ChartWrapper>
          <h3 style={{textAlign: 'center', paddingBottom: 20}}>
            <span style={{fontWeight: 'bold'}}>TROCHA STATISTIKY:</span> dáme aspoň <span style={{color: 'red'}}>200</span> cest?
          </h3>
          <div style={{textAlign: 'center', paddingTop: 20}}> <span style={{fontWeight: 'bold'}}>Celkový počet cest:</span></div>
          <PieChart data={data} hasLegend/>
          <div style={{textAlign: 'center', paddingTop: 20}}> <span style={{fontWeight: 'bold'}}>Tvůj počet cest:</span></div>
          <PieChart data={ownstoreData} hasLegend/>
          <div style={{textAlign: 'center', paddingTop: 20}}>
            <span style={{fontWeight: 'bold'}}>Deadline: </span><span style={{color: 'red', fontWeight: 'bold'}}>31.12.2017</span>
            <Countdown date= {moment().endOf('year')} renderer={renderer}/>
          </div>
        </ChartWrapper>*/}
      </div>
    )
  }
}
const ChartWrapper = styled.div`
  padding: 2em
  float: right;
  width: 35%;
  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`

export default RouteForm
