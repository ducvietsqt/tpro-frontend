import axios from "axios";
import {getSESSION, removeSESSION, SESSION, setSESSION} from "../../utils";
import api, {updateLogin} from '../../api/auth';
// initial state
const state = {
  status: "",
  token: getSESSION(SESSION.TOKEN) || "",
  user: getSESSION(SESSION.USER) || {},
  dataAuth: {},
  isAuthCode: false,
  isLoggedInTemp: false,

};

// getters
const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  user: state => state.user,
  dataAuth: state => state.dataAuth,
  isAuthCode: state => state.isAuthCode,

  isLoggedInTemp: state => state.isLoggedInTemp, // luu trang thai khi user dang nhap chinh thong
};

// actions
const actions = {
  async login({commit}, user) { // eslint-disable-line
    return new Promise(async resolve => {
      commit("authRequest");
      try {
        commit("authCode", await api.login(user));
        // commit("authSuccess", {payload: await api.login(user), token: user.code});
        resolve(true);
      } catch (e) {
        commit("authError", e);
        resolve(false);

      }
    })

  },
  async logout({commit}, user) {
    return new Promise(async resolve => {
      commit("logout");
      await api.logout(user);
      removeSESSION([], true);
      delete axios.defaults.headers.common["Authorization"];
      resolve();
      location.reload();
    }, reject => {
      reject("Authorization")
    });
  },
  updateLogin({commit}, data) {
    return new Promise(async resolve => {
      let rs = await api.updateLogin(data);
      resolve(rs);
    }, reject => {
      reject(false);
    })
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
    state.isLoggedInTemp = true;
    setSESSION(SESSION.TOKEN, state.dataAuth.code);
    setSESSION(SESSION.USER, state.dataAuth || data);
    setSESSION(SESSION.GAMEOVER, false);
    setSESSION(SESSION.NEXT_ROUND, true);
   
  },
  authError(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    state.isAuthCode = false;
  },
  setStatusLoggedInTemp(state, payload) {
    state.isLoggedInTemp = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
