import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
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

const LoginLayout = () => {
  return (
    <Router>
      <div className="container-fluid">
        <Navbar>
          <NavLink> <Link to="/register">Registrace</Link></NavLink>
          <NavLink> <Link to="/">Přihlášení</Link></NavLink>
        </Navbar>
        <div>
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Login} />
        </div>
        <Footer mainColor footer>
          <h1>Výstupy do Výročky 2017</h1>
          <Hr />
          <Ul>
            <Li>Opět sbíráme výstupy pomocí <Strong>formuláře</Strong></Li>
            <Li>Pokud jste se registrovali minulý rok, vaše registrace je stále platná. Pokud ne, prosím <Strong>registrujte se</Strong>.</Li>
            <Li>Na doporučení expředsedy <Strong>sběr probíhá po celý rok</Strong>, deadline bude upřesněn.</Li>
            <Li>Novinkou oproti minulému roku je <Strong>možnost editace výstupů</Strong> - stačí v přehledu cest kliknout na příslušné pole.</Li>
            <Li>Pro odpůrce formuláře je tu stále možnost zasílat Výstupy na mail <Strong>hubackova.lenka@gmail.com</Strong>. Prosím až ke konci roku.</Li>
          </Ul>
        </Footer>
      </div>
    </Router>
  );
};

export default LoginLayout;
