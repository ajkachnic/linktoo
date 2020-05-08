export const state = () => ({
  token: ''
})

export const mutations = {
  set(state, text) {
    state.token = text
  },
  reset(state) {
    state.token = ''
  }
}
