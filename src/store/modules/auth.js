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
    return new Promise(async resolve => {
      commit("authRequest");
      try {
        commit("authSuccess", {payload: await api.login(user), token: user});
        resolve(true);

      }catch (e) {

        commit("authError", e);
        resolve(false);

        /*commit("authSuccess", {token: user.code});
        resolve(true);*/
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
