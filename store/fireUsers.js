import { fireDataBase } from '~/plugins/firebase/app'
import {
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  collection,
  arrayUnion,
} from '@firebase/firestore'

export const state = () => ({
  userData: {},
  loading: false,
  registeredNotes: [],
  userUid: '',
  instructors: [],
})

export const getters = {
  getUserData(state) {
    return state.userData
  },
  getLoading(state) {
    return state.loading
  },
  getScores(state) {
    return state.registeredNotes
  },
  getInstructors(state) {
    return state.instructors
  },
}

export const mutations = {
  SET_USER_DATA(state, payload) {
    // RECIBIMOS LA INFORMACION QUE EXISTE DEL USUARIO
    state.userData = payload
  },
  SET_LOADING(state, payload) {
    // cargando datos recibimos los datos del formulario
    state.loading = payload
  },
  SET_NEW_SCORE(state, payload) {
    // RECIBIMOS UNA NUEVA NOTA
    state.registeredNotes.push(payload)
  },
  SET_SCORES(state, payload) {
    // RECIBIMOS LOS DATOS DE LA BASE DE DATOS
    state.registeredNotes = payload
  },
  SET_UID(state, payload) {
    //RECIBIMOS EL UID PARA REUTILIZARLOS PARA LLEVAR
    //REGISTROS EN LA COLECCION USERS
    state.userUid = payload
  },
  SET_INSTRUCTORS(state, payload) {
    // SE PASAN LOS DATOS QUE TRAEMOS DE LOS INTRUCTORES
    state.instructors = payload
  },
  SET_INSTRUCTOR(state, payload) {
    state.instructors.push(payload)
  }
}

export const actions = {
  // ACTUALIZAMOS LOS DATOS EN BASE DE DATOS
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
        birthdate: payload.birthdate,
      })
      commit('SET_LOADING', false)
    } catch (error) {
      console.error(error)
    }
  },
  //TRAEMOS LOS DATOS DEL USUARIO DE LA BASE DE DATOS
  async fetchUserData({ commit }, payload) {
    try {
      let userUid
      const userRef = collection(fireDataBase, 'users')
      const userQuery = query(userRef, where('uidRole', '==', payload))
      const querySnapshot = await getDocs(userQuery)
      querySnapshot.forEach((doc) => {
        userUid = doc.id
      })
      commit('SET_UID', userUid)
      const docRef = doc(fireDataBase, 'users', userUid)
      const docSnapshot = await getDoc(docRef)
      const userData = docSnapshot.data()
      commit('SET_USER_DATA', userData)
      commit('SET_SCORES', userData.registeredNotes)
    } catch (error) {
      console.error(error)
    }
  },
  async addScore({ commit, getters }, payload) {
    try {
      let userUid
      const userRef = collection(fireDataBase, 'users')
      const userQuery = query(userRef, where('uidRole', '==', payload.uid))
      const querySnapshot = await getDocs(userQuery)
      querySnapshot.forEach((doc) => {
        userUid = doc.id
      })
      const docRef = doc(fireDataBase, 'users', userUid)
      await updateDoc(docRef, {
        registeredNotes: arrayUnion(payload.score),
      })
      commit('SET_NEW_SCORE', payload.score)
    } catch (error) {
      console.error(error)
    }
  },
  // TRAEMOS USUARIOS QUE SON INSTRUCTORES
  async fetchInstructors({ commit }) {
    try {
      const instructors = []
      const instructorQuery = await getDocs(
        collection(fireDataBase, 'instructors')
      )
      instructorQuery.forEach((doc) => {
        instructors.push(doc.data())
      })
      commit('SET_INSTRUCTORS', instructors)
    } catch (error) {
      console.error(error)
    }
  },
  setInstructor({ commit }, payload) {
    commit('SET_INSTRUCTOR', { email: payload.email })
  }
}
