import axios from "@/axios/axios.js";

const state = {
  orders: [],
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
  SET_ORDERS(state, payload) {
    state.orders = payload;
  },

  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  UPDATE_ORDER(state, updatedOrder) {
    const index = state.orders.findIndex(
      (order) => order.id === updatedOrder.id
    );
    if (index !== -1) {
      state.orders[index] = updatedOrder;
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
    for (let order of payload.data) {
      state.orders.push(order);
    }
  },
  ADD_ORDER(state, order) {
    state.orders.unshift(order);
  },
  REMOVE_ORDER(state, orderId) {
    state.orders = state.orders.filter((item) => item.id !== orderId);
  },
};

const actions = {
  async getOrders({ commit }) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get("admin/orders");
      commit("SET_ORDERS", response.data.data);
      commit("SET_PAGE_DATA", response.data);
    } catch (error) {
      console.error("Error fetching order items:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async getorder({ commit }, orderId) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get(`admin/orders/${orderId}`);
      commit("SET_SINGLE_ORDER", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching order item:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  updateorder({ commit }, order) {
    commit("UPDATE_ORDER", order);
  },

  async deleteOrder({ commit }, orderId) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.delete(`admin/orders/${orderId}`);
      commit("REMOVE_ORDER", orderId);
      return response.data.data;
    } catch (error) {
      console.error("Error deleting order item:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async loadMore({ commit, state }) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get(
        "orders?page=" + (state.current_page + 1)
      );
      commit("SET_PAGE_DATA", response.data);
      commit("LOAD_MORE", response.data);
    } catch (error) {
      console.error("Error loading more order items:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  addOrder({ commit }, order) {
    commit("ADD_ORDER", order);
  },

  removeOrder({ commit }, orderId) {
    commit("REMOVE_ORDER", orderId);
  },
};

const getters = {
  orders: (state) => state.orders,
  order: (state) => state.singleOrder,
  orderById: (state) => (id) => {
    return state.orders.find((order) => order.id == id);
  },
  // loading: (state) => state.loading,
  // nextPageExists: (state) => {
  //   return state.current_page < state.last_page;
  // },
};

const orderModule = {
  state,
  mutations,
  actions,
  getters,
};

export default orderModule;
