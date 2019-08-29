import userApi from "../../api/user";
import * as accountApi from "../../api/account";

// initial state
const state = {
  currentUser: { first_name: '', settings: {} },
  getUser: null,
  dataUser: [],
  dataListUser: [],
  totp: {}
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
  async getUserInProject({ commit }, id) {
    const listUser = await userApi.getListUser(id);
    commit("getUserShowProject", listUser);
  },
  async updateCurrentUser({ commit }, data) {
    const currentUser = await userApi.updateProfile(data);
    commit("setCurrentUser", currentUser);
  },

  async getListUserRequest({ commit }) {
    const users = await userApi.getListUser();
    commit("getListUserSuccess", users);
  },
  async getDataListUserRequest({ commit }) {
    commit("getDataListUser", await userApi.getDataListUser());
  },

  // 2fa
  async createTOTP({commit}) {
    commit("getTOTP", await accountApi.create2faTOTP());
  },
  async registerTOTP({commit}, data) {
    let rs = await accountApi.register2faTOTP(data);
    commit("registerTOTP", rs);
    return rs
  },
  async disableTOTP({commit}) {
    commit("disableTOTP", await accountApi.disalbe2faTOTP());
    return Promise.resolve(1);
  },


};

// mutations
const mutations = {
  getCurrentUserSuccess(state, currentUser) {
    state.currentUser = currentUser;
  },
  getUserShowProject(state, listUser) {
    state.getUser = listUser.dataUser;
  },
  setCurrentUser(state, user) {
    state.currentUser = { ...state.currentUser, ...user };
  },
  setSettingUser(state, settings) {
    state.currentUser['settings'] = {...state.currentUser['settings'], ...settings};
  },
  getListUserSuccess(state, data) {
    state.dataUser = data.dataUser;
  },
  getDataListUser(state, data) {
    state.dataListUser = [{ id: 0, sortable: false }, ...data.map(e => ({ ...e, sortable: false }))];
  },

  // 2fa
  getTOTP(state, data) {
    state.totp = data;
  },
  registerTOTP() {

  },
  disableTOTP() {

  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
