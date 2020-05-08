<template>
  <nav class="nav">
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/pricing">Pricing</a>
      </li>
      <li>
        <a href="/about">About Us</a>
      </li>
      <li>
        <a href="/start">{{ isAuthed ? 'Profile' : 'Try it' }}</a>
      </li>
    </ul>
  </nav>
</template>
<style scoped>
nav.nav {
  background: #202020;
  color: #fff;
  padding: 1.5em 0;
  font-weight: 500;
}
nav.nav ul {
  display: flex;
  justify-content: space-around;
}
li {
  list-style: none;
}
a {
  color: #fff;
  text-decoration: none;
}
</style>
<script>
export default {
  data() {
    return {
      isAuthed: false
    }
  },
  methods: {
    async isAuthenticated() {
      const res = await fetch('/api/auth/is-authenticated')
      const json = await res.json()

      return json.ok
    }
  },
  async mounted() {
    this.isAuthed = await this.isAuthenticated()
  }
}
</script>
