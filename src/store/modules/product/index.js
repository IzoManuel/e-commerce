import axios from "@/axios/axios.js";

const state = {
  productItems: [],
  singleProduct: null,
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
  SET_PRODUCT_ITEMS(state, payload) {
    state.productItems = payload;
  },

  SET_SINGLE_PRODUCT(state, product) {
    state.singleProduct = product;
  },

  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  UPDATE_PRODUCT_ITEM(state, updatedProduct) {
    const index = state.productItems.findIndex(
      (product) => product.id === updatedProduct.id
    );
    if (index !== -1) {
      state.productItems[index] = updatedProduct;
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
    for (let productItem of payload.data) {
      state.productItems.push(productItem);
    }
  },
  ADD_PRODUCT(state, product) {
    state.productItems.push(product);
  },
  REMOVE_PRODUCT(state, productId) {
    state.productItems = state.productItems.filter((item) => item.id !== productId);
  },
};

const actions = {
  async getProductItems({ commit }) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get("products");
      commit("SET_PRODUCT_ITEMS", response.data.data);
      commit("SET_PAGE_DATA", response.data);
    } catch (error) {
      console.error("Error fetching product items:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async getProductItem({ commit }, productId) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get(`admin/products/${productId}`);
      commit("SET_SINGLE_PRODUCT", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching product item:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  updateProductItem({ commit }, productItem) {
    commit("UPDATE_PRODUCT_ITEM", productItem);
  },

  async deleteProductItem({ commit }, productId) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.delete(`admin/products/${productId}`);
      commit("REMOVE_PRODUCT", productId);
      return response.data.data;
    } catch (error) {
      console.error("Error deleting product item:", error);
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
      console.error("Error loading more product items:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  addProduct({ commit }, product) {
    commit("ADD_CATEGORY", product);
  },

  removeProduct({ commit }, productId) {
    commit("REMOVE_PRODUCT", productId);
  },
};

const getters = {
  productItems: (state) => state.productItems,
  productItem: (state) => state.singleProduct,
  productItemById: (state) => (id) => {
    return state.productItems.find((productItem) => productItem.id == id);
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
