export const state = () => ({
  simulatorActive: false,
  seconds: 0,
  miliseconds: 0,
  secondsTest: 0,
  milisecondsTests: 0
})

export const getters = {
  getTime(state) {
    return state.seconds, state.miliseconds
  },
  getTimer(state) {
    return state.active
  },
  getSimulatorActive(state) {
    return state.simulatorActive
  }
}

export const mutations = {
  SET_TIME(state, payload) {
    state.seconds = payload.seconds
    state.miliseconds = payload.miliseconds
  },
  ACTIVE_SIMULATOR(state, payload) {
    state.simulatorActive = payload
  }
}

export const actions = {
  setSimulatorTime({ commit }, payload) {
    console.log(payload)
  },
  activeSimulator({ commit }, payload) {
    commit('ACTIVE_SIMULATOR', payload)
  }
}
