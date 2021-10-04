import { collection, getDocs, setDoc, doc } from '@firebase/firestore'
import { fireDataBase } from '~/plugins/firebase/app'

export const state = () => ({
  simulatorActive: false,
  simulatorStructure: [],
})

export const getters = {
  getSimulatorActive(state) {
    return state.simulatorActive
  },
  getSimulatorCategories(state) {
    return state.simulatorStructure
  },
}

export const mutations = {
  ACTIVE_SIMULATOR(state, payload) {
    state.simulatorActive = payload
  },
  SET_CATEGORIES(state, payload) {
    state.simulatorStructure = payload
  },
}

export const actions = {
  async fetchCategoriesState({ commit }) {
    try {
      const questionsCounterRef = collection(fireDataBase, 'categoryCounters')
      const questionsSnapshot = await getDocs(questionsCounterRef)
      const categoriesData = []
      questionsSnapshot.forEach((doc) => {
        categoriesData.push({
          category: doc.id,
          counter: doc.data().counter,
        })
      })
      const categories = [
        ...categoriesData
      ]
      commit('SET_CATEGORIES', categories)
    } catch (error) {
      console.error(error)
    }
  },
  async postSimulator({ commit }, payload) {
    try {
      const simulatorData = {
        title: payload.title,
        desciption: payload.description,
        simulatorStructure: payload.simulatorStructure,
        time: payload.time
      }
      const simulatorRef = doc(collection(fireDataBase, 'simulators'))
      await setDoc(simulatorRef, payload)
    }
    catch (error) {
      console.error(error)
    }
  }
}
