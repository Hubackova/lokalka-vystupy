import React, {Component, useState} from 'react'
import PropTypes from 'prop-types'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

import {Fb, routesRef} from '../../firebase/firebase-store'
import {Td, Tr} from '../style.js'
import Cell from './Cell'

let updatedItem = observable({
  category: '',
  name: '',
  region: '',
  subregion: '',
  subregion: '',
  difficulty: '',
  style: '',
  climbers: '',
  date: '',
  uid: ''
})


const ListItem = observer(({addNew, props}) => {
    const [editing, setEditing] = useState(false);
    const removeItem = () => {
        Fb.removeItem(this.props.item.key)
      };
  const  handleChange = e => {
        updatedItem[e.target.name] = e.target.value
      };

    function  renderCells() {
        let {isEditable, item} = this.props
        // ES7 version: const entries = Object.entries(item);
        let entries = []
        Object.keys(item).forEach((keyName, keyIndex) => {
          entries.push([keyName, item[keyName]])
        })
        const sortedEntries = [entries[0], entries[5], entries[6], entries[9], entries[7], entries[3], entries[8], entries[1], entries[2]]
        // ES7 version: const itemId = Object.values(item)[10];
        const itemId = Object.keys(item).map(value => item[value])[11]
        const cells = sortedEntries.map(i => <Cell
          handleChange={handleChange}
          isEditable={isEditable}
          itemId={itemId}
          itemName={i ? i[0] : ''}
          key={Math.random()}
          value={i ? i[1] : ''}
        />)
    
        return cells
      }
    
   const handlePublicChange = e => {
        const {isEditable, item} = props
        if (!isEditable) return
        const itemId = Object.keys(item).map(value => item[value])[11]
        const itemName = 'isPublic'
        routesRef.child(itemId).update({[itemName]: !item.isPublic})
        setEditing(false)
      };

      const {isEditable, item} = props

      return (
        <Tr>
          <Td><input defaultChecked={item.isPublic} disabled={!isEditable} onClick={handlePublicChange} type='checkbox'/></Td>
          {this.renderCells()}
          {isEditable && <Td style={{textAlign:'right'}}>
            <a onClick={this.removeItem}><i className="fa fa-trash" /></a>
          </Td>}
        </Tr>
      )
})



export default ListItem

ListItem.propTypes = {
  itemName: PropTypes.string,
  isEditable: PropTypes.bool,
  value: PropTypes.string,
  handleChange: PropTypes.func
}

