import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {observer, inject} from 'mobx-react'
import {toJS} from 'mobx'

import List from '../shared/List'
import {Switcher} from '../style.js'


@inject('ownstore', 'routestore', 'uid') @observer class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {pubicRoutes: false}
  }

  switchRoutes = () => {
    this.setState((prevState) => {
      return {pubicRoutes: !prevState.pubicRoutes}
    });
  }

  render() {
    const {uid, ownstore, routestore} = this.props
    const ownstoreData = toJS(ownstore.data)
    const hasownstoreData = ownstoreData.length !== 0
    const data = toJS(routestore.data)
    const filteredData = data.filter(function (el) {
      return el.isPublic === true || el.uid === uid
    })
    const hasfilteredData = data.length !== 0
    const switcherText = (this.state.pubicRoutes === false) ? 'Všechny cesty' : 'Moje cesty'
    return (
      <div>
        <div style={{textAlign: 'center'}}><Switcher onClick={this.switchRoutes}><i className='fa fa-refresh' />{switcherText}</Switcher></div>
        {this.state.pubicRoutes === false
          ? <div>
            {hasownstoreData && <List data={ownstoreData} isEditable/>}
          </div>
          : <div>
            {hasfilteredData && <List data={filteredData} isEditable={false}/>}
          </div>}
      </div>
    )
  }
}
export default Routes

Routes.propTypes = {
  uid: PropTypes.string,
  ownstore: PropTypes.object,
  routestore: PropTypes.object
};

