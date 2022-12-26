import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { initializeApp } from "firebase/app";

const config = {
  apiKey: "AIzaSyBynEwbzJ4zpJB34zr0Kd1ejhmr0lSufUs",
  authDomain: "climbingdiary-a3ae5.firebaseapp.com",
  databaseURL: "https://climbingdiary-a3ae5.firebaseio.com",
  storageBucket: "climbingdiary-a3ae5.appspot.com",
  messagingSenderId: "319637312803",
};

initializeApp(config);
const db = getDatabase();
const firebaseAuth = getAuth();
const routesRef = ref(db, "routes/");

const Fb = {
  ref,
  firebaseAuth,
};

export { Fb, routesRef };
