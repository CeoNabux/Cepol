import { fireAuth } from "~/plugins/firebase/app"
import { createUserWithEmailAndPassword } from "@firebase/auth"

export const state = () => ({
  user: null
})

export const getters = {
  getUser(state) {
    return state.user
  }
}

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  }
}

export const actions = {
  async signUserUp ({ commit }, payload) {
    try {
      const auth = fireAuth
      const user = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
      const newUser = {
        id: user.user.uid,
        registeredNotes:[]
      }
      commit('SET_USER', newUser)
    }
    catch {
      console.error(error)
    }
  }
}