<!-- Stub component for managing Stripe checkout. No template: Stripe does all the display work. -->
<template>

</template>

<script>
import axios from "axios"; // an AJAX library

import { SERVERLESS_URL, STRIPE_PUBLIC_KEY } from "@/config.js";
import { json } from "body-parser";

// configure the stripe handler
const stripeHandler = window.StripeCheckout.configure({
  key: STRIPE_PUBLIC_KEY,
  image: "https://stripe.com/img/documentation/checkout/marketplace.png"
});

// event handler for close the stripe modal when navigating away from page
const popstateHandler = function() {
  stripeHandler.close();
};

export default {
  created() {
    // close stripe modal when navigating away from page
    if (this.cart) window.addEventListener("popstate", popstateHandler);
  },

  mounted() {
    const $router = this.$router;
    const $store = this.$store;

    // Open the stripe modal after component mounts
    stripeHandler.open({
      name: "Demo Site",
      description: "",
      amount: $store.getters.subTotal,
      closed() {
        // navigate to home page when modal close
        $router.push("/");
      },
      token(token) {
        const cart = $store.getters.cart;
        // create a Stripe order from cart
        const orderItems = cart.reduce((accumulator, item) => {
          if (
            accumulator.find((searchItem) => searchItem.parent === item.id) ===
            undefined
          ) {
            accumulator.push({
              type: "sku",
              parent: item.id,
              quantity: cart.filter((filterItem) => filterItem.id === item.id)
                .length
            });
          }
          return accumulator;
        }, []);

        // build the request for checkout
        const requestBody = {
          token,
          order: {
            currency: "usd",
            items: orderItems,
            shipping: {
              // use generic shipping info
              name: "Ian Cognito",
              address: {
                line1: "123 Main Street",
                city: "Richmond, Va",
                postal_code: 23294
              }
            }
          }
        };

        // send checkout request
        axios
          .post(SERVERLESS_URL + "charge", JSON.stringify(requestBody))
          .then((response) => {
            // empty the cart
            $store.commit("emptyCart");

            // display the transaction
            $store.commit("replaceLastTransaction", response.data);

            $router.push("/transaction");
          })
          .catch((response) => {
            // let the user know the checkout failed
            $store.dispatch("displayMessage", {
              text: "Checkout failed. Please try again.",
              error: true
            });
          });
      }
    });
  },

  destroyed() {
    // remove the popstate handler after navigating away
    window.removeEventListener("popstate", popstateHandler);
  }
};
</script>