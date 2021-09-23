export const state = () => ({
  questions: []
})

export const getters = {
  getQuestions(state) {
    return state.questions
  }
}