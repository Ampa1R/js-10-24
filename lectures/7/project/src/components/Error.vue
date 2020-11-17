<template>
  <p class="error">
      {{ message }}
  </p>
</template>

<script>
export default {
    // props: ['message'],
    props: {
        message: {
            type: String,
            required: false,
            default: 'Ошибка',
        },
        errors: {
            type: Object,
            required: false,
            default: () => ({ foo: 'bar' }),
        },
    },
}
</script>

<style>
.error {
    padding: 15px;
    border: 1px solid red;
    color: red;
}
</style>
