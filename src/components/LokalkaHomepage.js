import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Footer, Hr, Navbar, NavLink, Strong} from './style.js'
import styled from 'styled-components'
import App from './App'

const Li = styled.li`
    padding: 0.5em 0;
`
const Ul = styled.ul`
 list-style-type: none;
 padding: 0;
`
const StrongB = styled.strong`
 color: #252525;
`
const HrB = styled.hr`
 color: #252525;
`

const A = styled.a`
 color: #a50f15;
 font-weight: bold;
`

const imgLokalka = require('../images/lokalka.png')

class LokalkaHomepage extends Component {
  state = {home: true}

  switchPageToHome = () => {
    this.setState({home: true})
  };

  switchPageToDiary = () => {
    this.setState({home: false})
  };

  render() {
    const isHome = this.state.home
    if (!isHome) return <App/>
    return (
      <div className="container-fluid">
        <Navbar style={{backgroundColor: '#969696', textAlign: 'left'}}>
        <img src={imgLokalka} title='Logo'/>
        </Navbar>
        <Footer footer style={{backgroundColor: '#f7f7f7'}}>
          <h1>Web lokálky dočasně nefunguje :(</h1>
          <HrB />
          <Ul>
            <Li>Kvůli útokům a s tím spojeným přetížením serverů <StrongB>jsme byli nuceni webové stránky lokalka.eu dočasně vypnout</StrongB>. Hledá se náhradní řešení.</Li>
            <Li>Pokud se najde někdo, kdo <StrongB>rozumí WordPressu především z hlediska bezpečnosti</StrongB> a je ochotnej webu věnovat trochu času, bude super, když se ozve třeba mě (hubackova.lenka@gmail.com) nebo Evce B.</Li>
            <HrB />
            <Li><StrongB>Program horoškoly</StrongB> najdete <A href="https://docs.google.com/spreadsheets/d/1iB8yl7VzFLZb_-v-eh8W9zlY8lYWU-OPnecx_L8773M/edit#gid=955794777">tady</A></Li>
            <Li>Odkaz na <StrongB>tabulku k zimním Tatrám <A href="https://docs.google.com/spreadsheets/d/1JuRNZe7JVs5kySsGlqaja4qbzj6aRCdinLIzfAYVizM/edit#gid=0">tady</A></StrongB></Li>
            <Li>Pořád funguje <StrongB><A onClick={this.switchPageToDiary} style={{color:'#a50f15'}}>deníček výstupů</A></StrongB></Li>
            <Li>V mezičase můžete zapsat do <A href="https://docs.google.com/spreadsheets/d/11X9z_VWIMOW3nVgaWn5R8l979tBzALTfGp_TIQ8DVE4/edit#gid=0">knihovničkové tabulky</A>, co máte za průvodce, který jste ochotni zapůjčit</Li>
            <Li>Pokud chcete na tuhle tu provizorní stránku <StrongB>přihodit nějaký info / odkaz</StrongB>, dejte vědět, není problem</Li>
            <Li>Ještě odkaz na <StrongB><A href="https://www.facebook.com/groups/567033560144439/">Facebook Lokálky</A></StrongB></Li>
            <Li>Tak zatím uživejte hor a pište články - ať je na web co dávat, až zase povstane z popela!</Li>
          </Ul>
        </Footer>
      </div>
    )
  }
}

export default LokalkaHomepage


