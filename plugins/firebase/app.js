import { initializeApp } from '@firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyC7PwbeY_JaLbeA4fdSIXz2PJYQfAu_bTo',
  authDomain: 'cepol-f002a.firebaseapp.com',
  projectId: 'cepol-f002a',
  storageBucket: 'cepol-f002a.appspot.com',
  messagingSenderId: '766713054373',
  appId: '1:766713054373:web:56f7752bc0e432e383b94c',
  measurementId: 'G-P2H0QN04Q1',
}

const app = initializeApp(firebaseConfig)
const fireDataBase = getFirestore(app)
const fireAuth = getAuth(app)
const fireStorage = getStorage(app)
const fireFunctions = getFunctions(app)

export { app, fireDataBase, fireAuth, fireStorage, fireFunctions }
