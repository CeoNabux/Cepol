<template>
  <div>
    <div class="border border-secondary flex justify-center items-center shadow-lg rounded-lg bg-white">
      <div class="w-full md:w-60 flex justify-center items-center">
        <img :src="image" alt="last-post-image" class="image-mask" />
      </div>
      <div class="w-full md:w-2/3 pr-2">
        <p class="text-gray-700 font-semibold text-lg lg:text-xl mb-3 lg:mb-6">
          {{ title }}
        </p>
        <div class="w-32">
          <c-button name="Leer más" class="bg-yellow-700" @click="redirectionToPost(id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    redirectionToPost(id) {
      this.$router.push(`blog/${id}`)
    },
  },
}
</script>

<style scoped>
.mask-image {
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
}
</style>
