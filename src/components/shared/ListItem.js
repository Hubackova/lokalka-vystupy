import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Fb, routesRef} from '../../firebase/firebase-store'
import {observable, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {Button, inputStyle, inputReadStyle, Td, Tr} from '../style.js'

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
})

@observer class ListItem extends Component {
  static propTypes = {
    item: PropTypes.object
  };

  handleChange = e => {
    updatedItem[e.target.name] = e.target.value
  };

  renderCells() {
    let {isEditable, item} = this.props
    // ES7 version: const entries = Object.entries(item);
    let entries = []
    Object.keys(item).map((keyName, keyIndex) => {
      entries.push([keyName, item[keyName]])
    })
    const sortedEntries = [entries[0], entries[5], entries[6], entries[8], entries[3], entries[7], entries[1], entries[2]]
    // ES7 version: const itemId = Object.values(item)[10];
    const itemId = Object.keys(item).map(value => item[value])[10]
    return sortedEntries.map(i => <Cell
      handleChange={this.handleChange}
      isEditable={this.props.isEditable}
      itemId={itemId}
      itemName={i ? i[0] : ''}
      key={Math.random()}
      value={i ? i[1] : ''}
    />)
  }

  handlePublicChange = e => {
    const {isEditable, item} = this.props
    if (!isEditable) return
    const itemId = Object.keys(item).map(value => item[value])[10]
    const itemName = 'isPublic'
    routesRef.child(itemId).update({[itemName]: !this.props.item.isPublic})
    this.setState({editing: false})
  };

  render() {
    const isEditable = this.props.isEditable
    return (
      <Tr>
        <Td><input defaultChecked={this.props.item.isPublic} disabled={!isEditable} onClick={this.handlePublicChange} type='checkbox'/></Td>
        {this.renderCells()}
        {isEditable && <Td style={{textAlign:'right'}}>
          <a onClick={this.removeItem}><i className="fa fa-trash" /></a>
        </Td>}
      </Tr>
    )
  }
  removeItem = () => {
    Fb.removeItem(this.props.item.key)
  };
}

export default ListItem

class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  render() {
    const {itemName, isEditable, value, handleChange} = this.props
    const options = itemName === 'category'
      ? ['Bouldery', 'Skalní jednodélky', 'Skalní vícedélky', 'Písky', 'Skalní horské výstupy', 'Mixové výstupy v horách', 'Ledy']
      : ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec']

    return (isEditable === false)
      ? <Td>{value}</Td>
      : this.state.editing
        ? (itemName === 'category' || itemName === 'date'
          ? <Td><select name={itemName} onBlur={this.onBlur} onChange={handleChange} onKeyDown={this.keyDown} ref="selectedInput" style={inputStyle}>
            <option disabled value=''>-- vyberte --</option>
            {options.map(option => (<option key={option}>{option}</option>))};
          </select></Td>
          : <Td><input name={itemName} onBlur={this.onBlur} onChange={handleChange} onKeyDown={this.keyDown} ref="selectedInput" style={inputStyle}/></Td>)
        : (itemName === 'category' || itemName === 'date')
        //not editing
          ? <Td><select name={itemName} onClick={this.onFocus} style={inputReadStyle} value={value}>
            <option disabled value=''>-- vyberte --</option>
            {options.map(option => (<option key={option}>{option}</option>))};
          </select></Td>
          : <Td><input name={itemName} onClick={this.onFocus} style={inputReadStyle} value={value}/></Td>
  }

  onFocus = (e) => {
    this.setState({editing: true}, () => {
      this.refs.selectedInput.focus()
    })
  }

  update = (e) => {
    const {itemId, itemName} = this.props
    routesRef.child(itemId).update({[itemName]: e.target.value})
    this.setState({editing: false})
  }

  onBlur = e => {
    this.update(e)
  }

  keyDown = e => {
    const isEditing = this.state.editing
    if (e.keyCode === '13' && isEditing) {
      this.update(e)
    }
  }

}
