import {
  setDoc,
  doc,
  getDocs,
  increment,
  collection,
  query,
  where,
  deleteDoc,
  updateDoc,
  limit,
  startAfter,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { fireDataBase, fireStorage } from '~/plugins/firebase/app'

export const state = () => ({
  questions: [],
  categoryToCount: '',
  loading: false,
  lastQuestion: {},
  confirmation: false,
})

export const getters = {
  getQuestions(state) {
    return state.questions
  },
  getLoading(state) {
    return state.loading
  },
  getConfirmation(state) {
    return state.confirmation
  },
  getLastQuestion(state) {
    return state.lastQuestion
  },
}

export const mutations = {
  SET_QUESTIONS(state, payload) {
    state.questions.push(...payload)
  },
  ERASE_QUESTIONS(state) {
    state.questions = []
  },
  ERASE_QUESTION(state, payload) {
    const toErase = state.questions.findIndex(
      (question) => question.id === payload
    )
    state.questions.splice(toErase, 1)
  },
  COUNT_CATEGORY(state, payload) {
    state.categoryToCount = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  SET_CONFIRMATION(state, payload) {
    state.confirmation = payload
  },
  RESET_QUESTIONS_STORE(state) {
    state.questions = []
    state.categoryToCount = ''
    state.loading = false
    state.lastQuestion = {}
  },
}

export const actions = {
  async saveQuestionInformation({ dispatch, commit }, payload) {
    commit('SET_LOADING', true)
    try {
      const questionRef = doc(collection(fireDataBase, 'questions'))
      let url
      const answerOptions = []
      let image
      let imageName
      let answerUrl
      if (payload.image instanceof File) {
        const id = questionRef.id
        const mainImage = payload.image
        const filename = mainImage.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        const imageRef = ref(fireStorage, 'questionsImage/' + id + ext)
        await uploadBytes(imageRef, mainImage)
        url = await getDownloadURL(imageRef)
      } else {
        url = payload.image
      }
      for (let i = 0; i < payload.answers.length; i++) {
        if (payload.answers[i].text.imageObject instanceof File) {
          image = payload.answers[i].text.imageObject
          imageName = payload.answers[i].text.imageObject.name
          const state = payload.answers[i].state
          const answerImageRef = ref(fireStorage, 'answersImage/' + imageName)
          await uploadBytes(answerImageRef, image)
          answerUrl = await getDownloadURL(answerImageRef)
          answerOptions.push({
            text: answerUrl,
            state: state,
          })
        } else {
          const text = payload.answers[i].text
          const state = payload.answers[i].state
          answerOptions.push({ state: state, text: text })
        }
      }
      
      const questionText = {
        question: payload.question,
        answers: answerOptions,
        category: payload.category,
        image: url,
      }
      await setDoc(questionRef, questionText)
      commit('SET_LOADING', false)
      commit('COUNT_CATEGORY', payload.category)
      dispatch('addCounter')
      commit('SET_CONFIRMATION', true)
      setTimeout(() => commit('SET_CONFIRMATION', false), 500)
    } catch (error) {
      console.error(error)
    }
  },
  async setQuestions({ commit }, payload) {
    commit('ERASE_QUESTIONS')
    try {
      const questions = payload
      commit('SET_QUESTIONS', questions)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchByCategory({ commit }, payload) {
    commit('ERASE_QUESTIONS')
    try {
      const questionQuery = query(
        collection(fireDataBase, 'questions'),
        where('category', '==', payload)
      )
      const questionSnapshot = await getDocs(questionQuery)
      questionSnapshot.forEach((doc) => {
        commit('SET_QUESTIONS', {
          id: doc.id,
          question: doc.data(),
        })
      })
    } catch (error) {
      console.error(error)
    }
  },
  async addCounter({ state }) {
    try {
      const counterRef = doc(
        fireDataBase,
        'categoryCounters',
        state.categoryToCount
      )
      await updateDoc(counterRef, {
        counter: increment(1),
      })
    } catch (error) {
      console.error(error)
    }
  },
  async subtractCounter({ state }) {
    try {
      const counterRef = doc(
        fireDataBase,
        'categoryCounters',
        state.categoryToCount
      )
      await updateDoc(counterRef, {
        counter: increment(-1),
      })
    } catch (error) {
      console.error(error)
    }
  },
  async eraseQuestion({ commit, dispatch }, payload) {
    try {
      commit('SET_LOADING', true)
      commit('COUNT_CATEGORY', payload.question.category)
      await deleteDoc(doc(fireDataBase, 'questions', payload.id))
      dispatch('subtractCounter')
      commit('ERASE_QUESTION', payload.id)
      commit('SET_LOADING', false)
    } catch (error) {
      console.error(error)
    }
  },
  resetQuestionsData({ commit }) {
    commit('RESET_QUESTIONS_STORE')
  }
}
