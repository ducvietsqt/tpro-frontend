import axios from "axios";
import {getSESSION, removeSESSION, SESSION, setSESSION} from "../../utils";

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
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      axios
        .post("/api/users/auth/get-code/", user)
        .then(resp => {
          if (resp.data["2fa"] === true) {
            resolve(resp);
          } else {
            setToken(resp, commit, resolve);
          }
        })
        .catch(err => {
          commit("authError");
          reject(err);
        });
    });
  },
  login2({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit("authRequest");
      axios
        .post("/api/users/auth/login/", data)
        .then(resp => {
          setToken(resp, commit, resolve);
        })
        .catch(err => {
          commit("authError");
          removeSESSION(SESSION.TOKEN);
          reject(err);
        });
    });
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

const setToken = (response, commit, resolve) => {
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
