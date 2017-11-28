import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
import styled from 'styled-components'
import {AddButton, colors, Form} from '../style.js'

@observer class FormRows extends Component {
  constructor(props) {
    super(props)
    this.state = {add: true}
  }

  clickAdd = e => {
    this.props.addNew(e)
    this.setState({add: false})
    setTimeout(() => {
      this.setState({add: true})
    }, 1000)
  }

  render() {
    const {addNew, formValues, handleChange, state, toggleCheckbox} = this.props
    const formRows = formValues.map(i => (
      <Formgroup key={i.name}>
        <Label for={i.name}>{i.label}</Label>
        {(i.type === 'checkbox') ?
          <InputSpan><i className='fa fa-user' /> <input checked={state.isPublic} name={i.name} onChange={toggleCheckbox} type="checkbox"/></InputSpan>
          : (i.type === 'select') ?
            <InputSpan><Select name={i.name} onChange={handleChange} value={state[i.name]}>
              <option disabled value=''>
                {i.name === 'date' ? '-- vyberte měsíc--' : '-- vyberte kategorii--'}
              </option>
              {i.options.map(option => (<option key={option} value={option}>{option}</option>))};
            </Select></InputSpan>
            : <InputSpan><Input
              name={i.name}
              onChange={handleChange}
              placeholder={i.placeholder}
              value={state[i.name]}
            /></InputSpan>}
      </Formgroup>))
    return (
      <ThisForm>
        {formRows}
        <div style={{marginTop: '50px', textAlign: 'right'}}>
          <AddButton onClick={this.clickAdd}>
            {this.state.add ? 'Přidat' : <i className='fa fa-saved' />}
          </AddButton>
        </div>
        <div id='added' style={{display:'none', textAlign: 'center'}}><i className='fa fa-saved' /> Cesta přidána</div>
      </ThisForm>
    )
  }
};

const InputSpan = styled.span`
    display: table-cell;
    & i {
      display: none;
    }
    @media only screen and (max-width: 768px) {
      & i {
        display: inline;
      }
    }
`

const Input = styled.input`
  display:table-cell;
  padding-bottom: 8px;
  border: none;
  width: 100%;
  &::placeholder {
    font-weight: normal;
    color: ${colors.lightGrey};
  }
`

const Select = styled.select`
  display:table-cell;
  padding-bottom: 8px;
  border: none;
  width: 100%
`

const Label = styled.label`
  display: table-cell;
  font-size: 0.9em;
  font-weight: normal;
  text-align: right;
  padding: 16px 32px 8px 8px;
  border: none;
  width: 140px;
  white-space: nowrap;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`

const Formgroup = styled.div`
  width: 100%;
  display:table;
  border-collapse:collapse;

  border-bottom: 1px solid ${colors.lightGrey};
  &:hover Label {
    font-weight: bold;
  }
  &:hover {
    border-bottom: 2px solid ${colors.mediumColor};
  }
`
const ThisForm = styled.form`
  padding: 2em;
  width: 65%;
  min-width: 320px;
  float: left;
  background: white;
  @media only screen and (max-width: 768px) {
    margin: 2em auto;
    width: 100%;
  }
`

export default FormRows


