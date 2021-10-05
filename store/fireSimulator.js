import { collection, getDocs, setDoc, doc, getDoc } from '@firebase/firestore'
import { fireDataBase } from '~/plugins/firebase/app'

export const state = () => ({
  simulatorCategories: [],
  simulators: [],
  isSimulating: false,
  currentSimulator: {}
})

export const getters = {
  getSimulatorCategories(state) {
    return state.simulatorCategories
  },
  getSimulators(state) {
    return state.simulators
  },
  isSimulating(state) {
    return state.isSimulating
  },
  getSimulatorsById(state) {
    return state.simulators.map((simulator) => ({ id: simulator.id }))
  },
  getCurrentSimulator(state) {
    return state.currentSimulator
  }
}

export const mutations = {
  START_SIMULATOR(state, Boolean) {
    state.isSimulating = Boolean
  },
  SET_CATEGORIES(state, payload) {
    state.simulatorCategories = payload
  },
  SET_SIMULATORS(state, payload) {
    state.simulators = payload
  },
  CLEAR_SIMULATORS(state) {
    state.simulators = []
  },
  SET_CURRENT_SIMULATOR(state, payload) {
    state.currentSimulator = payload
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
  },
  startSimulator({commit}, Boolean) {
    commit('START_SIMULATOR', Boolean)
  },
  async setCurrentSimulator({ commit }, payload) {
    try{
      console.log(payload)
      const simulatorRef = doc(fireDataBase, 'simulators', payload)
      const simulatorSnapshot = await getDoc(simulatorRef)
      const currentSimulator = simulatorSnapshot.data()
      console.log('saludos desde la traida del test')
      console.log(currentSimulator)
      // commit('SET_CURRENT_SIMULATOR', currentSimulator)
    } catch (error) {
      console.error(error)
    }
  }
}
