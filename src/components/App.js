import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {observer, Provider} from 'mobx-react'
import {observable} from 'mobx'

import {logout} from '../functions/auth'
import {Navbar, NavLink, PseudoLink} from './style.js'
import Routes from './Routes/Routes'
import RouteForm from './Routes/RouteForm'
import LoginLayout from './LoginLayout'
import {Fb} from '../firebase/firebase-store'
import {Store} from '../firebase/Store'
import {routesRef} from '../firebase/firebase-store'

const appState = {
  @observable authorized: false,
  @observable loading: true,
  @observable list: false,
  @observable uid: false,
  @observable email: false
}

@observer class App extends Component {
  componentDidMount() {
    Fb.firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        appState.authorized = true
        appState.loading = false
        appState.uid = user.uid
        appState.email = user.email
      } else {
        appState.authorized = false
        appState.loading = false
        appState.userid = false
        appState.email = false
      }
    })
  }

  switchPageToList = () => {
    appState.list = true
  };

  switchPageToNew = () => {
    appState.list = false
  };

  render() {
    // const user = Fb.firebaseAuth().currentUser
    const {authorized, email, uid} = appState
    const OwnStore = (uid !== 'Xs0w4MJr5xakWA4XBtAVAhawqzI3')
      ? new Store(routesRef.orderByChild('uid').equalTo(uid))
      : new Store(routesRef)
    const RoutesStore = new Store(routesRef)
    // return <div style={{height: 500, display: "flex", justifyContent: "center", alignItems: "center"}}><h2>Zápis výstupů byl pro rok  <b style={{color: "green"}}>2018</b> uzavřen. Zápis pro rok <b style={{color: "red"}}>2019</b> začne brzo.</h2></div>
    return appState.loading === true
      ? <h1>Loading</h1>
      : <Provider ownstore={OwnStore} routestore={RoutesStore} uid={uid}>
        {!authorized
          ? <LoginLayout />
          : <div className="container-fluid">
            {/*menu*/}
            <Navbar>
              <NavLink onClick={() => {
                    logout()
                    appState.authorized = false
                  }}>
                <a href='/'>Odhlásit</a>
              </NavLink>
              <PseudoLink id='user'><User email={email}/></PseudoLink>
              <NavLink  onClick={this.switchPageToNew} primary><a>Nová cesta</a></NavLink>
              <NavLink  onClick={this.switchPageToList} primary><a >Přehled cest</a></NavLink>
            </Navbar>
            {/*obsah*/}
            {!appState.list ? <RouteForm /> : <Routes />}
          </div>}
      </Provider>
  }
}

export default App

const User = ({email}) => {
  const cname = email || 'Anonymní uživatel'
  return (
    <span href='#'>
      {cname}
    </span>
  )
}

User.propTypes = {
  email: PropTypes.string
}
