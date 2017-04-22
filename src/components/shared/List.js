import React, {Component, PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import {toJS} from 'mobx';

import {Table, Thead, Th, Tr} from '../style.js';
import ListItem from './ListItem.js';

@observer class List extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  isBoulder = item => item.category == 'Bouldery';
  isRocksShort = item => item.category == 'Skalní jednodélky';
  isRocksLong = item => item.category == 'Skalní vícedélky';
  isSand = item => item.category == 'Písky';
  isMountain = item => item.category == 'Skalní horské výstupy';
  isMix = item => item.category == 'Mixové výstupy v horách';
  isIce = item => item.category == 'Ledy';

  render() {
    const {data} = this.props;

    const boulders = toJS(data).filter(this.isBoulder);
    const rocksShort = toJS(data).filter(this.isRocksShort);
    const rocksLong = toJS(data).filter(this.isRocksLong);
    const sands = toJS(data).filter(this.isSand);
    const mountains = toJS(data).filter(this.isMountain);
    const mixes = toJS(data).filter(this.isMix);
    const ices = toJS(data).filter(this.isIce);


    console.log(boulders);
    const itemNames = ['Kategorie', 'Název cesty', 'Oblast', 'Podoblast', 'Obtížnost', 'Styl', 'Lezci', 'Datum'];
    const listBody = data.map(item => (
      <ListItem item={item} key={item.key} />
    ));
    const listHead = itemNames.map(i => <Th key={i}>{i}</Th>);
    return (
      <div>
      <Table>
        <Thead><Tr>{listHead}<Th></Th></Tr></Thead>
        <tbody>{listBody}</tbody>
      </Table>
      </div>
    );
  }
}

export default List;
