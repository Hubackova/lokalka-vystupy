import styled from 'styled-components';
import {Link} from 'react-router-dom';

function opacityChanger(opacity) {
  return `rgba(204,230,229,${opacity})`;
}

const lightColor = 'rgba(204,230,229,1)';
const mediumColor = 'rgba(77,182,172,1)';
const darkColor = 'rgba(0,134,125,1)';

const ultraLightGrey = '#efefef';
const lightGrey = '#bdbdbd';
const mediumGrey = '#cfcfcf';
const darkGrey = '#8d8d8d';

const Input = styled.input`
  padding-bottom: 8px;
  border: none;
  width: 80%;
  display: inline-block;
  &::placeholder {
    font-weight: normal;
    color: ${lightGrey};
  }
`;

const Select = styled.select`
  padding-bottom: 8px;
  border: none;
  width: 85%;
  display: inline-block;
  @media (max-width: 1468px) {
    width: 100%;
  }
`;

const Label = styled.label`
  font-size: 0.9em;
  font-weight: normal;
  display: inline-block;
  padding-top: 16px;
  padding-bottom: 8px;
  border: none;
  width: 8em;
`;

const Formgroup = styled.div`
  border-bottom: 1px solid ${lightGrey};
  &:hover Label {
    font-weight: bold;
  }
  &:hover {
    border-bottom: 2px solid ${mediumColor};
  }
`;

const Form = styled.form`
  padding: 2em;
  width: 50%;
  min-width: 320px;
  margin: 2em auto;
  background: white;
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
  border-bottom: 2px solid ${darkGrey};
  padding: 1em;
`;

const Table = styled.table`
  font-size: 13sp;
  font-family: Roboto Regular;
  margin: 3em auto;
  width: 90%;
  color: ${darkGrey};
`;

const Td = styled.td`
  padding: 0.6em;
  width: 15%;
  max-width: 250px;
  &:nth-child(5), &:nth-child(6),  &:nth-child(8) {
    width: 8%;
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
`;

const Navbar = styled.nav`
  background: ${mediumColor};
  height: 50px;
  padding: 0 20px;
  text-align: right;
`;

const NavLink = styled(Link)`
  color: #000000;
  display: block;
  font-family: Helvetica, Arial, sans-serif;

  &:hover {
    background: ${lightColor};
  }

  &:hover, &:active, &:visited {
    color: #000000;
  }
`;
const NavText = styled.a`
  color: #000000;
  display: block;
  font-family: Helvetica, Arial, sans-serif;
  float: right;
  &:hover {
    background: ${lightColor};
    color: #000000;
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

export {AddButton, Button, Footer, Form, Formgroup, ColoredWrapper, Hr, Input, inputStyle, Label, Navbar, NavLink, NavText, Select, Strong, Table, Td, Th, Tr, Thead};
