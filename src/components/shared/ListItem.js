import React, {Component, PropTypes} from 'react';
import {Fb, routesRef} from '../../firebase/firebase-store';
import {observable, toJS} from 'mobx';
import {observer} from 'mobx-react';
import {Button, inputStyle, Td, Tr} from '../style.js';

let updatedItem = observable({
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

@observer class ListItem extends Component {
  static propTypes = {
    item: PropTypes.object
  };

  handleChange = e => {
    updatedItem[e.target.name] = e.target.value;
  };

  renderCells() {
    let {isEditable, item} = this.props;
    // ES7 version: const entries = Object.entries(item);
    let entries = []
    Object.keys(item).map((keyName, keyIndex) => {
      entries.push([keyName, item[keyName]])
    })
    const sortedEntries = [entries[0], entries[5], entries[6], entries[8], entries[3], entries[7], entries[1], entries[2]];
    // ES7 version: const itemId = Object.values(item)[10];
    const itemId = Object.keys(item).map(value => item[value])[10]
    return sortedEntries.map(i => <Cell key={Math.random()} itemId={itemId} itemName={i[0]} isEditable={this.props.isEditable} value={i[1]} handleChange={this.handleChange} />);
  }

  render() {
    const isEditable = this.props.isEditable;
    return (
      <Tr>
        <Td><input type='checkbox' defaultChecked={this.props.item.isPublic} disabled/></Td>
        {this.renderCells()}
        {isEditable && <Td style={{textAlign:'right'}}>
          <Button onClick={this.removeItem} remove><i className='glyphicon glyphicon-trash'></i></Button>
        </Td>}
      </Tr>
    );
  }
  removeItem = () => {
    Fb.removeItem(this.props.item.key);
  };
}

export default ListItem;

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};
  }

  render() {
    const {itemName, isEditable, value, handleChange} = this.props;
    const options = ['Bouldery', 'Skalní jednodélky', 'Skalní vícedélky', 'Písky', 'Skalní horské výstupy', 'Mixové výstupy v horách', 'Ledy'];
      return (isEditable == false)
    ? <Td><span>{value}</span></Td>
    : this.state.editing
      ? (itemName == 'category'
        ? <Td><select ref="selectedInput" name={itemName} onChange={handleChange} onKeyDown={this.keyDown} style={inputStyle} value={updatedItem[name]} onBlur={this.onBlur}>
            <option disabled value=''>-- vyberte --</option>
            {options.map(option => (<option key={option} value={option}>{option}</option>))};
        </select></Td>
        : <Td><input ref="selectedInput" name={itemName} onChange={handleChange} onKeyDown={this.keyDown} style={inputStyle} value={updatedItem[name]} onBlur={this.onBlur}/></Td>)
    : <Td onClick={this.onFocus}><span>{value}</span></Td>;
  }

  onFocus = () => {
    this.setState({editing: true}, () => {
      this.refs.selectedInput.focus();
    });
  }

  update = (e) => {
    const {itemId, itemName} = this.props;
    routesRef.child(itemId).update({[itemName]: e.target.value});
    this.setState({editing: false});
  }

  onBlur = e => {
    this.update(e);
  }

  keyDown = e => {
    const isEditing = this.state.editing;
    if (e.keyCode == '13' && isEditing) {
      this.update(e);
    }
  }

}
