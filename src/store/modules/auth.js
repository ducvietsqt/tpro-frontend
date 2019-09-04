import axios from "axios";
import {getSESSION, removeSESSION, SESSION, setSESSION} from "../../utils";
import api from '../../api/auth';
// initial state
const state = {
  status: "",
  token: getSESSION(SESSION.TOKEN) || "",
  user: {},
  dataAuth: {},
  isAuthCode: false

};

// getters
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  user: state => state.user,
  dataAuth: state => state.dataAuth,
  isAuthCode: state => state.isAuthCode
};

// actions
const actions = {
  async login({ commit }, user) { // eslint-disable-line
    return new Promise(async resolve => {
      commit("authRequest");
      try {
        commit("authCode", await api.login(user));
        // commit("authSuccess", {payload: await api.login(user), token: user.code});
        resolve(true);
      }catch (e) {
        commit("authError", e);
        resolve(false);

      }
    })

  },
  async logout({ commit }, user) {
    return new Promise(async resolve => {
      commit("logout");
      await api.logout(user);
      removeSESSION(SESSION.TOKEN);
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  }
};

// mutations
const mutations = {
  authRequest(state) {
    state.status = "loading";
  },
  authCode(state, payload) {
    state.dataAuth = payload.data;
    state.isAuthCode = true;
  },
  authSuccess(state, data) {
    state.status = "success";
    state.token = state.dataAuth.code || data.code;
    state.user = state.dataAuth || data;
    setSESSION(SESSION.TOKEN, state.dataAuth.code);
  },
  authError(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.isAuthCode = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
