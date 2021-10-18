import { fireDataBase } from '~/plugins/firebase/app'
import {
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  collection,
} from '@firebase/firestore'

export const state = () => ({
  userData: {},
  loading: false
})

export const getters = {
  getUserData(state) {
    return state.userData
  },
  getLoading(state) {
    return state.loading
  }
}

export const mutations = {
  SET_USER_DATA(state, payload) {
    // RECIBIMOS LA INFORMACION QUE EXISTE DEL USUARIO
    state.userData = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  }
}

export const actions = {
  async uploadUserData({ commit }, payload) {
    // RECIBIMOS LA INFORMACION DEL PERFIL PARA ACTUALIZAR LA DATA
    commit('SET_LOADING', true)
    try {
      let userUid
      const userRef = collection(fireDataBase, 'users')
      const userQuery = query(userRef, where('uidRole', '==', payload.id))
      const querySnapshot = await getDocs(userQuery)
      querySnapshot.forEach((doc) => {
        userUid = doc.id
      })
      const docRef = doc(fireDataBase, 'users', userUid)
      await updateDoc(docRef, {
        age: payload.age,
        name: payload.name,
        lastname: payload.lastname,
        birthdate: payload.birthdate
      })
      commit('SET_LOADING', false)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchUserData({ commit }, payload) {
    try {
      let userUid
      const userRef = collection(fireDataBase, 'users')
      const userQuery = query(userRef, where('uidRole', '==', payload.id))
      const querySnapshot = await getDocs(userQuery)
      querySnapshot.forEach((doc) => {
        userUid = doc.id
      })
      const docRef = doc(fireDataBase, 'users', userUid)
      const docSnapshot = await getDoc(docRef)
      commit('SET_USER_DATA', docSnapshot.data())
    } catch (error) {
      console.error(error)
    }
  },
}
