import Vue from "vue";
import Router from "vue-router";
import store from "@/store.js";
import Home from "./views/Home.vue";
import Stripe from "./views/Stripe.vue";
import Cart from "./views/Cart.vue";
import Transaction from "./views/Transaction.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/cart",
          name: "cart",
          component: Cart,
          beforeEnter: (to, from, next) => {
            if (store.getters.cart.length === 0) {
              next("/");
            } else {
              next();
            }
          }
        },
        {
          path: "/checkout",
          name: "checkout",
          component: Stripe,
          beforeEnter: (to, from, next) => {
            if (store.getters.cart.length === 0) {
              next("/");
            } else {
              next();
            }
          }
        },
        {
          path: "/transaction",
          name: "transaction",
          component: Transaction,
          beforeEnter: (to, from, next) => {
            if (Object.keys(store.getters.lastTransaction).length === 0) {
              next("/");
            } else {
              next();
            }
          }
        }
      ]
    }
  ]
});
