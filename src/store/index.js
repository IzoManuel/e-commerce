import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import * as getters from "./getters";
import state from "./state";
import { default as mutations } from "./mutations";
import * as actions from "./actions";
import product from "./modules/product";
import cart from "./modules/cart";
import auth from "./modules/auth"

const store = createStore({
  modules: {
    product,
    cart,
    // auth
  },
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState()],
});

export default store;
