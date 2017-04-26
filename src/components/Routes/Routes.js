import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {observable, toJS} from 'mobx';

import List from '../shared/List';
import {Switcher} from '../style.js';

@inject('ownstore', 'routestore', 'uid') @observer class Routes extends Component {
  constructor(props){
    super(props)
    this.state = {pubicRoutes: false}
  }

  switchRoutes = () => {
    this.setState({pubicRoutes: !this.state.pubicRoutes})
  }

  render() {
    const uid = this.props.uid;
    const ownstoreData = toJS(this.props.ownstore.data);
    const hasownstoreData = ownstoreData.length != 0;

    const data = toJS(this.props.routestore.data);
    const filteredData = data.filter(function (el) {
      return el.isPublic == true || el.uid == uid
      });
    const hasfilteredData = data.length != 0;

    const switcherText = (this.state.pubicRoutes == false) ? 'Přepnout na všechny cesty' : 'Přepnout na vaše cesty'
    return (
        <div>
          <div style={{textAlign: 'center'}}><Switcher onClick={this.switchRoutes}><i className='glyphicon glyphicon-refresh' />{switcherText}</Switcher></div>
          {this.state.pubicRoutes == false
          ?<div>
            {hasownstoreData && <List data={ownstoreData} isEditable={true}/>}
          </div>
          :<div>
            {hasfilteredData && <List data={filteredData} isEditable={false}/>}
          </div>}
        </div>
    );
  }
}
export default Routes;
