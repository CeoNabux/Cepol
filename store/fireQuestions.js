import { setDoc, doc, getDocs, increment, collection, query, where, deleteDoc, updateDoc } from "firebase/firestore"
import { fireDataBase } from "~/plugins/firebase/app"

export const state = () => ({
  questions: [],
  categoryToCount: ''
})

export const getters = {
  getQuestions(state) {
    return state.questions
  }
}

export const mutations = {
  SET_QUESTIONS(state, payload) {
    state.questions.push(payload)
  },
  ERASE_QUESTIONS(state) {
    state.questions = []
  },
  ERASE_QUESTION(state, payload) {
    const toErase = state.questions.find((question) => question.id === payload )
    state.questions.splice(toErase, 1)
  },
  COUNT_CATEGORY(state, payload) {
    state.categoryToCount = payload
  }
}

export const actions = {
  async saveQuestionInformation({ dispatch, commit, state }, payload) {
    try {
      const question = {
        question: payload.text,
        answers: payload.answers,
        image: payload.image,
        category: payload.category,
      }
      const questionRef = doc(collection(fireDataBase, 'questions'))
      await setDoc(questionRef, question)
      commit('COUNT_CATEGORY', payload.category)
      dispatch('addCounter')
    }
    catch (error) {
      console.error(error)
    }
  },
  async fetchQuestions({ commit }) {
    commit('ERASE_QUESTIONS')
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
  async addCounter({ state }) {
    try{
      console.log('comienza el try', state.categoryToCount)
      const counterRef = doc(fireDataBase, 'categoryCounters', state.categoryToCount )
      await updateDoc(counterRef, {
        counter: increment(1)
      })
    } catch (error) {
      console.error(error)
    }
  },
  async subtractCounter({ state }) {
    try{
      const counterRef = doc(fireDataBase, 'categoryCounters', state.categoryToCount )
      await updateDoc(counterRef, {
        counter: increment(-1)
      })
    } catch (error) {
      console.error(error)
    }
  },
  async eraseQuestion({ commit, dispatch }, payload) {
    try {
      await deleteDoc(doc(fireDataBase, 'questions', payload))
      dispatch('subtractCounter')
      commit('ERASE_QUESTION', payload)
    }
    catch (error) {
      console.error(error)
    }
  }
}
