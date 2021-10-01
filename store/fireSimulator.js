export const state = () => ({
  simulatorActive: false,
  simulatorStructure: {},
})

export const getters = {
  getSimulatorActive(state) {
    return state.simulatorActive
  },
  getSimulatorStructure(state) {
    return state.simulatorStructure
  },
}

export const mutations = {
  ACTIVE_SIMULATOR(state, payload) {
    state.simulatorActive = payload
  },
  SET_TIME_TEST(state, payload) {
    state.durationTest = payload
  },
  UPDATE_TIME_TEST(state, payload) {
    state.durationTest = payload
  },
}

export const actions = {
  async fetchNumberOfCategories({ commit }, payload) {
    try {
    } catch (error) {}
  },
}
