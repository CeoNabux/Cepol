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
  originalSimulator: [],
  currentSimulatorAnswers: [],
  score: 0,
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
  getOriginalSimulator(state) {
    return state.originalSimulator
  },
  getSimulatorAnswers(state) {
    return state.currentSimulatorAnswers
  },
  getScore(state) {
    return state.score
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
  CLEAR_SIMULATOR(state) {
    state.currentSimulator = []
  },
  CLEAR_SIMULATORS(state) {
    state.currentSimulator = []
  },
  SET_CURRENT_SIMULATOR(state, payload) {
    state.currentSimulator = payload
  },
  SET_ORIGINAL_SIMULATOR(state, payload) {
    state.originalSimulator = payload
  },
  ADD_ANSWER(state, payload) {
    state.currentSimulatorAnswers.push(payload)
  },
  UPDATE_ANSWER(state, payload) {
    state.currentSimulatorAnswers[payload.index].options = payload.options
  },
  SCORE_TEST(state, payload) {
    state.score = payload
  },
  RESET_SCORE(state) {
    state.score = 0
  },
  MARK_ANSWER(state, payload) {
    const categoryIndex = state.currentSimulator.findIndex(
      (category) => category.category === payload.category
    )
    const questionIndex = state.currentSimulator[
      categoryIndex
    ].questions.findIndex((question) => question.question === payload.question)
    const optionIndex = payload.options.findIndex(
      (option) => option.state === true
    )
    state.currentSimulator[categoryIndex].questions[questionIndex].state = true
    state.currentSimulator[categoryIndex].questions[
      questionIndex
    ].options.forEach((option) => (option.state = false))
    state.currentSimulator[categoryIndex].questions[questionIndex].options[
      optionIndex
    ].state = true
  },
  RESET_SIMULATION(state) {
    state.currentSimulator = []
    state.originalSimulator = []
    state.currentSimulatorAnswers = []
    state.score = 0
  },
  RESET_SIMULATOR_STORE(state) {
    state.simulatorCategories = []
    state.simulators = []
    state.isSimulating = false
    state.currentSimulator = []
    state.originalSimulator = []
    state.currentSimulatorAnswers = []
    state.score = 0
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
    for (let i = 0; i < getters.getOriginalSimulator.length; i++) {
      for (
        let ii = 0;
        ii < getters.getOriginalSimulator[i].questions.length;
        ii++
      ) {
        for (let iii = 0; iii < getters.getSimulatorAnswers.length; iii++) {
          if (
            getters.getOriginalSimulator[i].questions[ii].question ===
            getters.getSimulatorAnswers[iii].question
          ) {
            const comparingOptions = (objc1, objc2) =>
              Object.keys(objc1).length === Object.keys(objc2).length &&
              Object.keys(objc1).every((p) => objc1[p] === objc2[p])

            const comparingAnswer = (simulatorOptions, studentOptions) =>
              simulatorOptions.length === studentOptions.length &&
              simulatorOptions.every((o, idx) =>
                comparingOptions(o, studentOptions[idx])
              )

            const correctAnswer = comparingAnswer(
              getters.getOriginalSimulator[i].questions[ii].options,
              getters.getSimulatorAnswers[iii].options
            )

            if (correctAnswer === true) {
              count = count + 1
            }
          }
        }
      }
    }
    const averageScorePerAnswer = 4
    const freePoints = 600
    const score = Math.trunc(freePoints + count * averageScorePerAnswer)
    commit('SCORE_TEST', score)
    commit('FINISH_SIMULATOR', Boolean)
    commit('CLEAR_SIMULATOR')
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
          }
        }
      }
      const questionsSet = questionsByCategory.filter(
        (questionToRemove) => questionToRemove.questions.length !== 0
      )
      const newSetOfQuestions = questionsSet.map((category) => ({
        ...category,
        questions: category.questions.map((question) => ({
          id: question.id,
          question: question.question,
          category: question.category,
          image: question.image,
          state: false,
          options: question.options.map((option) => ({
            state: false,
            text: option.text,
          })),
        })),
      }))
      for (let index = 0; index < newSetOfQuestions.length; index++) {
        for (
          let j, x, i = newSetOfQuestions[index].questions.length;
          i;
          j = Math.floor(Math.random() * i),
            x = newSetOfQuestions[index].questions[--i],
            newSetOfQuestions[index].questions[i] =
              newSetOfQuestions[index].questions[j],
            newSetOfQuestions[index].questions[j] = x
        );
      }
      console.log(newSetOfQuestions)
      commit('SET_CURRENT_SIMULATOR', newSetOfQuestions)
      commit('SET_ORIGINAL_SIMULATOR', questionsSet)
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
  resetScore({ commit }) {
    commit('RESET_SCORE')
  },
  markAnswer({ commit }, payload) {
    commit('MARK_ANSWER', payload)
  },
  resetDataSimulation({ commit }) {
    commit('RESET_SIMULATION')
  },
  resetSimulatorData({ commit }) {
    commit('RESET_SIMULATOR_STORE')
  }
}
