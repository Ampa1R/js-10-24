<template>
  <div class="item">
      <h4>{{item.product_name}}</h4>
      <p>{{item.price}}</p>
      <button v-on:click="handleButtonClick">Add to basket</button>
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
