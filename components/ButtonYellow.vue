<template>
  <button :type="type">
    <a v-if="link != '#'" :href="link">{{ text }}</a>
    <span v-else>{{ text }} </span>
  </button>
</template>

<script>
export default {
  props: {
    link: {
      default: '#',
      required: false,
      type: String
    },
    text: {
      default: '',
      required: true,
      type: String
    },
    type: {
      default: 'button',
      type: String
    }
  }
}
</script>

<style scoped>
button {
  font-family: Sailec, 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  border: none;
  font-size: 1.125rem;
  background: var(--clr-yellow);
  color: var(--clr-dark);

  padding: 0.75em 1.5em;
  font-weight: 500;

  transition: padding 0.4s, border-radius 0.4s;
}
a {
  color: var(--clr-dark);
  text-decoration: none;
}

button:hover {
  padding: 1.25em 2.5em;
  border-radius: 0.25em;
}
@media screen and (min-width: 500px) {
  button {
    font-size: 1.2rem;
  }
}
</style>
