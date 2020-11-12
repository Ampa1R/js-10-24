<template>
  <section class="basket-block">
    <p class="total">Общая сумма вашего заказа: $</p>
    <basket-item
      v-for="elem in basket"
      v-bind:elem="elem"
      v-bind:key="elem.id_product"
      v-on:del-item="delElem"
    />
  </section>
</template>

<script>
import BasketItem from "./basketItem.vue";
export default {
  name: "Basket",
  components: {
    BasketItem,
  },
  props: ["basket"],
  data() {
    return {};
  },
  methods: {
    delElem(elem) {
      this.$emit("del-item", elem);
    },
  },
};
</script>

<style scoped>
</style>