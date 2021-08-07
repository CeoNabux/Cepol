export const state = () => ({
  show: false
})

export const getters = {
  showMenu (state) {
    return state.show
  }
}

export const mutations = {
  SHOW_MENU ( state, bool ) {
    return state.show = bool
  }
}

export const actions = {
  activeMenu({ commit }, bool) {
    return commit('SHOW_MENU', bool)
  }
}