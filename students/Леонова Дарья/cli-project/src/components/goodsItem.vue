<template>
  <div class="item">
    <img v-bind:src="item.img" alt="" />
    <h4 class="title">{{ item.name }}</h4>
    <p>$ {{ item.price }}</p>
    <button class="buy" v-on:click="handleButtonClick">Buy</button>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: ["item"],
  methods: {
    handleButtonClick() {
      this.$emit("add-item", this.item);
    },
  },
};
</script>

<style scoped>
</style>