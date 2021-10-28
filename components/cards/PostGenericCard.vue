<template>
  <div>
    <div
      class="
        h-40
        border border-secondary
        flex flex-col
        justify-center
        items-center
        shadow-lg
        rounded-lg
        bg-image
      "
      :style="{ backgroundImage: 'url(' + image + ')' }"
    >
      <div class="w-full px-2 py-1">
        <div class="w-full gradiente rounded-lg px-1">
          <p class="text-gray-700 font-semibold text-lg mb-3">
            {{ title }}
          </p>
        </div>
        <div class="w-32 mx-auto">
          <c-button
            name="Leer más"
            class="bg-yellow-700"
            @click="redirectionToPost(id)"
          />
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
.bg-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
