<template>
  <main>
    <title-text text="Register / Login" />
    <body-text
      text="You can currently sign in with Twitter and GitHub. Google support is on it's way!"
    />
    <spacer height="1rem" />
    <div v-if="isAuthed">
      <button-dark text="Logout" link="api/auth/logout" />
    </div>
    <div v-else>
      <button-dark text="Sign in with GitHub" link="/api/auth/github" />
      <button-dark text="Sign in with Twitter" link="api/auth/twitter" />
    </div>
  </main>
</template>

<script>
import TitleText from '~/components/TitleText.vue'
import BodyText from '~/components/BodyText.vue'
import ButtonDark from '~/components/ButtonDark.vue'

import Spacer from '~/components/Spacer.vue'

export default {
  components: {
    TitleText,
    BodyText,
    ButtonDark,
    Spacer
  },
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

<style scoped>
main {
  padding: 1rem;
}
</style>
