<template>
  <div class="w-full">
    <div
      class="
        px-4
        py-4
        border border-gray-400
        rounded-lg
        shadow
        w-full
        lg:w-8/12
        bg-white
      "
    >
      <div
        class="
          w-full
          bg-gradient-to-br
          from-secondary
          to-primary
          shadow-lg
          flex
          justify-start
          items-center
          h-44
          sm:h-60
          rounded
          py-4
          px-2
        "
      >
        <h1 class="text-4xl text-gray-700 font-semibold mb-4">
          Ingresa instructores
        </h1>
        <div
          class="w-full h-full bg-image"
          :style="{ backgroundImage: 'url(' + bgImage + ')' }"
        ></div>
      </div>
    </div>
    <div
      class="
        mt-6
        w-full
        lg:w-8/12
        rounded-lg
        border border-gray-400
        bg-white
        px-4
        py-6
      "
    >
    Aqui vamos a poner a los intructores</div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  data: () => ({
    bgImage: require('@/static/images/svg/newLesson.svg'),
  }),
}
</script>

<style scoped>
.bg-image {
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
}
@media only screen and (max-width: 640px) {
  .bg-image {
    background-size: cover;
    background-position-x: 50rem;
  }
}
</style>
