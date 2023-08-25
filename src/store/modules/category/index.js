import axios from "@/axios/axios.js";

const state = {
  categories: [],
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
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },

  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  UPDATE_CATEGORY(state, updatedCategory) {
    const index = state.categories.findIndex(
      (category) => category.id === updatedCategory.id
    );
    if (index !== -1) {
      state.categories[index] = updatedCategory;
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
    for (let category of payload.data) {
      state.categories.push(category);
    }
  },
  ADD_CATEGORY(state, category) {
    state.categories.unshift(category);
  },
  REMOVE_CATEGORY(state, categoryId) {
    state.categories = state.categories.filter((item) => item.id !== categoryId);
  },
};

const actions = {
  async getCategories({ commit }) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get("categories");
      commit("SET_CATEGORIES", response.data.data);
      commit("SET_PAGE_DATA", response.data);
    } catch (error) {
      console.error("Error fetching category items:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async getcategory({ commit }, categoryId) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get(`admin/products/${categoryId}`);
      commit("SET_SINGLE_CATEGORY", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching category item:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  updatecategory({ commit }, category) {
    commit("UPDATE_CATEGORY", category);
  },

  async deleteCategory({ commit }, categoryId) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.delete(`admin/categories/${categoryId}`);
      commit("REMOVE_CATEGORY", categoryId);
      return response.data.data;
    } catch (error) {
      console.error("Error deleting category item:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async loadMore({ commit, state }) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get(
        "products?page=" + (state.current_page + 1)
      );
      commit("SET_PAGE_DATA", response.data);
      commit("LOAD_MORE", response.data);
    } catch (error) {
      console.error("Error loading more category items:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  addCategory({ commit }, category) {
    commit("ADD_CATEGORY", category);
  },

  removeCategory({ commit }, categoryId) {
    commit("REMOVE_CATEGORY", categoryId);
  },
};

const getters = {
  categories: (state) => state.categories,
  category: (state) => state.singleCategory,
  categoryById: (state) => (id) => {
    return state.categories.find((category) => category.id == id);
  },
  // loading: (state) => state.loading,
  // nextPageExists: (state) => {
  //   return state.current_page < state.last_page;
  // },
};

const categoryModule = {
  state,
  mutations,
  actions,
  getters,
};

export default categoryModule;
