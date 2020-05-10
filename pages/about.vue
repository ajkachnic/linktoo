<template>
  <main>
    <title-text text="About" />
    <body-text
      text="This project is part of the #1ProductAWeek challenge. I'm doing this challenge in an attempt to get better at launching projects and rapid development"
    />
    <spacer height="1rem" />
    <button-dark link="https://github.com/ajkachnic" text="My GitHub" />
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

<style>
main {
  padding: 2rem;
}
</style>
