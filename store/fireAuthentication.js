import fireAuth from '@/plugins/firebase.js'

export const data = () => ({
  user: {
    id: '',
  }
})

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  }
}

export const actions = {
  async signUserUp ({ commit }, payload) {
    const user = await fireAuth.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.uid,
          registeredNotes: []
        }
        commit('SET_USER', newUser)
      })
      .catch(error => {
        console.error(error)
      })
  }
}