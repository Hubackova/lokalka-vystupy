import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Footer, Hr, Navbar, NavLink, Strong} from './style.js'
import Login from './Login'
import Register from './Register'

const Li = styled.li`
    padding: 0.5em 0;
`
const Ul = styled.ul`
 list-style-type: none;
 padding: 0;
`

class LoginLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {registration: false}
  }

  switchPageToRegistration = () => {
    this.setState({registration: true})
  };

  switchPageToLogin = () => {
    this.setState({registration: false})
  };

  render() {
    const switcherText = this.state.registration === true ? 'Přihlášení' : 'Přepnout na vaše cesty'
    return (
      <div className="container-fluid">
        <Navbar>
          <NavLink>
            <a onClick={this.switchPageToRegistration}>Registrace</a>
          </NavLink>
          <NavLink> <a onClick={this.switchPageToLogin}>Přihlášení</a></NavLink>
        </Navbar>
        <div>
          {this.state.registration
            ? <Register switchPageToLogin={this.switchPageToLogin}/>
            : <Login switchPageToRegistration={this.switchPageToRegistration}/>}
        </div>
        <Footer footer mainColor>
          <h1>Výstupy do Výročky 2018</h1>
          <Hr />
          <Ul>
            <Li>Opět sbíráme výstupy pomocí <Strong>formuláře</Strong></Li>
            <Li>Pokud jsi se registroval minulý rok, registrace je stále platná. Pokud ne, prosím <Strong><a onClick={this.switchPageToRegistration}>zaregistruj se</a></Strong>.</Li>
            <Li>Na doporučení expředsedy <Strong>sběr probíhá po celý rok</Strong>, deadline bude upřesněn.</Li>
            <Li>Výstupy je možné editovat - přejdi na zobrazení "Moje cesty" a v přehledu cest klikni na příslušné pole. Výstupy se taky dají řadit podle názvu, oblasti apod. - stačí kliknout na příslušnou hlavičku tabulky</Li>
            <Li>Pro odpůrce formuláře je tu stále možnost zasílat Výstupy na mail <Strong>hubackova.lenka@gmail.com</Strong>. Bizarnosti typu přelety / přeběhy (prostě co se nikam nehodí) taky pošlete na mail.</Li>
            <Li>Pro uživatele <Strong>Internet Explorer</Strong> - aby web nevypadal až tak hnusně, nainstalujte si třeba <Strong><a href='https://www.google.com/chrome'>Chrome</a></Strong>.</Li>
            <Li><Strong>Nápady na zlepšení a změny</Strong> jsou vítány (mail viz výše).</Li>
          </Ul>
        </Footer>
      </div>
    )
  }
}

export default LoginLayout
