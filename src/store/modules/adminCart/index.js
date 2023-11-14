import axios from "@/axios/axios.js";

const state = {
  cartItems: [],
  showSlideover: false
};

const mutations = {
  ADD_CART_ITEM(state, {cartItem, increment = 1}) {
    const existingProduct = state.cartItems.find((item) => item.id === cartItem.id);
    if (existingProduct && increment < 12) {
      existingProduct.quantity += increment;
    }else{
      cartItem.quantity = 1
      state.cartItems.push(cartItem);
    }
    
  },
  INCREMENT_QUANTITY(state, {cartItemId, increment = 1}) {
    const cartItem = state.cartItems.find(item => item.id == cartItemId);
    if(cartItem && cartItem.quantity < 13) {
      cartItem.quantity += increment
    }
  }, 
  DECREMENT_QUANTITY(state, cartItemId) {
    const cartItem = state.cartItems.find(item => item.id === cartItemId);
    if(cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
    }
  },
  REMOVE_CART_ITEM(state, cartItemId) {
    state.cartItems = state.cartItems.filter(item => item.id !== cartItemId);
  },
  TOGGLE_SLIDEOVER(state) {
    state.showSlideover = !state.showSlideover;
  }
};

const actions = {
  addCartItem({ commit }, payload) {
    commit("ADD_CART_ITEM", payload);
  },
  incrementCartItemQuantity({commit}, payload) {
    commit('INCREMENT_QUANTITY', payload)
  },
  decrementCartItemQuantity({commit}, cartItemId) {
    commit('DECREMENT_QUANTITY', cartItemId)
  },
  removeCartItem({commit}, cartItemId) {
    commit('REMOVE_CART_ITEM', cartItemId);
  },
  toggleSlideover({commit}) {
    commit('TOGGLE_SLIDEOVER')
  }
};

const getters = {
  cartItems: (state) => state.cartItems,
  totalQuantity: (state) => {
    return state.cartItems.reduce((total, item) => total + item.quantity, 0);
  },
  totalPriceForCartItem: (state) => (itemId) => {
    const cartItem = state.cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity * cartItem.unit_price : 0;
  },
  totalCartPrice(state) {
    return state.cartItems.reduce((total, item) => {
      return total + item.unit_price * item.quantity;
    }, 0);
  },
  showSlideover: (state) => state.showSlideover
};

const adminCart = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default adminCart;
