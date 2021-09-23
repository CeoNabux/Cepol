import { fireAuth } from '~/plugins/firebase/app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth'

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
      commit('SET_USER', newUser)
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
}
