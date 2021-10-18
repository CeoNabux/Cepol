import { fireAuth } from '~/plugins/firebase/app'
import { fireDataBase } from '~/plugins/firebase/app'
import { addDoc, collection } from '@firebase/firestore'
import { fireFunctions } from '~/plugins/firebase/app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@firebase/auth'
import { httpsCallable } from '@firebase/functions'

// CREANDO LOS ESTADOS PARA LA AUTENTICACION
export const state = () => ({
  user: null,
  loading: false,
  error: null,
})


// GETTERS PARA TOMAR LOS DATOS DEL USUARIOS
// EN CASO DE QUE ESTOS EXISTAN
export const getters = {
  user(state) {
    return state.user
  },
  loading(state) {
    return state.loading
  },
  error(state) {
    return state.error
  }
}


//TENEMOS MUTACIONES PARA USUARIO
// MUTACIONES PARA EL ESTADOS DE CARGA
// MUTACIONES PARA OBTENER EL ERROR
// MUTACIONES PARA LIMPIAR LOS CAMPOS
export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  SET_ERROR(state, payload) {
    state.error = payload
  },
  CLEAR_ERROR(state) {
    state.error = null
  },
}


//SE CREARON LAS FUNCIONES QUE PERMITEN HACER
// LOGEO Y REGISTRO DE USUARIOS

export const actions = {
  async signUserUp({ commit }, payload) {
    commit('SET_LOADING', true)
    commit('CLEAR_ERROR')
    try {
      const auth = fireAuth
      const user = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      )
      const uid = user.user.uid
      const userCollection = await addDoc(collection(fireDataBase, 'users'), {
        uidRole: uid,
        name: '',
        lastname: '',
        email: payload.email,
        age: 0,
        registeredNotes: [],
        institution: ''
      })
      console.log(userCollection)
      commit('SET_LOADING', false)
      this.$router.push('signIn')
    } catch (error) {
      commit('SET_LOADING', false)
      commit('SET_ERROR', error)
      console.error(error)
    }
  },


  //SE CREO UNA FUNCION PARA CREAR A LOS USUARIOS QUE SON ADMINS
  async signAdminUp({ commit }, payload) {
    commit('SET_LOADING', true)
    commit('CLEAR_ERROR')
    const role = {
      admin: true
    }
    try {
      const auth = fireAuth
      const user = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password,
      )
      const setAdmin = httpsCallable(fireFunctions, 'setAdmin')
      await setAdmin({uid: user.user.uid})
      commit('SET_LOADING', false)
      this.$router.push('signIn')
    } catch (error) {
      commit('SET_LOADING', false)
      commit('SET_ERROR', error)
      console.error(error)
    }
  },


  // PEDIMOS EL INICIO DE SESION DE LO USUARIOS
  async signUserIn({ commit }, payload) {
    commit('SET_LOADING', true)
    commit('CLEAR_ERROR')
    try {
      const auth = fireAuth
      const user = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      )
      const newUser = {
        id: user.user.uid,
        registeredNotes: [],
      }
      commit('SET_LOADING', false)
      commit('SET_USER', newUser)
    } catch (error) {
      commit('SET_LOADING', false)
      commit('SET_ERROR', error)
      console.error(error)
    }
  },

  //CERRAMOS LA SESION DE LOS USUARIOS
  async signUserOut({ commit }) {
    await fireAuth.signOut()
    commit('SET_USER', null)
  },
  clearError({ commit }) {
    commit('CLEAR_ERROR')
  }
}
