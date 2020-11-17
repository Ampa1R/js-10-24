<template>
    <input v-bind:value="searchValue" v-on:input="$emit('input-change', $event.target.value)" type="text" class="search" placeholder="Поиск" />
</template>

<script>
export default {
    props: ['searchValue'],
    model: {
        prop: 'searchValue',
        event: 'input-change',
    }
};
</script>

<style>

</style>
