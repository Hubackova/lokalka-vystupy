import React, {Component} from 'react';
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

@observer class List extends Component {

  isBoulder = item => item.category == 'Bouldery';
  isRocksShort = item => item.category == 'Skalní jednodélky';
  isRocksLong = item => item.category == 'Skalní vícedélky';
  isSand = item => item.category == 'Písky';
  isMountain = item => item.category == 'Skalní horské výstupy';
  isMix = item => item.category == 'Mixové výstupy v horách';
  isIce = item => item.category == 'Ledy';

  render() {
    const {data, isEditable} = this.props;

    const boulders = toJS(data).filter(this.isBoulder);
    const rocksShort = toJS(data).filter(this.isRocksShort);
    const rocksLong = toJS(data).filter(this.isRocksLong);
    const sands = toJS(data).filter(this.isSand);
    const mountains = toJS(data).filter(this.isMountain);
    const mixes = toJS(data).filter(this.isMix);
    const ices = toJS(data).filter(this.isIce);

    const itemNames = ['Veřejné', 'Kategorie', 'Název cesty', 'Oblast', 'Podoblast', 'Obtížnost', 'Styl', 'Lezci', 'Datum'];
    const listBody = data.map(item => (
      <ListItem item={item} key={item.key} isEditable={isEditable}/>
    ));
    const listHead = isEditable
      ?  itemNames.map(i => <Th key={i}>{i}</Th>)
      : itemNames.map(i => <Th key={i}>{i}</Th>).slice(1,itemNames.length);
    return (
      <div>
      <ImageButton img={imgBoulder} number={boulders.length}/>
      <ImageButton img={imgRocksShort} number={rocksShort.length}/>
      <ImageButton img={imgRocksLong} number={rocksLong.length}/>
      <ImageButton img={imgSand} number={sands.length}/>
      <ImageButton img={imgMountain} number={mountains.length}/>
      <ImageButton img={imgMix} number={mixes.length}/>
      <ImageButton img={imgIce} number={ices.length}/>

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

const ImageButton = ({img, number}) => {
    return (
    <Button>
      <img src={img} /><div>{number}</div>
    </Button>
  );
};
