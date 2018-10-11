import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  cart: [],
  lastTransaction: {},
  message: null // a global event bus would be better, but this works.
};

// get various details on store state
const getters = {
  cart(state) {
    return state.cart;
  },

  subTotal(state) {
    if (state.cart.length === 0) {
      return 0;
    } else {
      return state.cart
        .map((item) => item.price)
        .reduce((accumulator, price) => accumulator + price);
    }
  },
  message(state) {
    return state.message;
  },
  lastTransaction(state) {
    return state.lastTransaction;
  }
};

// modify store state
const mutations = {
  addToCart(state, sku) {
    state.cart = [...state.cart, sku];
  },
  removeFromCart(state, index) {
    console.log([...state.cart], index);
    state.cart.splice(index, 1);
  },
  emptyCart(state) {
    state.cart = [];
  },
  setMessage(state, message) {
    state.message = message;
  },
  replaceLastTransaction(state, newTransaction) {
    state.lastTransaction = newTransaction;
  },
  clearLastTransaction(state) {
    state.lastTransaction = null;
  }
};

// asyncronous modifications to store state
const actions = {
  displayMessage({ commit }, message) {
    // create a message, wait, and then remove it.

    commit("setMessage", message);

    setTimeout(() => {
      commit("setMessage", null);
    }, 5000);
  }
};

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});
