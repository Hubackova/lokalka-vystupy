import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {routesRef} from '../../firebase/firebase-store'
import {inputStyle, inputReadStyle, Td} from '../style.js'

class Cell extends Component {
    state = {
        editing: false
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

    onFocus = e => {
      this.setState({editing: true}, () => {
        this.refs.selectedInput.focus()
      })
    }

    update = e => {
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

  export default Cell

  Cell.propTypes = {
    itemName: PropTypes.string,
    itemId: PropTypes.string,
    isEditable: PropTypes.bool,
    value: PropTypes.string,
    handleChange: PropTypes.function
  }
