import { fireAuth } from '~/plugins/firebase/app'
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
      const newUser = {
        id: user.user.uid,
        registeredNotes: [],
      }
      commit('SET_LOADING', false)
      this.$router.push('signIn')
    } catch (error) {
      commit('SET_LOADING', false)
      commit('SET_ERROR', error)
      console.error(error)
    }
  },
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
  async signUserOut({ commit }) {
    await fireAuth.signOut()
    commit('SET_USER', null)
  },
  clearError({ commit }) {
    commit('CLEAR_ERROR')
  }
}
