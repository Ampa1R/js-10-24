<template>
  <div class="cart">
    <div
      class="cart-item"
      v-for="item in goods"
      v-bind:key="item.id_product"
    >
      <h4>{{ item.product_name }}</h4>
      <p>{{ item.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
    props: ['goods']
};
</script>

<style></style>
