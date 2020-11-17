<template>
  <input
    v-bind:value="search"
    v-on:input="$emit('input-change', $event.target.value)"
    type="text"
    class="search"
    placeholder="Поиск"
  />
</template>

<script>
export default {
  props: ["search"],
  model: {
    prop: "searchValue",
    event: "input-change",
  },
};
</script>

<style>
</style>