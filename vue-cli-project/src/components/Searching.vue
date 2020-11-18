<template>
  <input type="text" class="search" placeholder="Поиск" v-bind:value="value" v-on:input="$emit('changeSearchValue', $event.target.value)"/>
</template>

<script>

  export default {
    name: 'Searching',
    props: ['value'],
  }

</script>
  
<style scoped>

</style>
