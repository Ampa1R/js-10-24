<template>
  <div class="goods">
      <GoodsItem 
          v-for="(item,index) in goods"
          v-bind:key="index"
          v-bind:item="item" 
          v-on:add-item="handleAddItem"
      />
      <div v-if="goods.length === 0">Нет товаров</div>
  </div>
</template>

<script>
    import GoodsItem from './GoodsItem.vue';
    export default {
        name: 'Goods',
        props: ['goods'],
        components: {
            GoodsItem,
        },
        methods: {
            handleAddItem(item) {
                this.$emit('add-item', item);
            }
        }
    }

</script>
  
<style scoped>

</style>
