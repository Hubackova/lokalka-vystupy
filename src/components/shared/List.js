import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {observer, inject} from 'mobx-react'
import {toJS} from 'mobx'

import {ImgButton, Table, Thead, Th, Tr} from '../style.js'
import ListItem from './ListItem.js'

const imgBoulder = require('../../images/boulder.gif')
const imgRocksShort = require('../../images/rocks.gif')
const imgRocksLong = require('../../images/long.gif')
const imgSand = require('../../images/sand.gif')
const imgMountain = require('../../images/mountains.gif')
const imgMix = require('../../images/mixy.gif')
const imgIce = require('../../images/ice.gif')
const imgAll = require('../../images/all.png')

@observer class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filtered: 'data',
      sortType: false,
      categoryAscent: false,
      nameAscent: false,
      regionAscent: false,
      subregionAscent: false,
      difficultyAscent: false,
      styleAscent: false,
      climbersAscent: false,
      dateAscent: false
    }
  }

  boulders = item => item.category === 'Bouldery';
  rocksShort = item => item.category === 'Skalní jednodélky';
  rocksLong = item => item.category === 'Skalní vícedélky';
  sand = item => item.category === 'Písky';
  mountain = item => item.category === 'Skalní horské výstupy';
  mix = item => item.category === 'Mixové výstupy v horách';
  ice = item => item.category === 'Ledy';

  imgButtonClick = e => {
    this.setState({filtered: e.target.name})
  }

  sortBy = (data) => {
    const {sortType} = this.state
    const typeDirection = this.state[`${sortType}Ascent`]
    if (!sortType) return data
    const sortedData = data.sort((a, b) => {
      return a[sortType].localeCompare(b[sortType])
    })
    if(typeDirection) {
      return sortedData
    } else return sortedData.reverse()
  }

  changeSortType = (e) => {
    const type = e.target.id
    const typeDirection = `${type}Ascent`
    this.setState(prevState => ({
      sortType: type,
      [typeDirection]: !prevState[typeDirection]
    }))
  }

  render() {
    const {data, isEditable} = this.props
    const boulders = toJS(data).filter(this.boulders)
    const rocksShort = toJS(data).filter(this.rocksShort)
    const rocksLong = toJS(data).filter(this.rocksLong)
    const sands = toJS(data).filter(this.sand)
    const mountains = toJS(data).filter(this.mountain)
    const mixes = toJS(data).filter(this.mix)
    const ices = toJS(data).filter(this.ice)

    const filteredData = {boulders, rocksShort, rocksLong, sands, mountains, mixes, ices}

    const headData = [
      { name: 'category', msg: 'Kategorie'},
      { name: 'name', msg: 'Název cesty' },
      { name: 'region', msg: 'Oblast' },
      { name: 'subregion', msg: 'Podoblast' },
      { name: 'difficulty', msg: 'Obtížnost' },
      { name: 'style', msg: 'Styl' },
      { name: 'climbers', msg: 'Lezci' },
      { name: 'date', msg: 'Datum' },
    ]

    const listHeadData = headData.map(i => {
      return (
        <Th id={i.name} key={i.name} onClick={this.changeSortType} style={{cursor: 'pointer'}}>
          {i.msg}
          {this.state[`${i.name}Ascent`] && this.state.sortType === i.name && <i className='fa fa-arrow-down' style={{color: 'rgba(77,182,172,1)', float: 'right', paddingTop: 5}}/>}
          {!this.state[`${i.name}Ascent`] && this.state.sortType === i.name && <i className='fa fa-arrow-up' style={{color: 'rgba(77,182,172,1)', float: 'right', paddingTop: 5}}/>}
        </Th>)
    })
    const publicColumn = <Th key='public'><span className='fa fa-user' title='Veřejné' /></Th>
    const listHead = [publicColumn, ...listHeadData, <Th key='remove'/>]
    const bodyData = this.state.filtered === 'data' ? data : filteredData[this.state.filtered]
    const listBody = this.sortBy(bodyData).map(item => (
      <ListItem isEditable={isEditable} item={item} key={item.key}/>
    ))
    // const listHead = isEditable
    //   ?  itemNames.map(i => <Th key={i}>{i}</Th>)
    //   : itemNames.map(i => <Th key={i}>{i}</Th>).slice(1,itemNames.length);


    return (
      <div>
        <div style={{textAlign:'center'}}>
          <ImageButton filter={this.imgButtonClick} img={imgBoulder} name='boulders' number={boulders.length} title='Bouldery'/>
          <ImageButton filter={this.imgButtonClick} img={imgRocksShort} name='rocksShort' number={rocksShort.length} title='Skalní jednodélky'/>
          <ImageButton filter={this.imgButtonClick} img={imgRocksLong} name='rocksLong' number={rocksLong.length} title='Skalní vícedélky'/>
          <ImageButton filter={this.imgButtonClick} img={imgSand} name='sands' number={sands.length} title='Písky'/>
          <ImageButton filter={this.imgButtonClick} img={imgMountain} name='mountains' number={mountains.length} title='Skalní horské výstupy'/>
          <ImageButton filter={this.imgButtonClick} img={imgMix} name='mixes' number={mixes.length} title='Mixové výstupy v horách'/>
          <ImageButton filter={this.imgButtonClick} img={imgIce} name='ices' number={ices.length} title='Ledy'/>
          <ImageButton filter={this.imgButtonClick} img={imgAll} name='data' number={data.length} title='Vše'/>
        </div>
        <Table>
          <Thead>
            <Tr>
              {listHead}
              {isEditable && <Th />}
            </Tr>
          </Thead>
          <tbody>{listBody}</tbody>
        </Table>
      </div>
    )
  }
}

export default List

const ImageButton = ({img, name, number, filter, title}) => {
  return (
    <ImgButton>
      <img name={name} onClick={filter} src={img} title={title}/><div>{number}</div>
    </ImgButton>
  )
}
