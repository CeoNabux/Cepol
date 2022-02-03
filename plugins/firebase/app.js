import { initializeApp } from '@firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'

console.log(process.env.VUE_APP_APIKEY)

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDER,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MEASURESID,
}

const app = initializeApp(firebaseConfig)
const fireDataBase = getFirestore(app)
const fireAuth = getAuth(app)
const fireStorage = getStorage(app)
const fireFunctions = getFunctions(app)

export { app, fireDataBase, fireAuth, fireStorage, fireFunctions }
