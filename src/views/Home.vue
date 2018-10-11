<!-- The main page for the app. Loads and displays the product list and messager. -->
<template>
  <div class="home">
    <router-link to="cart" class="checkout" :style="{visibility: $store.getters.cart.length === 0 ? 'hidden' : 'visible'}">
      Checkout 
      (<span class="cart-size">
        {{$store.getters.cart.length}}
      </span>)
    </router-link>
    <Messages></Messages>
    <Products></Products>
  </div>
</template>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
}
.checkout {
  display: inline-block;
  margin: 0 0 0 auto;
  color: white;
  background-color: rgb(10, 50, 200);
  border-radius: 0 0 0 6px;
  padding: 2px 4px 5px 5px;
  text-decoration: none;

  .cart-size {
    display: inline-block;
    padding: 0 1px;
    color: grey;
  }
}
</style>


<script>
// This view displays products and messages.
import Messages from "@/components/Messages.vue";
import Products from "@/components/Products.vue";

export default {
  name: "home",
  components: {
    Messages,
    Products
  }
};
</script>
