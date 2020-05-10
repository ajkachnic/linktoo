<template>
  <h1 class="title">{{ text }}</h1>
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
.title {
  display: block;
  font-weight: 700;
  font-size: 4rem;
  color: var(--clr-pink);
}

@media screen and (min-width: 500px) {
  .title {
    font-size: 6rem;
  }
}
</style>
