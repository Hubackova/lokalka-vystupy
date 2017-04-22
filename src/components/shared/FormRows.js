import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {AddButton, Form, Formgroup, Input, Label, Select} from '../style.js';

@observer class FormRows extends Component {
  render() {
    const {addNew, formValues, handleChange, state} = this.props;
    const formRows = formValues.map(i => (
      <Formgroup key={i.name}>
        <Label>{i.label}</Label>
          {(i.type == 'select') ?
          <Select name={i.name} onChange={handleChange} value={state[i.name]}>
								<option disabled value=''>-- vyberte --</option>
                {i.options.map(option => (<option key={option} value={option}>{option}</option>))};
          </Select>
          : <Input
              placeholder={i.placeholder}
              name={i.name}
              onChange={handleChange}
              value={state[i.name]}
            />}
      </Formgroup>));
    return (
      <Form>
        {formRows}
        <div style={{marginTop: '50px', textAlign: 'right'}}>
            <Label></Label>
            <AddButton onClick={addNew}>Přidat</AddButton>
        </div>
      </Form>
    );
  }
};

export default FormRows;
