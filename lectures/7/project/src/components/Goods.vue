<template>
  <div class="goods">
    <goods-item
      v-for="item in goods"
      v-bind:key="item.id_product"
      v-bind:item="item"
      v-on:add-item="handleAddItem"
    />
    <div v-if="goods.length === 0">Нет товаров</div>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem.vue';

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

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
