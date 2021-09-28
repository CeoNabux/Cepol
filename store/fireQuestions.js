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
    const question = {
      question: payload.text,
      answers: payload.answers,
      image: payload.image
    }
    commit('SET_QUESTION', question)
  }
}
