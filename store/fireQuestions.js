import { setDoc, doc, getDocs, collection, query, where, deleteDoc } from "firebase/firestore"
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
  SET_QUESTIONS(state, payload) {
    return state.questions.push(payload)
  },
  ERASE_QUESTIONS(state) {
    return state.questions = []
  },
  ERASE_QUESTION(state, payload) {
    const toErase = state.questions.find((question) => question.id === payload )
    console.log(toErase)
    state.questions.splice(toErase, 1)
  }
}

export const actions = {
  async saveQuestionInformation({ commit }, payload) {
    try {
      const question = {
        question: payload.text,
        answers: payload.answers,
        image: payload.image,
        category: payload.category,
      }
      const questionRef = doc(collection(fireDataBase, 'questions'))
      await setDoc(questionRef, question)
      commit('SET_QUESTIONS', question)
    }
    catch (error) {
      console.error(error)
    }
  },
  async fetchQuestions({ commit }) {
    try{
      const questionQuery = query(collection(fireDataBase, 'questions'))
      const questionSnapshot = await getDocs(questionQuery)
      questionSnapshot.forEach((doc) => {
        commit('SET_QUESTIONS', {
          id: doc.id,
          question: doc.data()
        })
      })
    }
    catch (error) {
      console.error(error)
    }
  },
  async fetchByCategory({ commit }, payload) {
    commit('ERASE_QUESTIONS')
    try{
      const questionQuery = query(collection(fireDataBase, 'questions'), where('category', '==', payload))
      const questionSnapshot = await getDocs(questionQuery)
      questionSnapshot.forEach((doc) => {
        commit('SET_QUESTIONS', {
          id: doc.id,
          question: doc.data()
        })
      })
    }
    catch (error) {
      console.error(error)
    }
  },
  async eraseQuestion({ commit }, payload) {
    try {
      await deleteDoc(doc(fireDataBase, 'questions', payload))
      commit('ERASE_QUESTION', payload)
    }
    catch (error) {
      console.error(error)
    }
  }
}
