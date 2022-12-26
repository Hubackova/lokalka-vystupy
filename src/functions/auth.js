import { Fb } from "../firebase/firebase-store";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { child, getDatabase, push, ref, set } from "firebase/database";

export function saveUser(user) {
  console.log(user, "aaaaaaaaaaaaaaa", user.uid, user.email);
  const db = getDatabase();
  return set(ref(db, "users/" + user.uid + "/info"), {
    email: user.email,
    uid: user.uid,
  });
}

export function signIn(email, pw) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, pw)
    .then((user) => saveUser(user.user))
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
