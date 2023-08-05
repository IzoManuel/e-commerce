import axios from "@/axios/axios.js";

const state = {
  productItems: [],
  loading: false,
  current_page: 1,
  last_page: null,
  next_page_url: null,
  per_page: null,
  prev_page_url: null,
  total: 0,
};

const mutations = {
  GET_PRODUCT_ITEMS(state, payload) {
    state.productItems = payload;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_PAGE_DATA(state, payload) {
    state.current_page = payload.meta.current_page;
    state.last_page = payload.meta.last_page;
    state.next_page_url = payload.links.next;
    state.prev_page_url = payload.links.prev;
    state.per_page = payload.meta.per_page;
    state.total = payload.meta.total;
  },

  LOAD_MORE(state, payload) {
    for (let productItem of payload.data) {
      state.productItems.push(productItem);
    }
  },
};

const actions = {
  getProductItems({ commit }) {
    commit("SET_LOADING", true);
    axios
      .get("products")
      .then((response) => {
        commit("GET_PRODUCT_ITEMS", response.data.data);
        commit("SET_PAGE_DATA", response.data);
      })
      .finally(() => commit("SET_LOADING", false));
  },
  loadMore({ commit }) {
    commit("SET_LOADING", true);
    axios
      .get("products?page=" + (state.current_page = state.current_page + 1))
      .then((response) => {
        commit("SET_PAGE_DATA", response.data);
        commit("LOAD_MORE", response.data);
      })
      .finally(() => commit("SET_LOADING", false));
  },
};

const getters = {
  productItems: (state) => state.productItems,
  productItemById: (state) => (id) => {
    return state.productItems.find((productItem) => productItem.id === id);
  },
  loading: (state) => state.loading,
  nextPageExists: (state) => {
    return state.current_page < state.last_page;
  },
};

const productModule = {
  state,
  mutations,
  actions,
  getters,
};

export default productModule;
