import {
  collection,
  getDocs,
  setDoc,
  doc,
  where,
  limit,
  query,
} from '@firebase/firestore'
import { fireDataBase } from '~/plugins/firebase/app'

export const state = () => ({
  simulatorCategories: [],
  simulators: [],
  isSimulating: false,
  currentSimulator: [],
  currentSimulatorAnswers: [],
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
  },
  getSimulatorAnswers(state) {
    return state.currentSimulatorAnswers
  },
}

export const mutations = {
  START_SIMULATOR(state, Boolean) {
    state.isSimulating = Boolean
  },
  FINISH_SIMULATOR(state, Boolean) {
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
  },
  ADD_ANSWER(state, payload) {
    console.log('agregando respuesta', payload)
    state.currentSimulatorAnswers.push(payload)
  },
  UPDATE_ANSWER(state, payload) {
    console.log('actualizando respuesta', payload)
    state.currentSimulatorAnswers[payload.index].options = payload.options
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
      const categories = [...categoriesData]
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
        time: payload.time,
      }
      const simulatorRef = doc(collection(fireDataBase, 'simulators'))
      await setDoc(simulatorRef, simulatorData)
      this.$router.push('dashboard')
    } catch (error) {
      console.error(error)
    }
  },
  async fetchSimulators({ commit }) {
    try {
      const simulatorSnapshot = await getDocs(
        collection(fireDataBase, 'simulators')
      )
      const simulatorData = []
      simulatorSnapshot.forEach((doc) => {
        simulatorData.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          simulatorStructure: doc.data().simulatorStructure,
          time: doc.data().time,
        })
      })
      commit('SET_SIMULATORS', simulatorData)
    } catch (error) {
      console.error(error)
    }
  },
  clearSimulators({ commit }) {
    commit('CLEAR_SIMULATORS')
  },
  startSimulator({ commit }, Boolean) {
    commit('START_SIMULATOR', Boolean)
  },
  finishSimulator({ commit, getters }, Boolean) {
    let count = 0
    for (let i = 0; i < getters.getCurrentSimulator.length; i++) {
      for (
        let ii = 0;
        ii < getters.getCurrentSimulator[i].questions.length;
        ii++
      ) {
        for (let iii = 0; iii < getters.getSimulatorAnswers.length; iii++) {
          if (
            getters.getCurrentSimulator[i].questions[ii].question ===
            getters.getSimulatorAnswers[iii].question
          ) {
            console.log(getters.getCurrentSimulator[i].questions[ii].options ,
              getters.getSimulatorAnswers[iii].options)
            count = count + 1
          }
        }
      }
    }
    console.log(count)
    commit('FINISH_SIMULATOR', Boolean)
  },
  async setCurrentSimulator({ commit }, payload) {
    try {
      const questionsByCategory = []
      const questionsData = []
      for (let i = 0; i < payload.length; i++) {
        const questionsRef = collection(fireDataBase, 'questions')
        const questionsQuery = query(
          questionsRef,
          where('category', '==', payload[i].categoryName),
          limit(payload[i].number)
        )
        const questionsSnapshot = await getDocs(questionsQuery)
        questionsSnapshot.forEach((doc) => {
          questionsData.push({
            id: doc.id,
            options: doc.data().answers,
            question: doc.data().question,
            image: doc.data().image,
            category: doc.data().category,
          })
        })
        questionsByCategory.push({
          category: payload[i].categoryName,
          questions: [],
        })
      }
      for (let i = 0; i < questionsByCategory.length; i++) {
        for (let ii = 0; ii < questionsData.length; ii++) {
          if (questionsByCategory[i].category === questionsData[ii].category) {
            questionsByCategory[i].questions.push(questionsData[ii])
          } else {
            console.log('Este elemento aun no ha sido agregado')
          }
        }
      }
      commit('SET_CURRENT_SIMULATOR', questionsByCategory)
    } catch (error) {
      console.error(error)
    }
  },
  setAnswer({ commit, getters }, payload) {
    const exist = getters.getSimulatorAnswers.findIndex(
      (question) => question.question === payload.question
    )
    if (exist !== -1) {
      const answerUpdated = {
        options: payload.options,
        index: exist,
      }
      commit('UPDATE_ANSWER', answerUpdated)
    } else {
      const answer = {
        question: payload.question,
        options: payload.options,
      }
      commit('ADD_ANSWER', answer)
    }
  },
}
