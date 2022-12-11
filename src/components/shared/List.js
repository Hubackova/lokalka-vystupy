import React, {Component, useState} from 'react'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react'
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


const List = observer(({addNew, props}) => {
const [filtered, setfiltered] = useState('data')
const [sortType, setsortType] = useState(false)
const [categoryAscent, setcategoryAscent] = useState(false)
const [nameAscent, setnameAscent] = useState(false)
const [regionAscent, setregionAscent] = useState(false)
const [subregionAscent, setsubregionAscent] = useState(false)
const [sectorAscent, setsectorAscent] = useState(false)
const [difficultyAscent, setdifficultyAscent] = useState(false)
const [styleAscent, setstyleAscent] = useState(false)
const [climbersAscent, setclimbersAscent] = useState(false)
const [dateAscent, setdateAscent] = useState(false)

const bouldersF = item => item.category === 'Bouldery';
const rocksShortF = item => item.category === 'Skalní jednodélky';
 const rocksLongF = item => item.category === 'Skalní vícedélky';
 const sand = item => item.category === 'Písky';
 const mountain = item => item.category === 'Skalní horské výstupy';
 const mix = item => item.category === 'Mixové výstupy v horách';
 const ice = item => item.category === 'Ledy';

 const imgButtonClick = e => {
  this.setState({filtered: e.target.name})
}

const  sortBy = (data) => {

  const typeDirection = `${sortType}Ascent`  
  if (!sortType) return data
  const sortedData = data.sort((a, b) => {
    return a[sortType].localeCompare(b[sortType])
  })
  if(typeDirection) {
    return sortedData
  } else return sortedData.reverse()
}

const changeSortType = (e) => {
  const type = e.target.id
  const typeDirection = `${type}Ascent`
  setsortType(type)
/*   this.setState(prevState => ({
    sortType: type,
    [typeDirection]: !prevState[typeDirection]
  })) */
}
const {data, isEditable} = this.props
const boulders = toJS(data).filter(bouldersF)
const rocksShort = toJS(data).filter(rocksShortF)
const rocksLong = toJS(data).filter(rocksLongF)
const sands = toJS(data).filter(sand)
const mountains = toJS(data).filter(mountain)
const mixes = toJS(data).filter(mix)
const ices = toJS(data).filter(ice)

const filteredData = {boulders, rocksShort, rocksLong, sands, mountains, mixes, ices}

const headData = [
  { name: 'category', msg: 'Kategorie'},
  { name: 'name', msg: 'Název cesty' },
  { name: 'region', msg: 'Oblast' },
  { name: 'subregion', msg: 'Podoblast' },
  { name: 'sector', msg: 'Sektor' },
  { name: 'difficulty', msg: 'Obtížnost' },
  { name: 'style', msg: 'Styl' },
  { name: 'climbers', msg: 'Lezci' },
  { name: 'date', msg: 'Datum' },
]

const listHeadData = headData.map(i => {
  return (
    <Th id={i.name} key={i.name} onClick={changeSortType} style={{cursor: 'pointer'}}>
      {i.msg}
      {[`${i.name}Ascent`] && sortType === i.name && <i className='fa fa-arrow-down' style={{color: 'rgba(77,182,172,1)', float: 'right', paddingTop: 5}}/>}
      {![`${i.name}Ascent`] && sortType === i.name && <i className='fa fa-arrow-up' style={{color: 'rgba(77,182,172,1)', float: 'right', paddingTop: 5}}/>}
    </Th>)
})
const publicColumn = <Th key='isPublic'><span className='fa fa-user' title='Veřejné' /></Th>
const listHead = [publicColumn, ...listHeadData, <Th key='remove'/>]
const bodyData = filtered === 'data' ? data : filteredData[filtered]
const listBody = sortBy(bodyData).map(item => (
  <ListItem isEditable={isEditable} item={item} key={item.key}/>
))

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
})


export default List

List.propTypes = {
  data: PropTypes.object,
  isEditable: PropTypes.bool,
}

const ImageButton = ({img, name, number, filter, title}) => {
  return (
    <ImgButton>
      <img name={name} alt={name} onClick={filter} src={img} title={title}/><div>{number}</div>
    </ImgButton>
  )
}

ImageButton.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.number,
  title: PropTypes.string,
  filter: PropTypes.func
}
