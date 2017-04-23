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
    let {item} = this.props;
    const entries = Object.entries(item);
    const sortedEntries = [entries[0], entries[4], entries[5], entries[7], entries[3], entries[6], entries[1], entries[2]];
    const itemId = Object.values(item)[9];
    return sortedEntries.map(i => <Cell key={Math.random()} itemId={itemId} itemName={i[0]} value={i[1]} handleChange={this.handleChange} />);
  }

  render() {
    return (
      <Tr>
        {this.renderCells()}
        <Td style={{textAlign:'right'}}>
          <Button onClick={this.removeItem}><i className='glyphicon glyphicon-trash'></i></Button>
        </Td>
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
    const {itemName, value, handleChange} = this.props;
    const options = ['Bouldery', 'Skalní jednodélky', 'Skalní vícedélky', 'Písky', 'Skalní horské výstupy', 'Mixové výstupy v horách', 'Ledy'];
    return this.state.editing
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
