<template>
  <main>
    <section v-if="userLink === ''" class="center">
      <div class="loader">
        <breeding-rhombus-spinner
          :animation-duration="2000"
          :size="125"
          color="#101010"
        />
      </div>
    </section>
    <section v-else>
      <title-text
        :text="isEmpty(userLink) ? 'Create a link' : 'Edit your link'"
      />
      <label for="link">Link address (ex. yourname): </label>
      <input type="text" id="link" name="link" v-model="link" />
      <editor
        @saved="newNewLink"
        :value="isEmpty(userLink) ? null : userLink"
      />
    </section>
  </main>
</template>

<script>
import Swal from 'sweetalert2'
import { BreedingRhombusSpinner } from 'epic-spinners'
import Editor from '~/components/Editor.vue'
import TitleText from '~/components/TitleText.vue'
// import ButtonDark from '~/components/ButtonDark.vue'

// import Spacer from '~/components/Spacer.vue'

export default {
  components: {
    TitleText,
    // ButtonDark,
    // Spacer,
    BreedingRhombusSpinner,
    Editor
  },
  data() {
    return {
      name: '',
      bio: '',
      link: '',
      userLink: ''
    }
  },
  async mounted() {
    this.userLink = await this.getUserLink()
    this.isAuthenticated()
  },
  methods: {
    async isAuthenticated() {
      const res = await fetch('/api/auth/is-authenticated')
      const json = await res.json()

      console.log(json.ok)
      if (!json.ok) {
        this.$router.push('/start')
      }
    },
    async newNewLink(data) {
      console.log(JSON.stringify(data))
      const body = {
        link: this.link,
        ...data
      }
      const res = await fetch('/api/new-link', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      Swal.fire({
        toast: true,
        showConfirmButton: false,
        position: 'bottom-end',
        timer: 6000,
        title: json.message || (json.ok ? 'Success' : 'An error has occurred.'),
        icon: json.ok ? 'success' : 'error'
      })
      return json
    },
    async newLink(e) {
      e.preventDefault()
      const body = {
        name: this.name,
        bio: this.bio,
        link: this.link
      }
      const res = await fetch('/api/new-link', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      Swal.fire({
        toast: true,
        showConfirmButton: false,
        position: 'bottom-end',
        timer: 6000,
        title: json.message || (json.ok ? 'Success' : 'An error has occurred.'),
        icon: json.ok ? 'success' : 'error'
      })
      return json
    },
    async getUserLink() {
      const res = await fetch('/api/get-user-link')
      const json = await res.json()

      console.log(JSON.stringify(json))
      return json
    },
    isEmpty(obj) {
      return JSON.stringify(obj) === '{}'
    }
  }
}
</script>

<style scoped>
main {
  padding: 1rem;
}
.center {
  display: grid;
}
.loader {
  margin: 3rem auto;
}
</style>
