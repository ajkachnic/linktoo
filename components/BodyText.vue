<template>
  <p class="body">{{ text }}</p>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
>
<style scoped>
.body {
  font-weight: 400;
  font-size: 1rem;
  color: var(--clr-dark);
}

@media screen and (min-width: 500px) {
  .body {
    font-size: 1.5rem;
  }
}
</style>
