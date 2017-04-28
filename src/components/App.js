import React, {Component} from 'react';
import {observer, Provider} from 'mobx-react';
import {observable, toJS} from 'mobx';
import DevTools from 'mobx-react-devtools';

// import 'bootstrap/dist/css/bootstrap.css';

import {logout} from '../functions/auth';
import {Fb} from '../firebase/firebase-store';

import {Navbar, NavLink} from './style.js';

import Routes from './Routes/Routes';
import RouteForm from './Routes/RouteForm';
import Login from './Login';
import Register from './Register';
import LoginLayout from './LoginLayout';

import {Store} from '../firebase/Store';
import {routesRef} from '../firebase/firebase-store';

const appState = {
  @observable authorized: false,
  @observable loading: true,
  @observable list: false,
  @observable uid: false,
  @observable email: false
};

@observer class App extends Component {
  componentDidMount() {
    Fb.firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        appState.authorized = true;
        appState.loading = false;
        appState.uid = user.uid;
        appState.email = user.email;
      } else {
        appState.authorized = false;
        appState.loading = false;
        appState.userid = false;
        appState.email = false;
      }
    });
  }

  switchPageToList = () => {
    appState.list = true;
  };

  switchPageToNew = () => {
    appState.list = false;
  };

  render() {
    const user = Fb.firebaseAuth().currentUser;
    const {authorized, email, uid} = appState;
    const OwnStore = (uid !== 'Xs0w4MJr5xakWA4XBtAVAhawqzI3')
      ? new Store(routesRef.orderByChild('uid').equalTo(uid))
      : new Store(routesRef);
    const RoutesStore = new Store(routesRef);

    return appState.loading === true
      ? <h1>Loading</h1>
      : <Provider routestore={RoutesStore} ownstore={OwnStore} uid={uid}>
          {!authorized
          ? <LoginLayout />
          : <div className="container-fluid">
            {/*menu*/}
            <Navbar>
              <NavLink>
                <a href='/'
                onClick={() => {
                  logout();
                  appState.authorized = false;
                }}
                >Odhlásit</a>
                </NavLink>
              <NavLink id='user'><User email={email}/></NavLink>
              <NavLink primary><a onClick={this.switchPageToNew}>Nová cesta</a></NavLink>
              <NavLink primary><a onClick={this.switchPageToList}>Přehled cest</a></NavLink>
            </Navbar>
            {/*obsah*/}
            {!appState.list ? <RouteForm /> : <Routes />}
          </div>}
        </Provider>;
  }
}

export default App;

const User = ({email}) => {
  const cname = email || 'Anonymní uživatel';
  return (
    <span href='#'>
      {cname}
    </span>
  );
};
