<!-- View for reviewing purchase before checking out with stripe -->
<template>
  <div class="cart-bg">
    <div class="cart">

      <!-- Header -->
      <div class="review">
        Review Purchases
        <router-link to="checkout" class="button primary">Finish Purchase</router-link> <!-- button to open Stripe checkout -->
      </div>

      <!-- Contents of the cart -->
      <div v-for="(item, key) in cart" :key="key" class="cart-item">
        <img :src="item.image"></img>
        <div class="name">{{nameFromSku(item)}}</div>
        <div class="attributes">
          <span v-for="(value, attribute) in item.attributes" :key="attribute" class="attribute">
            <span class="attribute-name">{{attribute}}: </span>
            <span>{{value}}</span>
          </span>
        </div>
        <div class="price">
          $
          <strong>{{item.price | dollars}}</strong>
        </div>
        <button @click="removeItemFromCart(key)">Remove From Cart</button>
      </div>

    </div>
  </div>
</template>

<style lang="less" scoped>
.cart-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
}
.cart {
  display: flex;
  flex-direction: column;
  background-color: white;
  max-width: 700px;
  margin: auto;
  padding: 0 10px 0;
}

.review {
  margin: 5px 10px 20px;
  font-size: 30px;
  font-weight: 700;
  display: flex;

  .button {
    margin: -5px 0 auto auto;
    padding: 7px 10px 9px;
  }
}

.cart-item {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: repeat(4, fit-content);
  margin: 0 auto 20px;
  max-width: 500px;
  padding: 10px 10px;
  background-color: #f0f0fa;
  box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.17);

  img {
    grid-column: 1;
    grid-row: ~"1 / 4";
    height: 100px;
    width: auto;
    object-fit: cover;
  }
  :not(img) {
    text-align: right;
  }

  .name {
    margin: auto 0;
    font-weight: 700;
  }

  .attribute {
    font-size: smaller;

    &:not(:last-child)::after {
      content: ", ";
    }

    .attribute-name {
      font-weight: 700;
    }
  }

  .price {
    margin-top: auto;
  }

  button {
    grid-row: 4;
    grid-column: ~"1 / 3";
    margin: 12px auto 0;
  }
}
</style>


<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  props: {
    products: Array // allow product list to be passed down from parent
  },

  computed: {
    ...mapGetters(["cart"]) // map the cart from the Vuex store to this component
  },

  filters: {
    // convert a cents to dollar format
    dollars(value) {
      let valueString = value.toString();
      if (valueString.length < 2) {
        valueString = "00" + valueString;
      } else if (valueString.length < 3) {
        valueString = "0" + valueString;
      }
      const dollars = valueString.slice(0, valueString.length - 2);
      const cents = valueString.slice(valueString.length - 2);
      return `${dollars}.${cents}`;
    }
  },

  methods: {
    nameFromSku(sku) {
      // get product name from SKU
      return this.products.find((product) => product.id === sku.product).name;
    },
    removeItemFromCart(index) {
      // remove an item from the cart
      this.$store.commit("removeFromCart", index);
    }
  }
});
</script>
