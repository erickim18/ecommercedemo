<!-- Simple component for displaying messages. Uses messages from the Vuex store, but could use an event bus. -->
<template>
  <transition name="message-slide"> <!-- use this transition (defined in CSS) when messages enter/leave -->
    <div class="messages" v-if="message !== null" :style="{backgroundColor: message.error !== true ? 'rgba(0, 150, 50)' : 'rgb(200,50,50)'}">
      {{message.text}}
    </div>
  </transition>
</template>

<style lang="less" scoped>
.messages {
  position: absolute;
  top: 0;
  background-color: rgba(0, 150, 50);
  color: white;
  width: 100vw;
  padding: 5px;
  z-index: -1;
}

// TRANSITIONS
.message-slide-enter-active,
.message-slide-leave-active {
  transition: 500ms opacity ease-out 100ms, 500ms transform ease-out;
}
.message-slide-enter,
.message-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["message"]) // this.message is mapped from the Vuex store
  }
};
</script>

