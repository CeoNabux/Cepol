import { collection, getDocs, setDoc, doc } from '@firebase/firestore'
import { fireDataBase } from '~/plugins/firebase/app'

export const state = () => ({
  simulatorActive: false,
  simulatorStructure: [],
  simulators: [],
  simulating: false
})

export const getters = {
  getSimulatorActive(state) {
    return state.simulatorActive
  },
  getSimulatorCategories(state) {
    return state.simulatorStructure
  },
  getSimulators(state) {
    return state.simulators
  },
  isSimulating(state) {
    return state.simulating
  }
}

export const mutations = {
  ACTIVE_SIMULATOR(state, payload) {
    state.simulatorActive = payload
  },
  SET_CATEGORIES(state, payload) {
    state.simulatorStructure = payload
  },
  SET_SIMULATORS(state, payload) {
    state.simulators = payload
  },
  CLEAR_SIMULATORS(state) {
    state.simulators = []
  }
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
        description: payload.description,
        simulatorStructure: payload.simulatorStructure,
        time: payload.time
      }
      const simulatorRef = doc(collection(fireDataBase, 'simulators'))
      await setDoc(simulatorRef, simulatorData)
      this.$router.push('dashboard')
    }
    catch (error) {
      console.error(error)
    }
  },
  async fetchSimulators({ commit }) {
    try {
      const simulatorSnapshot = await getDocs(collection(fireDataBase, 'simulators'))
      const simulatorData = []
      simulatorSnapshot.forEach((doc) => {
        simulatorData.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          simulatorStructure: doc.data().simulatorStructure,
          time: doc.data().time
        })
      })
      commit('SET_SIMULATORS', simulatorData)
    }
    catch (error) {
      console.error(error)
    }
  },
  clearSimulators({commit}) {
    commit('CLEAR_SIMULATORS')
  }
}
