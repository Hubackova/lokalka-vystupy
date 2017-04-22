import firebase from 'firebase';
import {toJS} from 'mobx';

const config = {
  apiKey: 'AIzaSyBynEwbzJ4zpJB34zr0Kd1ejhmr0lSufUs',
  authDomain: 'climbingdiary-a3ae5.firebaseapp.com',
  databaseURL: 'https://climbingdiary-a3ae5.firebaseio.com',
  storageBucket: 'climbingdiary-a3ae5.appspot.com',
  messagingSenderId: '319637312803'
};

firebase.initializeApp(config);

const ref = firebase.database().ref();
const firebaseAuth = firebase.auth;

const usersRef = ref.child('users');
const routesRef = ref.child('routes/');

function removeItem(key) {
  routesRef.child(key).remove();
};

const Fb = {
  removeItem,
  ref,
  firebaseAuth,
};

export {Fb, routesRef};
