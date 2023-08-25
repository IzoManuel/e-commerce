import axios from "@/axios/axios.js";

const state = {
  customers: [],
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
  SET_CUSTOMERS(state, payload) {
    state.customers = payload;
  },

  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  UPDATE_CUSTOMER(state, updatedCustomer) {
    const index = state.customers.findIndex(
      (customer) => customer.id === updatedCustomer.id
    );
    if (index !== -1) {
      state.customers[index] = updatedCustomer;
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
    for (let customer of payload.data) {
      state.customers.push(customer);
    }
  },
  ADD_CUSTOMER(state, customer) {
    state.customers.unshift(customer);
  },
  REMOVE_CUSTOMER(state, customerId) {
    state.customers = state.customers.filter((item) => item.id !== customerId);
  },
};

const actions = {
  async getCustomers({ commit }) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get("admin/customers");
      commit("SET_CUSTOMERS", response.data.data);
      commit("SET_PAGE_DATA", response.data);
    } catch (error) {
      console.error("Error fetching customer items:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async getcustomer({ commit }, customerId) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get(`admin/customers/${customerId}`);
      commit("SET_SINGLE_CUSTOMER", response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching customer item:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  updatecustomer({ commit }, customer) {
    commit("UPDATE_CUSTOMER", customer);
  },

  async deleteCustomer({ commit }, customerId) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.delete(`admin/customers/${customerId}`);
      commit("REMOVE_CUSTOMER", customerId);
      return response.data.data;
    } catch (error) {
      console.error("Error deleting customer item:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async loadMore({ commit, state }) {
    try {
      commit("SET_LOADING", true);
      const response = await axios.get(
        "customers?page=" + (state.current_page + 1)
      );
      commit("SET_PAGE_DATA", response.data);
      commit("LOAD_MORE", response.data);
    } catch (error) {
      console.error("Error loading more customer items:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  addCustomer({ commit }, customer) {
    commit("ADD_CUSTOMER", customer);
  },

  removeCustomer({ commit }, customerId) {
    commit("REMOVE_CUSTOMER", customerId);
  },
};

const getters = {
  customers: (state) => state.customers,
  customer: (state) => state.singleCustomer,
  customerById: (state) => (id) => {
    return state.customers.find((customer) => customer.id == id);
  },
  // loading: (state) => state.loading,
  // nextPageExists: (state) => {
  //   return state.current_page < state.last_page;
  // },
};

const customerModule = {
  state,
  mutations,
  actions,
  getters,
};

export default customerModule;
