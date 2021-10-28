<template>
  <div class="bg-gradient-to-tr from-white to-secondary">
    <div class="w-full max-w-screen-2xl mx-auto">
      <!-- CONTENEDOR PRINCIPAL -->
      <div v-if="getPublishedPosts.length" class="w-full p-2">
        <!-- CONTENEDOR DE ULTIMO POST -->
        <div
          class="px-2 w-full md:w-1/2 flex justify-center items-center mx-auto"
        >
          <!-- LAST POST COMPONENT -->
          <last-post-preview
            :title="getPublishedPosts[0].title"
            :image="getPublishedPosts[0].image"
            :id="getPublishedPosts[0].id"
          />
        </div>
        <div class="w-full mt-4 px-2 flex flex-wrap justify-center items-center">
          <div
            v-for="(post, i) in getPublishedPosts"
            :key="i"
            class="w-full md:w-1/2 lg:w-1/3 px-2 py-3 flex justify-center items-center"
          >
            <!-- COMPONENTE DE POST NORMAL -->
            <post-generic-card
              :title="post.title"
              :image="post.image"
              :id="post.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LastPostPreview from '~/components/cards/LastPostPreview.vue'
import PostGenericCard from '~/components/cards/PostGenericCard.vue'
export default {
  components: { LastPostPreview, PostGenericCard },
  computed: {
    ...mapGetters('fireBlogs', ['getPublishedPosts']),
  },
  created() {
    this.renderPosts()
  },
  methods: {
    ...mapActions('fireBlogs', ['fetchPublishedPost']),
    renderPosts() {
      if (!this.getPublishedPosts.length) {
        this.fetchPublishedPost()
      }
    },
  },
}
</script>
