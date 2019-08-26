import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import auth from "./modules/auth";
import game from "./modules/game";
import socket from "./modules/socket";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    user,
    auth,
    socket,
    game
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
