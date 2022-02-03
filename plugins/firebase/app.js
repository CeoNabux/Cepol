import { initializeApp } from '@firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFunctions } from 'firebase/functions'

console.log(process.env.NUXT_ENV_APIKEY)

const firebaseConfig = {
  apiKey: process.env.NUXT_ENV_APIKEY,
  authDomain: process.env.NUXT_ENV_AUTHDOMAIN,
  projectId: process.env.NUXT_ENV_PROJECTID,
  storageBucket: process.env.NUXT_ENV_STORAGEBUCKET,
  messagingSenderId: process.env.NUXT_ENV_MESSAGINGSENDER,
  appId: process.env.NUXT_ENV_APPID,
  measurementId: process.env.NUXT_ENV_MEASURESID,
}

const app = initializeApp(firebaseConfig)
const fireDataBase = getFirestore(app)
const fireAuth = getAuth(app)
const fireStorage = getStorage(app)
const fireFunctions = getFunctions(app)

export { app, fireDataBase, fireAuth, fireStorage, fireFunctions }
