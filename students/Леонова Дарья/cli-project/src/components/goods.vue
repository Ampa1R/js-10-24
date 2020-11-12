<template>
  <section class="products container">
    <goods-item
      v-for="item in goods"
      v-bind:item="item"
      v-bind:key="item.id_product"
      v-on:add-item="handleAddItem"
    />
    <div v-if="goods.length === 0">Нет товаров</div>
  </section>
</template>

<script>
import GoodsItem from "./goodsItem";

export default {
  name: "Goods",
  components: {
    GoodsItem,
  },
  props: ["goods"],
  methods: {
    handleAddItem(item) {
      this.$emit("add-item", item);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
