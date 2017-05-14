import React, {Component} from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';

import {AddButton, colors, Form} from '../style.js';

@observer class FormRows extends Component {
  constructor(props){
    super(props)
    this.state = {add: true}
  }

  clickAdd = e => {
    this.props.addNew(e);
    this.setState({add: false})
    setTimeout(() => {
      this.setState({add: true})
    }, 1000)


  }

  render() {
    const {addNew, formValues, handleChange, state, toggleCheckbox} = this.props;
    const formRows = formValues.map(i => (
      <Formgroup key={i.name}>
        <Label for={i.name}>{i.label}</Label>
          {(i.type == 'checkbox') ?
          <input name={i.name} type="checkbox" onChange={toggleCheckbox} checked={state.isPublic}/>
          : (i.type == 'select') ?
          <InputSpan><Select name={i.name} onChange={handleChange} value={state[i.name]}>
								<option disabled value=''>-- vyberte --</option>
                {i.options.map(option => (<option key={option} value={option}>{option}</option>))};
          </Select></InputSpan>
          : <InputSpan><Input
              placeholder={i.placeholder}
              name={i.name}
              onChange={handleChange}
              value={state[i.name]}
            /></InputSpan>}
      </Formgroup>));
    return (
      <Form>
        {formRows}
        <div style={{marginTop: '50px', textAlign: 'right'}}>
            <AddButton onClick={this.clickAdd}>
            {this.state.add ? 'Přidat' : <i className='glyphicon glyphicon-saved'></i>}
            </AddButton>
        </div>
        <div id='added' style={{display:'none', textAlign: 'center'}}><i className='glyphicon glyphicon-saved'></i> Cesta přidána</div>
      </Form>
    );
  }
};

const InputSpan = styled.span`
    display: table-cell;
`;

const Input = styled.input`
  display:table-cell;
  padding-bottom: 8px;
  border: none;
  width: 100%;
  &::placeholder {
    font-weight: normal;
    color: ${colors.lightGrey};
  }
`;

const Select = styled.select`
  display:table-cell;
  padding-bottom: 8px;
  border: none;
  width: 100%
`;

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
`;

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
`;


export default FormRows;