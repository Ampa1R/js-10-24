<template>
    <div class="cart-item">
        <h4>{{item.product_name}}</h4>
        <p>{{item.price}}</p>
        <div class="item_counter">{{ item.counter }}</div>
        <button @click="removeItem1">remove</button>
    </div>
</template>

<script>
export default {
    name: "CartItem",
    props: ["item"],
    methods: {
        removeItem1(){
            this.$emit("remove-item", this.item.id_product)
        }
    }
}
</script>
  
<style scoped>
    .item_counter{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: black;
        color: white;
    }
</style>







