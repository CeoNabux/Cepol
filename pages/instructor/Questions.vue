<template>
  <div class="w-full">
    <div
      class="
        px-4
        py-4
        border border-gray-400
        rounded-lg
        shadow
        lg:w-3/4
        bg-white
      "
    >
      <h1 class="text-4xl text-gray-700 font-semibold mb-4">Crea preguntas</h1>
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
    <div
      class="
        mt-6
        w-full
        lg:w-3/4
        rounded-lg
        border border-gray-400
        bg-white
        px-4
        py-6
      "
    >
      <!-- RENDERIZADO DE PREGUNTAS -->
      <div
        class="
          w-full
          flex flex-wrap
          justify-between
          items-end
          shadow-xl
          rounded
          p-2
        "
      >
        <div class="w-full lg:w-1/2">
          <p class="text-sm font-semibold text-gray-800">Matematica</p>
          <p class="text-base text-gray-800 mt-2">Pregunta en cuestion</p>
        </div>
        <div class="w-full lg:w-1/4 mt-4 lg:mt-0 flex flex-wrap">
          <div class="w-full">
            <c-button name="Eliminar pregunta" class="bg-pink-700 text-white" />
          </div>
        </div>
        <div class="w-full">
          <c-button
            name="Pruebas de traida"
            class="bg-pink-700 text-white"
            @click="getDoc"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'app',
  data: () => ({
    bgImage: require('@/static/images/svg/newLesson.svg'),
  }),
  created() {
    this.fetchQuestions()
  },
  computed: {
    ...mapGetters('fireQuestions', ['getQuestions']),
  },
  methods: {
    ...mapActions('fireQuestions', ['fetchQuestions']),
    redirectionToCreateQuestion() {
      this.$router.push('/instructor/createquestions')
    },
    getDoc(category) {
      console.log('Estoy listo para ser usado')
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
