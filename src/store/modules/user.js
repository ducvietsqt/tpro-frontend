import userApi from "../../api/user";

// initial state
const state = {
  currentUser: { first_name: '', settings: {} },
};

// getters
const getters = {
  currentUser: state => state.currentUser,
  getUser: state => state.getUser,
  getName: state => {
    try {
      return state.currentUser.name
    } catch (e) {
      return ""
    }
  },
  getFirstName: state => {
    try {
      return state.currentUser.first_name;
    } catch (e) {
      return ""
    }
  },
  getLastName: state => {
    try {
      return state.currentUser.last_name;
    } catch (e) {
      return ""
    }
  },
  getUsername: state => {
    try {
      return state.currentUser.username || state.currentUser.name;
    } catch (e) {
      return ""
    }
  },
  getAvatar: state => {
    try {
      return state.currentUser.avatar;
    } catch (e) {
      return ""
    }
  },
  getAvatarFile: state => {
    try {
      return state.currentUser.avatarFile;
    } catch (e) {
      return ""
    }
  },
  dataUser: state => state.dataUser,
  dataListUser: state => state.dataListUser,

  // 2fa
  totp: state => state.totp

};

// actions
const actions = {
  async updateCurrentUser({ commit }) {
    const currentUser = await userApi.getMe();
    commit("setCurrentUser", currentUser);
  },


};

// mutations
const mutations = {
  getCurrentUserSuccess(state, currentUser) {
    state.currentUser = currentUser;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
