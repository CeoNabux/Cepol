<template>
  <div class="w-full p-2">
    <div class="flex justify-center items-center">
      <figure class="rounded-lg w-1/2 flex justify-center items-center">
        <img
          :src="image"
          alt="post-image"
        />
      </figure>
      <div class="w-1/2 py-2 px-4 gradiente rounded-lg">
        <p class="text-xl font-medium text-gray-800">{{ title }}</p>
        <p class="text-grayy-800 text-base">
          {{ abstract }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    abstract: {
      type: String,
      required: true
    },
  }
}
</script>

<style scoped>
.gradiente {
  background: linear-gradient(
    94.68deg,
    rgba(255, 255, 255, 0.42) -0.65%,
    rgba(255, 255, 255, 0) 100%
  );
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.09));
  border-radius: 8px;
}
</style>
