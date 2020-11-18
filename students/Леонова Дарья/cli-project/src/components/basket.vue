<template>
  <section class="basket-block">
    <p class="total">Общая сумма вашего заказа: $</p>
    <div
      class="basket-item"
      v-for="item in basket"
      v-bind:key="item.id_product"
    >
      <h4 class="title basket-title">{{ item.name }}</h4>
      <p>$ {{ item.price }}</p>
      <button class="del" @click="$emit('remove-item', item.id_product)">
        del
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Basket",
  props: ["basket"],
};
</script>

<style scoped>
.del {
  padding: 5px;
  margin-left: 10px;
}
</style>