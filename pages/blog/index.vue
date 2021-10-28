<template>
  <div class="bg-gradient-to-tr from-white to-secondary">
    <div class="w-full max-w-screen-2xl mx-auto">
      <!-- CONTENEDOR PRINCIPAL -->
      <div v-if="getPublishedPosts.length" class="w-full p-2">
        <!-- CONTENEDOR DE ULTIMO POST -->
        <div class="px-2 w-full md:w-1/2 flex justify-center items-center mx-auto">
          <!-- ULTIMO POST -->
          <last-post-preview
            :title="getPublishedPosts[0].title"
            :image="getPublishedPosts[0].image"
            :id="getPublishedPosts[0].id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LastPostPreview from '~/components/cards/LastPostPreview.vue'
export default {
  components: { LastPostPreview },
  computed: {
    ...mapGetters('fireBlogs', ['getPublishedPosts']),
  },
  created() {
    this.renderPosts()
  },
  methods: {
    ...mapActions('fireBlogs', ['fetchPublishedPost']),
    renderPosts() {
      if(!this.getPublishedPosts.length) {
        this.fetchPublishedPost()
      }
    }
  }
}
</script>
