<template>
  <div class="shadow-md gradiente w-full py-2 px-3 rounded-lg">
    <div class="flex justify-between items-center">
      <div class="w-3/5">
        <p class="text-lg text-gray-800 font-medium">
          {{ name }}
        </p>
        <p class="text-gray-800 font-light text-sm">
          {{ testimony }}
        </p>
      </div>
      <div class="w-2/5">
        <figure
          class="rounded-full p-1 bg-white flex justify-center itesm-center"
        >
          <img :src="image" alt="cepol-testimony" />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    testimony: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
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
