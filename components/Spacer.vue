<template>
  <div class="spacer" :style="`padding: ${height}`" />
</template>

<script>
export default {
  props: {
    height: {
      default: '0',
      type: String
    }
  }
}
</script>

<style scoped></style>
