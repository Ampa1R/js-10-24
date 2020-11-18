<template>
	<p class="error">
		{{ message }}
	</p>
</template>

<script>

  export default {
    name: 'Error',
    props: ['message'],
  }

</script>
  
<style scoped>
	.error{
		color: red;
		border: 5px solid red;
	}
</style>
