import React, {Component} from 'react';
import styled from 'styled-components';

import {Footer, Hr, Navbar, NavLink, Strong} from './style.js';
import Login from './Login';
import Register from './Register';

const Li = styled.li`
    padding: 0.5em 0;
`;
const Ul = styled.ul`
 list-style-type: none;
 padding: 0;
`;

class LoginLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {login: true};
  }

  switchPageToRegistration = () => {
    this.setState({login: false});
  };

  switchPageToLogin = () => {
    this.setState({login: true});
  };

  render() {
    const switcherText = this.state.login == false ? 'Přihlášení' : 'Přepnout na vaše cesty';
    return (
        <div className="container-fluid">
          <Navbar>
            <NavLink>
              <a onClick={this.switchPageToRegistration}>Registrace</a>
            </NavLink>
            <NavLink> <a onClick={this.switchPageToLogin}>Přihlášení</a></NavLink>
          </Navbar>
          <div>
            {!this.state.login ? <Register /> : <Login />}
          </div>
          <Footer mainColor footer>
            <h1>Výstupy do Výročky 2017</h1>
            <Hr />
            <Ul>
              <Li>Opět sbíráme výstupy pomocí <Strong>formuláře</Strong></Li>
              <Li>Pokud jste se registrovali minulý rok, vaše registrace je stále platná. Pokud ne, prosím <Strong><a href='' onClick={this.switchPageToRegistration}>registrujte se</a></Strong>.</Li>
              <Li>Na doporučení expředsedy <Strong>sběr probíhá po celý rok</Strong>, deadline bude upřesněn.</Li>
              <Li>Novinkou oproti minulému roku je <Strong>možnost editace výstupů</Strong> - stačí v přehledu cest kliknout na příslušné pole.</Li>
              <Li>Pro odpůrce formuláře je tu stále možnost zasílat Výstupy na mail <Strong>hubackova.lenka@gmail.com</Strong>. Prosím až ke konci roku.</Li>
              <Li>Pro uživatele <Strong>Internet Explorer</Strong> - aby web nevypadal až tak hnusně, nainstalujte si třeba <Strong><a href='http://google.com'>Chrome</a></Strong>.</Li>
            </Ul>
          </Footer>
        </div>
    );
  }
}

export default LoginLayout;
