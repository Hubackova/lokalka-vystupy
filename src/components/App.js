//@ts-ignore
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { observer, Provider } from "mobx-react";
import { observable } from "mobx";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getDatabase, onValue, ref, set, update } from "firebase/database";
import { logout } from "../functions/auth";
import { Navbar, NavLink, PseudoLink } from "./style.js";
import Routes from "./Routes/Routes";
import RouteForm from "./Routes/RouteForm";
import LoginLayout from "./LoginLayout";
import { Fb } from "../firebase/firebase-store";
import { routesRef } from "../firebase/firebase-store";
import { unstable_batchedUpdates } from "react-dom";

const App = () => {
  const [list, setList] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unstable_batchedUpdates(() => {
        setLoading(false);
        setCurrentUser(user);
      });
      console.log("Auth state changed");
    });
    return unsub;
  }, []);

  const switchPageToList = () => {
    setList(true);
  };

  const switchPageToNew = () => {
    setList(false);
  };
  // const user = Fb.firebaseAuth().currentUser

  console.log(currentUser && currentUser.uid);

  /*   const OwnStore = uid && uid !== "Xs0w4MJr5xakWA4XBtAVAhawqzI3" ? data : data; */

  // return <div style={{height: 500, display: "flex", justifyContent: "center", alignItems: "center"}}><h2>Zápis výstupů byl pro rok  <b style={{color: "green"}}>2021</b> uzavřen. Zápis pro rok <b style={{color: "red"}}>2022</b> začne brzo.</h2></div>

  return loading === true ? (
    <h1>Loading</h1>
  ) : !currentUser ? (
    <LoginLayout />
  ) : (
    <div className="container-fluid">
      {/*menu*/}
      <Navbar>
        <NavLink
          onClick={() => {
            logout();
          }}
        >
          <a href="/">Odhlásit</a>
        </NavLink>
        <PseudoLink id="user">
          <User email={currentUser.email} />
        </PseudoLink>
        <NavLink onClick={switchPageToNew} primary>
          <a>Nová cesta</a>
        </NavLink>
        <NavLink onClick={switchPageToList} primary>
          <a>Přehled cest</a>
        </NavLink>
      </Navbar>
      {/*obsah*/}
      {list ? <Routes /> : <RouteForm />}
    </div>
  );
};

export default App;

const User = ({ email }) => {
  const cname = email || "Anonymní uživatel";
  return <span href="#">{cname}</span>;
};

User.propTypes = {
  email: PropTypes.string,
};
