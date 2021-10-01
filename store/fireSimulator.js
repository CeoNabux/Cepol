export const state = () => ({
  simulatorActive: false,
  durationTest: 0,
})

export const getters = {
  getSimulatorActive(state) {
    return state.simulatorActive
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
  setSimulatorTime({ commit, state }, payload) {
    const oldTime = new Date()
    const newTime = new Date()
    newTime.setTime(oldTime.getTime() + (3600 * 1000))
    const duration = newTime.getTime() - oldTime
    console.log(duration)
    commit('SET_TIME_TEST', duration)
  },
  activeSimulator({ commit }, payload) {
    commit('ACTIVE_SIMULATOR', payload)
  },
}
