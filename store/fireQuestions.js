import { collection, addDoc } from "firebase/firestore"
import { fireDataBase } from "~/plugins/firebase/app"

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
  async saveQuestionInformation({ commit }, payload) {
    try {
      const question = {
        question: payload.text,
        answers: payload.answers,
        image: payload.image
      }
      const docREF = await addDoc(collection(fireDataBase, 'questions'), question)
      commit('SET_QUESTION', question)
    }
    catch (error) {
      console.error(error)
    }
  }
}
