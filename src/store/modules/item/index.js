import axios from "@/axios/axios.js";

const state = {
  items: [],
  loading: false,
  current_page: 1,
  last_page: null,
  next_page_url: null,
  per_page: null,
  prev_page_url: null,
  total: 0,
  formError: {},
};

const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload;
  },

  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  UPDATE_ITEM(state, updatedItem) {
    const index = state.items.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      state.items[index] = updatedItem;
    }
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
    for (let item of payload.data) {
      state.items.push(item);
    }
  },

  ADD_ITEM(state, item) {
    state.items.unshift(item);
  },

  REMOVE_ITEM(state, itemId) {
    state.items = state.items.filter((item) => item.id !== itemId);
  },
};

const actions = {
  async getItems({ commit }, { endpoint, searchQuery, page }) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get(endpoint, {
        params: { search: searchQuery, page },
      });
      commit("SET_ITEMS", response.data.data);
      commit("SET_PAGE_DATA", response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async getItem({ commit }, { endpoint, itemId }) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get(`${endpoint}/${itemId}`);
      // Update this to match your naming convention
      commit("SET_SINGLE_ITEM", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching item:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  updateItem({ commit }, { endpoint, item }) {
    commit("UPDATE_ITEM", item);
  },

  async deleteItem({ commit }, { endpoint, itemId }) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.delete(`${endpoint}/${itemId}`);
      commit("REMOVE_ITEM", itemId);
      return response.data.data;
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async loadMore({ commit, state }, { endpoint }) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get(
        `${endpoint}?page=${state.current_page + 1}`
      );
      commit("SET_PAGE_DATA", response.data);
      commit("LOAD_MORE", response.data);
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  addItem({ commit }, { endpoint, item }) {
    commit("ADD_ITEM", item);
  },

  removeItem({ commit }, { itemId }) {
    commit("REMOVE_ITEM", itemId);
  },
};

const getters = {
  items: (state) => state.items,
  itemById: (state) => (id) => {
    return state.items.find((item) => item.id == id);
  },
  loading: (state) => state.loading,
  nextPageExists: (state) => {
    return state.current_page < state.last_page;
  },
  lastPage: (state) => state.last_page
};

const items = {
  state,
  mutations,
  actions,
  getters,
};

export default items;
