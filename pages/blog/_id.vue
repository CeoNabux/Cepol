<template>
  <div class="bg-gradient-to-tr from-white to-secondary">
    <div class="w-full max-w-screen-2xl mx-auto">
      <div v-if="post.length" class="w-full relative">
        <div
          class="w-full h-60 py-4 bg-image"
          :style="{ backgroundImage: 'url(' + post[0].image + ')' }"
        >
          <div class="w-full h-full md:w-1/2 flex justify-center items-center">
            <div class="px-2 py-1 gradiente rounded">
              <h1 class="text-primary text-3xl font-semibold tex-center">
                {{ post[0].title }}
              </h1>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center items-center">
          <div class="w-full absolute bottom-1 bg-white rounded mx-auto md:w-3/4 p-4">
            <div v-html="post[0].postData" class="w-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    postRoute: '',
    post: [],
  }),
  computed: {
    ...mapGetters('fireBlogs', ['getPublishedPosts']),
  },
  mounted() {
    this.postRoute = this.$route.params.id
    this.getPostDetail()
  },
  methods: {
    getPostDetail() {
      const post = this.getPublishedPosts.filter(
        (post) => post.id === this.postRoute
      )
      this.post = post
    },
  },
}
</script>

<style scoped>
.bg-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.gradiente {
  background: linear-gradient(
    94.68deg,
    rgba(255, 255, 255, 0.42) -0.65%,
    rgba(255, 255, 255, 0) 100%
  );
  filter: drop-shadow(0 px 4 px 12 px rgba(0, 0, 0, 0.09));
  border-radius: 8 px;
}
</style>
