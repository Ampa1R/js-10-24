<template>
    <div class="cart">
        <CartItem
            v-for="item in basket"
            v-bind:key="item.id_product"
            v-bind:item="item"
            @remove-item="removeItem"
        />

        <div v-if="basket.length === 0">Корзина пуста</div> 
    </div>
</template>

<script>
    import CartItem from './CartItem.vue';
    export default {
        name: 'Cart',
        props: ['basket'],
        components: {
            CartItem,
        },
        methods:{
            removeItem(itemId){
                this.$emit('remove-item', itemId)
            }
        }
    }
</script>
  
<style scoped>

</style>







