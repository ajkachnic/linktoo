<template>
  <main class="container">
    <title-text text="LinkToo" />
    <body-text
      text="A simple way to connect all of your social medias and links."
    />
    <spacer height="1rem" />
    <body-text
      text="Easily put everything in one place, no more deep searching. One profile to end them all."
    />
    <spacer height="2rem" />
    <button-dark text="Try it" link="/start" />
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
  }
}
</script>

<style scoped>
main {
  padding: 1rem;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
