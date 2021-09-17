import firebase from 'fiebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyC7PwbeY_JaLbeA4fdSIXz2PJYQfAu_bTo',
  authDomain: 'cepol-f002a.firebaseapp.com',
  projectId: 'cepol-f002a',
  storageBucket: 'cepol-f002a.appspot.com',
  messagingSenderId: '766713054373',
  appId: '1:766713054373:web:56f7752bc0e432e383b94c',
  measurementId: 'G-P2H0QN04Q1',
}

const fire = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
const fireAuth = fire.auth()
const fireStore = fire.fireStore()
const fireStorage = fire.storage()


export {
  fireAuth,
  fireStore,
  fireStorage
}