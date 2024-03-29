import styled from "styled-components";

function opacityChanger(opacity) {
  return `rgba(255, 233, 85,${opacity})`;
}

const colors = {
  lightColor: "#FFE955",
  mediumColor: "#cfcfcf",
  darkColor: "#222222",

  ultraLightGrey: "#efefef",
  lightGrey: "#bdbdbd",
  mediumGrey: "#cfcfcf",
  darkGrey: "#8d8d8d",
};

const lightColor = "#F3B804";
const mediumColor = "#F6D42A";
const darkColor = "#222222";

const ultraLightGrey = "#efefef";
const darkGrey = "#8d8d8d";

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
  background: ${(props) => (props.mainColor ? lightColor : ultraLightGrey)};
`;

const Footer = styled.footer`
  background: ${(props) =>
    props.mainColor ? opacityChanger(0.8) : ultraLightGrey};
  position: relative;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  text-align: center;
  padding: 1% 5% 8% 5%;
  &:hover {
    background: ${(props) =>
      props.mainColor ? opacityChanger(1) : ultraLightGrey};
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
  &:nth-child(1) {
    width: 20px;
    max-width: 20px;
  }
  &:nth-child(3) {
    width: 200px;
    min-width: 200px;
  }
  &:nth-child(7) {
    width: 70px;
    max-width: 70px;
  }
  &:nth-child(8) {
    width: 50px;
    max-width: 80px;
  }
  &:nth-child(9) {
    min-width: 200px;
  }
  &:nth-child(10) {
    min-width: 110px;
    width: 110px;
    max-width: 110px;
  }
  &:nth-child(11) {
    width: 20px;
    max-width: 20px;
  }
  @media only screen and (max-width: 414px) {
    padding: 2px;
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8),
    &:nth-child(10) {
      display: none;
    }
    &:nth-child(2),
    &:nth-child(9) {
      width: 45%;
      min-width: 45%;
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
  padding: 2px 1em;
  width: 15%;
  max-width: 250px;
  span {
    text-align: "left";
  }
  &:nth-child(1) {
    width: 20px;
    max-width: 20px;
  }
  &:nth-child(2) {
    min-width: 215px;
    width: 215px;
  }
  &:nth-child(7) {
    width: 70px;
    max-width: 70px;
  }
  &:nth-child(8) {
    width: 80px;
    max-width: 80px;
  }
  &:nth-child(9) {
    min-width: 100px;
  }
  &:nth-child(10) {
    min-width: 110px;
    width: 110px;
    max-width: 110px;
  }
  &:nth-child(11) {
    width: 20px;
    max-width: 20px;
  }
  @media only screen and (max-width: 414px) {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8),
    &:nth-child(10) {
      display: none;
    }
    &:nth-child(2),
    &:nth-child(9) {
      width: 45%;
      min-width: 45%;
    }
  }
`;

const Tr = styled.tr`
  background: white;
  border-bottom: 1px solid ${darkGrey};
  &:hover {
    background: ${ultraLightGrey};
  }
  & i {
    color: ${darkGrey};
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
    color: ${darkColor};
    opacity: 0.8;
  }
  & i {
    color: green;
  }
`;

const ImgButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "#ff7043" : "inherit")};
  border: ${(props) => (props.primary ? "1px solid #ff7043" : "inherit")};
  margin: ${(props) => (props.remove ? 0 : "0.5em")};
  color: #000000;
  font-size: 1em;
  padding: 0 0.3em;
  :hover,
  :active,
  :focus {
    text-decoration: none !important;
    cursor: pointer !important;
  }
  img {
    @media only screen and (max-width: 768px) {
      width: 50px;
      height: 50px;
    }
  }
`;

const Switcher = styled.a`
  padding: 8px 16px;
  margin-top: 10px !important;
  text-transform: uppercase;
  color: #000000;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    text-decoration: none;
    background: ${lightColor};
    i {
      color: red;
    }
  }
  i {
    padding-right: 10px;
  }
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
  height: 64px;
  display: inline-block;
  float: ${(props) => (props.primary ? "left" : "right")};
  padding: 20px 20px;
  cursor: pointer;
  &:hover {
    border-bottom: 4px solid ${lightColor};
    font-weight: 700;
  }
  a {
    color: ${darkColor} !important;
  }
  a:hover,
  a:active,
  a:focus {
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
const PseudoLink = styled.li`
  height: 64px;
  display: inline-block;
  float: ${(props) => (props.primary ? "left" : "right")};
  padding: 20px 20px;

  @media only screen and (max-width: 768px) {
    display: block;
    height: 36px;
    padding: 6px;
    width: 100%;
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
  color: "black",
  border: "none",
  width: "100%",
  background: "inherit",
};

const inputReadStyle = {
  cursor: "text",
  color: `${darkGrey}`,
  border: "none",
  width: "100%",
  background: "inherit",
};

export {
  AddButton,
  PseudoLink,
  ImgButton,
  colors,
  Footer,
  Form,
  ColoredWrapper,
  Hr,
  inputStyle,
  inputReadStyle,
  Navbar,
  NavLink,
  Switcher,
  Strong,
  Table,
  Td,
  Th,
  Tr,
  Thead,
};
