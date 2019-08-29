import axios from "axios";
import {getSESSION, removeSESSION, SESSION, setSESSION} from "../../utils";
import api from '../../api/auth';
// initial state
const state = {
  status: "",
  token: getSESSION(SESSION.TOKEN) || "",
  user: {}
};

// getters
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  user: state => state.user
};

// actions
const actions = {
  async login({ commit }, user) { // eslint-disable-line
    commit("authRequest");
    try {
      commit("authSuccess", {token: 'MNV01'});
      commit("authSuccess1", await api.login(user));

    }catch (e) {
      console.log(e.message);
      commit("authError", e.message);
    }
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("logout");
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
  authSuccess(state, {token}) {
    console.log(token)
    state.status = "success";
    state.token = token;
    // state.user = user;
    setSESSION(SESSION.TOKEN, token);
  },
  authError(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};