import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {observable, toJS} from 'mobx';

import List from '../shared/List';

@inject('routestore', 'uid') @observer class Routes extends Component {
  render() {
    const hasData = toJS(this.props.routestore.data).length != 0;
    return (
        <div>
          {hasData && <List data={this.props.routestore.data} />}
        </div>
    );
  }
}
export default Routes;
