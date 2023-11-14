import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import * as getters from "./getters";
import state from "./state";
import { default as mutations } from "./mutations";
import * as actions from "./actions";
import product from "./modules/product";
import category from "./modules/category";
import customer from "./modules/customer";
import cart from "./modules/cart";
import order from "./modules/order";
import adminCart from "./modules/adminCart";
//import auth from "./modules/auth"
import localStoragePlugin from "./localStoragePlugin";

const store = createStore({
  modules: {
    order,
    product,
    cart,
    category,
    customer,
    adminCart,
    // auth
  },
  getters,
  mutations,
  actions,
  plugins: [localStoragePlugin],
});

export default store;
