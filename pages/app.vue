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
      <title-text :text="creating ? 'Create a link' : 'Edit your link'" />
      <p>{{ message }}</p>
      <label v-if="creating" for="link">
        Link address (ex. yourname):
      </label>
      <input v-if="creating" id="link" v-model="link" type="text" name="link" />
      <editor :value="creating ? null : userLink" @saved="manageLink" />
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
      userLink: '',
      link: '',
      message: '',
      creating: true
    }
  },
  async mounted() {
    this.userLink = await this.getUserLink()
    this.creating = this.isEmpty(this.userLink)
    if (this?.userLink?.link) {
      this.link = this?.userLink?.link
    }
    this.isAuthenticated()
  },
  methods: {
    async isAuthenticated() {
      const res = await fetch('/api/auth/is-authenticated')
      const json = await res.json()

      if (!json.ok) {
        this.$router.push('/start')
      }
    },
    async manageLink(data) {
      const method = this.creating ? 'POST' : 'PUT'
      const body = {
        link: this.link,
        ...data
      }
      const res = await fetch(`/api/manage-link`, {
        method,
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

      this.message = `You can view your link at https://linktoo.now.sh/u/${this.link}`
      return json
    },
    async getUserLink() {
      const res = await fetch('/api/get-user-link')
      const json = await res.json()

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
