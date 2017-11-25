import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {toJS} from 'mobx';

import {Button, Table, Thead, Th, Tr} from '../style.js';
import ListItem from './ListItem.js';

const imgBoulder = require('../../images/boulder.gif')
const imgRocksShort = require('../../images/rocks.gif')
const imgRocksLong = require('../../images/long.gif')
const imgSand = require('../../images/sand.gif')
const imgMountain = require('../../images/mountains.gif')
const imgMix = require('../../images/mixy.gif')
const imgIce = require('../../images/ice.gif')
const imgAll = require('../../images/all.png')

@observer class List extends Component {
  constructor(props){
    super(props)
    this.state = {filtered: 'data'}
  }

  boulders = item => item.category == 'Bouldery';
  rocksShort = item => item.category == 'Skalní jednodélky';
  rocksLong = item => item.category == 'Skalní vícedélky';
  sand = item => item.category == 'Písky';
  mountain = item => item.category == 'Skalní horské výstupy';
  mix = item => item.category == 'Mixové výstupy v horách';
  ice = item => item.category == 'Ledy';

  imgButtonClick = e => {
    this.setState({filtered: e.target.name})
  }

  render() {
    const {data, isEditable} = this.props;

    const boulders = toJS(data).filter(this.boulders);
    const rocksShort = toJS(data).filter(this.rocksShort);
    const rocksLong = toJS(data).filter(this.rocksLong);
    const sands = toJS(data).filter(this.sand);
    const mountains = toJS(data).filter(this.mountain);
    const mixes = toJS(data).filter(this.mix);
    const ices = toJS(data).filter(this.ice);

    const filteredData = {boulders, rocksShort, rocksLong, sands, mountains, mixes, ices}

    const itemNames = [<span className='fa fa-user' title='Veřejné'></span>, 'Kategorie', 'Název cesty', 'Oblast', 'Podoblast', 'Obtížnost', 'Styl', 'Lezci', 'Datum'];
    const bodyData = this.state.filtered == 'data' ? data : filteredData[this.state.filtered];
    const listBody = bodyData.map(item => (
      <ListItem item={item} key={item.key} isEditable={isEditable}/>
    ));
    // const listHead = isEditable
    //   ?  itemNames.map(i => <Th key={i}>{i}</Th>)
    //   : itemNames.map(i => <Th key={i}>{i}</Th>).slice(1,itemNames.length);
    const listHead = itemNames.map(i => <Th key={i}>{i}</Th>)

    return (
      <div>
      <div style={{textAlign:'center'}}>
        <ImageButton img={imgBoulder} name='boulders' number={boulders.length} filter={this.imgButtonClick} title='Bouldery'/>
        <ImageButton img={imgRocksShort} name='rocksShort' number={rocksShort.length} filter={this.imgButtonClick} title='Skalní jednodélky'/>
        <ImageButton img={imgRocksLong} name='rocksLong' number={rocksLong.length} filter={this.imgButtonClick} title='Skalní vícedélky'/>
        <ImageButton img={imgSand} name='sands' number={sands.length} filter={this.imgButtonClick} title='Písky'/>
        <ImageButton img={imgMountain} name='mountains' number={mountains.length} filter={this.imgButtonClick} title='Skalní horské výstupy'/>
        <ImageButton img={imgMix} name='mixes' number={mixes.length} filter={this.imgButtonClick} title='Mixové výstupy v horách'/>
        <ImageButton img={imgIce} name='ices' number={ices.length} filter={this.imgButtonClick} title='Ledy'/>
        <ImageButton img={imgAll} name='data' number={data.length} filter={this.imgButtonClick} title='Vše'/>
      </div>
      <Table>
        <Thead>
          <Tr>
            {listHead}
            {isEditable && <Th></Th>}
          </Tr>
        </Thead>
        <tbody>{listBody}</tbody>
      </Table>
      </div>
    );
  }
}

export default List;

const ImageButton = ({img, name, number, filter, title}) => {
    return (
    <Button>
      <img src={img} onClick={filter} name={name} title={title}/><div>{number}</div>
    </Button>
  );
};