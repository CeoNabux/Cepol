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
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { fireDataBase, fireStorage } from '~/plugins/firebase/app'

export const state = () => ({
  questions: [],
  categoryToCount: '',
})

export const getters = {
  getQuestions(state) {
    return state.questions
  },
}

export const mutations = {
  SET_QUESTIONS(state, payload) {
    state.questions.push(payload)
  },
  ERASE_QUESTIONS(state) {
    state.questions = []
  },
  ERASE_QUESTION(state, payload) {
    const toErase = state.questions.find((question) => question.id === payload)
    state.questions.splice(toErase, 1)
  },
  COUNT_CATEGORY(state, payload) {
    state.categoryToCount = payload
  },
}

export const actions = {
  async saveQuestionInformation({ dispatch, commit, state }, payload) {
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
      commit('COUNT_CATEGORY', payload.category)
      dispatch('addCounter')
    } catch (error) {
      console.error(error)
    }
  },
  async fetchQuestions({ commit }) {
    commit('ERASE_QUESTIONS')
    try {
      const questionQuery = query(collection(fireDataBase, 'questions'))
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
      await deleteDoc(doc(fireDataBase, 'questions', payload))
      dispatch('subtractCounter')
      commit('ERASE_QUESTION', payload)
    } catch (error) {
      console.error(error)
    }
  },
}
