<template>
  <div v-if="isEmpty(linkData)" class="spinner">
    <breeding-rhombus-spinner
      :animation-duration="2000"
      :size="125"
      color="#101010"
    />
  </div>
  <div v-else class="display">
    <div v-for="(block, index) in linkData.blocks" :key="index">
      <span v-if="block.type == 'header'">
        <h1 v-if="block.data.level == 1" class="font-size: 3.5rem">
          {{ block.data.text }}
        </h1>
        <h2 v-else-if="block.data.level == 2" class="font-size: 3rem">
          {{ block.data.text }}
        </h2>
        <h3 v-else-if="block.data.level == 3" class="font-size: 2.5rem">
          {{ block.data.text }}
        </h3>
        <h4 v-else-if="block.data.level == 4" class="font-size: 2rem">
          {{ block.data.text }}
        </h4>
        <h5 v-else-if="block.data.level == 5" class="font-size: 1.5rem">
          {{ block.data.text }}
        </h5>
        <h6 v-else-if="block.data.level == 6" class="font-size: 1rem">
          {{ block.data.text }}
        </h6>
      </span>
      <p
        v-else-if="block.type == 'paragraph'"
        v-html="block.data.text"
        class="font-size: 1.25rem"
      ></p>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { BreedingRhombusSpinner } from 'epic-spinners'

export default {
  components: {
    BreedingRhombusSpinner
  },
  data() {
    return {
      link: this.$route.params.link,
      linkData: {}
    }
  },
  async mounted() {
    await this.getLink()
  },
  methods: {
    isEmpty(obj) {
      return JSON.stringify(obj) === '{}'
    },
    async getLink() {
      const res = await fetch(`/api/get-link?link=${this.link}`)
      const json = await res.json()
      this.linkData = json

      if (json.ok) {
        this.linkData = json.content
      } else {
        Swal.fire({
          toast: true,
          showConfirmButton: false,
          position: 'bottom-end',
          timer: 6000,
          title:
            json.message || (json.ok ? 'Success' : 'An error has occurred.'),
          icon: json.ok ? 'success' : 'error'
        })
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      }
    }
  }
}
</script>

<style scoped>
.display {
  padding: 1rem;
}
h1 {
  font-size: 3.5rem;
}
h2 {
  font-size: 3rem;
}
h3 {
  font-size: 2.5rem;
}
h4 {
  font-size: 2rem;
}
h5 {
  font-size: 1.5rem;
}
h6 {
  font-size: 1rem;
}
</style>
