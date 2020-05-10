<template>
  <main class="container">
    <div class="subcontainer">
      <big-title-text text="LinkToo" />
      <body-text
        text="A simple way to connect all of your social medias and links."
      />
      <spacer height="1rem" />
      <body-text
        text="Easily put everything in one place, no more deep searching. One link to end them all."
      />
      <spacer height="1.5rem" />
      <button-yellow text="Try it" link="/start" />
    </div>
  </main>
</template>
<script>
import BigTitleText from '~/components/BigTitleText.vue'
import BodyText from '~/components/BodyText.vue'
import ButtonYellow from '~/components/ButtonYellow.vue'

import Spacer from '~/components/Spacer.vue'

export default {
  components: {
    BigTitleText,
    BodyText,
    ButtonYellow,
    Spacer
  }
}
</script>

<style scoped>
.subcontainer {
  padding: 1rem;
  z-index: 2;
  position: relative;
  text-align: center;
  background: var(--clr-dark);
}
.links {
  padding-top: 15px;
}
p {
  opacity: 0.75;
  color: var(--clr-light);
}
@media screen and (min-width: 800px) {
  .background {
    /* display: block; */
    border-radius: 3rem 0 0 3rem;
  }
  .subcontainer {
    padding: 4rem;
  }
}
@media screen and (min-width: 1200px) {
  .subcontainer {
    /* width: 50%; */
    padding: 6rem;
  }
}
</style>
