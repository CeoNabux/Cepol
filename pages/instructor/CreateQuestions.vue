<template>
  <div class="px-6 py-2">
    <h1 class="text-4xl text-gray-700 font-semibold">Crea preguntas</h1>
    <!-- SECCION DE CREACION DE PREGUNTAS -->
    <div class="flex flex-wrap justify-between items-center mt-4">
      <!-- INSERTAMOS PREGUNTAS -->
      <div
        class="
          w-full
          lg:w-8/12
          py-2
          mb-4
          flex flex-col
          justify-center
          items-center
        "
      >
        <!-- CREANDO PREGUNTAS -->
        <div v-if="questions.length" class="w-full">
          <the-editor v-model="content" />
        </div>
        <!-- EN CASO DE QUE NO TENGA PREGUNTAS CREADAS -->
        <div
          v-else
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
            <div
              class="w-full h-full flex flex-col justify-between items-start"
            >
              <h2 class="text-white font-semibold text-2xl w-full sm:w-1/2">
                Aún no tienes preguntas, empieza ahora
              </h2>
              <div class="w-full sm:w-1/2 lg:w-33 mt-4">
                <c-button
                  name="Crear preguntas"
                  class="bg-primary mb-1"
                  @click="createLesson"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- GUARDAMOS PREGUNTAS Y PUBLICAMOS -->
      <div class="w-full lg:w-3/12">
        Aqui vamos a colocar la seccion de guardado
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  data: () => ({
    bgImage: require('@/static/images/svg/newLesson.svg'),
    questions: [{message: 'hola'}],
    content: ''
  }),
  methods: {
    createLesson() {
      console.log('Estoy vivo')
    },
    saveContent() {
      alert(this.content)
    }
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
