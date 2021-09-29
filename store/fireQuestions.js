import { setDoc, updateDoc, query, orderBy, limit, doc, getDoc } from "firebase/firestore"
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
        image: payload.image,
      }
      const questionRef = doc(fireDataBase, 'questions', payload.category)
      await setDoc(questionRef, question)
      commit('SET_QUESTION', question)
    }
    catch (error) {
      console.error(error)
    }
  },
  async getQuestions({ commit }) {
    try{
      const questionRef = doc(fireDataBase, 'questions')
      const questionQuery = query(questionRef, orderBy('category'), limit(5))
      const questionSnap = await getDoc(questionQuery)
      if (questionSnap.exists()) {
        console.log('document data: ', questionSnap.data())
      } else {
        console.log('No existe ese documento')
      }
    }
    catch (error) {
      console.error(error)
    }
  }
}
