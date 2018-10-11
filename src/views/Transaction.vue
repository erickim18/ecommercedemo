<template>
  <div class="transaction-bg">
    <div class="transaction">
      <header>Transaction Successful!</header>

      <section class="amounts">
        <div v-for="item in lastTransaction.order.items" :key="item.parent" class="item">
          <span>{{item.description}}</span>
          <span>{{item.quantity !== null ? "✕ " + item.quantity : ''}}</span>
          <span>{{item.amount | dollars}}</span>
        </div>
        <div class="total">
          <span>Total:</span>
          <span>${{lastTransaction.order.amount | dollars }}</span>
        </div>
      </section>

      <section class="ids">
        <div>
          <span>Order ID:</span>
          <span> {{lastTransaction.order.id}}</span>
        </div>
        <div>
          <span>Charge ID:</span>
          <span> {{lastTransaction.order.charge}}</span>
        </div>
      </section>

      <router-link to="/" class="button primary">Continue Shopping</router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.transaction-bg {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
}

.transaction {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: max-content;
  max-width: 700px;
  margin: auto;
  padding: 10px 40px 20px;
  background-color: #f0f0fa;

  header {
    margin: 5px 0 20px;
    font-size: 30px;
    font-weight: 700;
    text-align: left;
  }

  .amounts {
    font-size: smaller;
  }
  .item,
  .total {
    display: flex;
    margin: 3px 0;
  }
  .item {
    :first-child {
      font-weight: 600;
    }
    :not(:nth-child(3)) {
      margin-right: 20px;
    }
    :nth-child(3) {
      margin-left: auto;
      font-weight: 700;
    }
  }
  .total {
    :first-child {
      font-weight: 900;
    }
    :nth-child(2) {
      margin-left: auto;
      font-weight: 900;
    }
  }

  .ids {
    margin: 20px 0 0;
    font-size: small;

    > * :first-child {
      font-weight: 600;
    }
  }

  .button {
    margin: 20px 0 0 auto;
  }
}
</style>


<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["lastTransaction"])
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
  }
};
</script>
