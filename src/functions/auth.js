import {Fb} from '../firebase/firebase-store'

export function signIn(email, pw) {
  return Fb.firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => alert(error, error))
}

export function logout() {
  return Fb.firebaseAuth().signOut()
}

export function login(email, pw) {
  return Fb.firebaseAuth().signInWithEmailAndPassword(email, pw)
    .catch((error) => alert(error, error))
}

export function saveUser(user) {
  return Fb.ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}
