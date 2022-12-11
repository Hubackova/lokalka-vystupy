import { Fb } from "../firebase/firebase-store";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export function saveUser(user) {
  return Fb.ref
    .child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
    })
    .then(() => user);
}

export function signIn(email, pw) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, pw)
    .then(saveUser)
    .catch((error) => alert(error, error));
}

export function logout() {
  const auth = getAuth();
  return signOut(auth);
}

export function login(email, pw) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, pw).catch((error) =>
    alert(error, error)
  );
}
