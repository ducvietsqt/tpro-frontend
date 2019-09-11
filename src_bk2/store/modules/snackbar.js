
// initial state
const state = {
  messages: null
};

// getters
const getters = {
  messages: state => state.messages
};

// actions
const actions = {
  async setMessages({ commit }, payload) {
    commit("setMessages", payload);
  },


};

// mutations
const mutations = {
  setMessages(state, currentUser) {
    state.messages = currentUser;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
