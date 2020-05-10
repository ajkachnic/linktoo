<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>
<script>
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>
>
<style>
:root {
  --clr-pink: #f4486d;
  --clr-dark: #060120;
  --clr-light: #fff;
  --clr-alt: #f7f7f7;
  --clr-blue: #79cfcd;
  --clr-yellow: #ffd049;
}
@font-face {
  font-family: 'Sailec';
  src: url('/fonts/Sailec-Bold.ttf');
  font-weight: 700;
}
@font-face {
  font-family: 'Sailec';
  src: url('/fonts/Sailec.ttf');
  font-weight: 400;
}
@font-face {
  font-family: 'Sailec';
  src: url('/fonts/Sailec-Medium.ttf');
  font-weight: 500;
}

html {
  font-family: Sailec, 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: var(--clr-light);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
