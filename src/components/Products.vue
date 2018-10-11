<!-- Fetch and display products from Stripe -->
<template>
  <div class="">
    <!-- Child routes render here -->
    <router-view :products="products"></router-view>

    <!-- The product list -->
    <transition-group name="flip" tag="div" class="products" appear> <!-- Child elements use this transition (defined in CSS) when appearing -->
      <div v-for="sku in skus" :key="sku.id" class="product">
        <img :src="sku.image"></img>
        <div class="name">{{nameFromSku(sku)}}</div>
        <div v-for="(value, attribute) in sku.attributes" :key="attribute" class="attribute">
          <span class="attribute-name">{{attribute}}: </span>
          <span>{{value}}</span>
        </div>
        <div class="price">
          $
          <strong>{{sku.price | dollars}}</strong>
        </div>
        <button @click="addToCart(sku)" class="primary">Add to Cart</button>
      </div>
    </transition-group>

  </div>
</template>

<style lang="less">
.products {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .product {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 10px;
    padding: 10px;
    background-color: rgb(240, 240, 250);
    box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.17);

    img {
      margin: auto;
      height: 200px;
      width: auto;
      object-fit: cover;
      flex-grow: 1;
    }

    .name {
      font-weight: 700;
    }

    .attribute {
      margin-left: auto;
      font-size: smaller;

      .attribute-name {
        font-weight: 700;
      }
    }

    .price {
      margin: 10px auto auto;
    }

    button {
      margin: 12px auto 0;
    }
  }
}

// TRANSITIONS
.flip-enter-active {
  transition: 400ms opacity ease-out 100ms, 500ms transform ease-out;
}
.flip-enter {
  opacity: 0;
  transform: rotateY(-90deg) rotateX(90deg);
}
</style>


<script>
import axios from "axios"; // an AJAX library
import { SERVERLESS_URL } from "@/config.js";

export default {
  data() {
    // this compoment uses products and skus as data
    return {
      products: [],
      skus: []
    };
  },

  created() {
    // fetch products on component creation
    let _this = this;
    axios.get(SERVERLESS_URL + "fetch-products").then((response) => {
      _this.products = response.data.products;
      _this.skus = response.data.skus;
    });
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
    addToCart(sku) {
      // add an item to the cart
      this.$store.commit("addToCart", sku);
    }
  }
};
</script>
