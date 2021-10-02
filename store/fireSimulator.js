import { collection, getDocs } from '@firebase/firestore'
import { fireDataBase } from '~/plugins/firebase/app'

export const state = () => ({
  simulatorActive: false,
  simulatorStructure: [],
})

export const getters = {
  getSimulatorActive(state) {
    return state.simulatorActive
  },
  getSimulatorStructure(state) {
    return state.simulatorStructure
  },
}

export const mutations = {
  ACTIVE_SIMULATOR(state, payload) {
    state.simulatorActive = payload
  },
  SET_QUESTIONS_NUMBER(state, payload) {
    state.simulatorStructure.push(payload)
  }
}

export const actions = {
  async numberOfQuestionsByCategory({ commit }) {
    try {
      console.log('Si me estoy ejecutando')
      const questionsCounterRef = collection(fireDataBase, 'categoryCounters')
      const questionsSnapshot = await getDocs(questionsCounterRef)
      questionsSnapshot.forEach((doc) => {
        commit('SET_QUESTIONS_NUMBER', {
          category: doc.id,
          counter: doc.data().counter
        })
      })
    } catch (error) {
      console.error(error)
    }
  },
}
