<template>
  <div class="basket-item">
    <h4 class="title basket-title">{{ elem.name }}</h4>
    <div>
      <p>$ {{ elem.price }}</p>
    </div>
    <button class="del" v-on:click="delClick">del</button>
  </div>
</template>

<script>
export default {
  name: "BasketItem",
  props: ["elem"],
  methods: {
    delClick() {
      this.$emit("removeItem", this.elem);
    },
  },
};
</script>

<style scoped>
.del {
  padding: 5px;
  margin-left: 10px;
}
</style>