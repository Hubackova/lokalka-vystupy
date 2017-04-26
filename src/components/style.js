import styled from 'styled-components';
import {Link} from 'react-router-dom';

function opacityChanger(opacity) {
  return `rgba(204,230,229,${opacity})`;
}

const colors = {
  lightColor: 'rgba(204,230,229,1)',
  mediumColor: 'rgba(77,182,172,1)',
  darkColor: 'rgba(0,134,125,1)',

  ultraLightGrey: '#efefef',
  lightGrey: '#bdbdbd',
  mediumGrey: '#cfcfcf',
  darkGrey: '#8d8d8d',
}

const lightColor = 'rgba(204,230,229,1)';
const mediumColor = 'rgba(77,182,172,1)';
const darkColor = 'rgba(0,134,125,1)';

const ultraLightGrey = '#efefef';
const lightGrey = '#bdbdbd';
const mediumGrey = '#cfcfcf';
const darkGrey = '#8d8d8d';


const Form = styled.form`
  padding: 2em;
  width: 50%;
  min-width: 320px;
  margin: 2em auto;
  background: white;
  @media only screen and (max-width: 1024px) {
    width: 80%;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ColoredWrapper = styled.div`
  background: ${props => props.mainColor ? lightColor : ultraLightGrey};
`;

const Footer = styled.footer`
  background: ${props => props.mainColor ? opacityChanger(0.8) : ultraLightGrey};
  position: relative;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  text-align: center;
  padding: 1% 5% 8% 5%;
  &:hover {
    background: ${props => props.mainColor ? opacityChanger(1) : ultraLightGrey};
  }
`;

const Thead = styled.thead`
  font-weight: bold;
`;

const Th = styled.th`
  border: none;
  border-bottom: 2px solid ${darkGrey};
  padding: 1em;
  text-align: left;
  @media only screen and (max-width: 414px) {
    padding: 2px;
    &:nth-child(1),&:nth-child(4), &:nth-child(6), &:nth-child(7), &:nth-child(8) {
      display:none;
    }
    &:nth-child(2), &:nth-child(3) {
      width: 45%;
    }
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  font-size: 13sp;
  font-family: Roboto Regular;
  margin: 3em auto;
  width: 96%;
  color: ${darkGrey};
  @media only screen and (max-width: 414px) {
    width: 100%;
  }
`;

const Td = styled.td`
  padding: 2px;
  width: 15%;
  max-width: 250px;
  span {
   text-align: 'left';
  }
  &:nth-child(5), &:nth-child(6),  &:nth-child(8) {
    width: 8%;
  }
  @media only screen and (max-width: 414px) {
    &:nth-child(1),&:nth-child(4), &:nth-child(6), &:nth-child(7), &:nth-child(8) {
      display:none;
    }
    &:nth-child(2), &:nth-child(3) {
      width: 40%;
    }
  }
`;

const Tr = styled.tr`
  background: white;
  border-bottom: 1px solid ${darkGrey};
  &:hover {
    background: ${ultraLightGrey};
  }
  &:hover i {
    color: red;
  }
`;

const AddButton = styled.button`
  color: #000000;
  background: inherit;

  font-size: 1.2em;
  font-weight: bold;
  text-transform: uppercase;


  height: 36px;
  min-width: 88px;

  padding: 8px 0;
  margin: 8px 0;
  border-radius: 2px;
  border: none;


  &:hover {
    cursor: pointer;
    background: ${ultraLightGrey};
    opacity: 0.8;
  }
  &:active, &:focus {
    cursor: pointer;
    background: ${lightGrey};
    opacity: 0.8;
  }
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? '#ff7043' : 'inherit'};
  border: ${props => props.primary ? '1px solid #ff7043' : 'inherit'};

  color: #000000;
  font-size: 1em;
  margin: 0.5em;
  padding: 0 0.3em;
  img {
    @media only screen and (max-width: 768px) {
      width: 50px;
      height: 50px;
    }
  }
`;

const Switcher = styled.a`
  border: 'none';
  display: block;
  width: 100%;
  color: #000000;
  font-size: 1em;
  margin: 2px auto;
  padding: 0 25px;
  cursor: pointer;
`;

const Navbar = styled.ul`
  background: ${mediumColor};
  overflow: hidden;
  padding: 0 20px;
  text-align: center;
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;

const NavLink = styled.li`
  height: 56px;
  display: inline-block;
  float: ${props => props.primary ? 'left' : 'right'};
  padding: 20px 12px;
  &:hover {
    border-bottom: 2px solid ${lightColor};
  }
  a {
    color: white !important;
  }
  a:hover, a:active, a:focus {
    text-decoration: none !important;
  }
  @media only screen and (max-width: 768px) {
    display: block;
    height: 36px;
    padding: 6px;
    width: 100%;
    &:hover {
      background: ${lightColor};
    }
    a {
      color: black !important;
    }
    &#user {
      display: none;
    }
  }
`;

const Hr = styled.hr`
  border: 0.3px solid ${mediumColor};
`;

const Strong = styled.strong`
  color: ${darkColor};
`;

const inputStyle = {
  color: '#000000',
  border: 'none',
  width: '100%',
  background: 'inherit'
};

export {AddButton, Button, colors, Footer, Form, ColoredWrapper, Hr, inputStyle, Navbar, NavLink, Switcher, Strong, Table, Td, Th, Tr, Thead};
