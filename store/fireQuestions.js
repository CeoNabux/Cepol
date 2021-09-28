import { fireDataBase } from "~/plugins/firebase/app"
import { collection, addDoc, getDocs } from "firebase/firestore"

export const state = () => ({
  questions: []
})

export const getters = {
  getQuestions(state) {
    return state.questions
  }
}

export const mutations = {
  SET_QUESTION(state, payload) {
    return state.questions.push(payload)
  }
}

export const actions = {
  saveQuestionInformation({ commit }, payload) {
    try {
      const 
    }
    catch (error) {
      console.error(error)
    }
    const question = {
      question: payload.text,
      answers: payload.answers,
      image: payload.image
    }
    commit('SET_QUESTION', question)
  }
}
