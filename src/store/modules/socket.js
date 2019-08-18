
// initial state
const state = {
  message: 0
};

// getters
const getters = {
  message: state => state.message
};

// actions
const actions = {
  "SOCKET_MSS"({context, commit, state}, mss){ // eslint-disable-line
    console.log(context);
    console.log('testing--------------------');
    commit("SOCKET_MSS", mss);
  }
};

// mutations
const mutations = {
  "SOCKET_MSS"(state, payload) {
    console.log(payload);
    state.message += 1;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
