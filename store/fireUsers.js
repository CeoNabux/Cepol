import { fireDataBase } from '~/plugins/firebase/app'
import { updateDoc, doc, query, where, getDocs, collection } from '@firebase/firestore'

export const state = () => ({
  userData: {},
})

export const getters = {
  getUserData(state) {
    return state.userData
  },
}

export const mutations = {
  SET_USER_DATA(state, payload) {
    // RECIBIMOS LA INFORMACION QUE EXISTE DEL USUARIO
    state.userData = payload
  },
}

export const actions = {
  async uploadUserData({ commit }, payload) {
    // RECIBIMOS LA INFORMACION DEL PERFIL PARA ACTUALIZAR LA DATA
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
      })
    } catch (error) {
      console.error(error)
    }
  },
}
