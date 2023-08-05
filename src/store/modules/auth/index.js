import axios from "@/axios/axios.js";
import { UNSET_TOKEN } from "../../types";
import router from "@/router";

const state = {
  access_token: null,
  user: {},
  loading: false,
  formError: {},
};

const mutations = {
  SET_TOKEN(state, token) {
    state.access_token = token;
  },
  UNSET_TOKEN(state) {
    state.access_token = null;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  UNSET_USER(state) {
    state.user = {};
  },
};

const actions = {
  setToken({ commit }, token) {
    commit("SET_TOKEN", token);
  },
  unsetToken({ commit }) {
    commit("UNSET_TOKEN");
  },
  setUser({ commit }, user) {
    commit("SET_USER", user);
  },
  usetUser({ commit }) {
    commit("UNSET_USER");
  },
  login({commit}, credentials) {
    state.loader = true;
    console.log(`CREDENTIALS: ${JSON.stringify(credentials)}`)
    axios
      .post("/admin/login", credentials)
      .then((response) => {
        state.formError = null;
        commit("SET_TOKEN", response.data.token);
        commit("SET_USER", response.data.user);
        router.push({ name: "Dashboard" });
      })
      .catch((err) => {
        if (err.response) {
          state.formError = err.response.data.errors;
        }
      })
      .finally(() => (state.loading = false));
  },
};

const getters = {
  isAuthenticated: (state) => !!state.access_token,
  access_token: (state) => state.access_token,
  user: (state) => state.user,
};

const authModule = {
  state,
  mutations,
  actions,
  getters,
};

export default authModule;
