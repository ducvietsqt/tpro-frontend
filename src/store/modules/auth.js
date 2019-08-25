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
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/users/me")
        .then(resp => {
          commit("updateUser", resp.data);
          commit("user/getCurrentUserSuccess", resp.data, { root: true });
          resolve(resp.data);
        })
        .catch(err => {
          commit("authError");
          reject(err);
        });
    });
  },
  async login({ commit }, user) {
    // console.log(await api.getList());
    commit("authRequest");
    try {
      commit("authSuccess", await api.login(user));
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
  updateUser(state, user) {
    state.user = user;
  },
  authRequest(state) {
    state.status = "loading";
  },
  authSuccess(state, { token, user }) {
    state.status = "success";
    state.token = token;
    state.user = user;
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

const setToken = (response, commit, resolve) => { // eslint-disable-line
  const token = response.data.token;
  const user = response.data.user;
  setSESSION(SESSION.TOKEN, token);
  setAxiosAuthorizationHeader(token);
  commit("authSuccess", { token, user });
  resolve(response);
};

export const setAxiosAuthorizationHeader = token => {
  axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
};

export const setSubdomains = subdomain => {
  let subdomains = getSESSION(SESSION.SUBDOMAINS) || [];
  subdomains = subdomains.filter(item => item !== subdomain);
  subdomains.push(subdomain);
  setSESSION(SESSION.SUBDOMAINS, JSON.stringify(subdomains));
};

export const getRecentDomain = () => {
  let subdomains = getSESSION(SESSION.SUBDOMAINS) || [];
  return subdomains.pop();
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
