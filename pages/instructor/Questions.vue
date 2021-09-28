<template>
  <div class="px-4 py-4 border border-gray-400 rounded-lg shadow lg:w-3/4">
    <!-- INICIO PARA IR A CREAR O ELIMINAR PREGUNTAS -->
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
      <div
        class="w-full h-full bg-image"
        :style="{ backgroundImage: 'url(' + bgImage + ')' }"
      >
        <div class="w-full h-full flex flex-col justify-between items-start">
          <h2 class="text-white font-semibold text-2xl w-full sm:w-1/2">
            Aún no estás creando preguntas. Comienza ahora
          </h2>
          <div class="w-full sm:w-1/2 lg:w-33 mt-4">
            <c-button
              name="Crear preguntas"
              class="bg-primary mb-1"
              @click="redirectionToCreateQuestion"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  data: () => ({
    bgImage: require('@/static/images/svg/newLesson.svg'),
  }),
  methods: {
    redirectionToCreateQuestion() {
      this.$router.push('/instructor/createquestions')
    },
  },
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
