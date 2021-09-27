<template>
  <div class="px-6 py-2 border border-gray-400 rounded-lg shadow">
    <h1 class="text-4xl text-gray-700 font-semibold">Crea preguntas</h1>
    <!-- SECCION DE CREACION DE PREGUNTAS -->
    <div class="flex flex-wrap justify-between items-start mt-4 max-w-screen-lg">
      <!-- INSERTAMOS PREGUNTAS -->
      <div
        class="
          w-full
          lg:w-7/12
          py-2
          mb-4
          flex flex-col
          justify-center
          items-center
        "
      >
        <!-- CREANDO PREGUNTAS -->
        <div v-if="question.questionEditing" class="w-full">
          <!-- APARECE EDITOR CUANDO NO HAY PREGUNTA GUARDADA -->
          <div v-if="!question.question.text" class="w-full">
            <the-editor v-model="questionContent" />
            <div class="w-full lg:w-1/2 mt-2">
              <c-button
                name="Guardar pregunta"
                class="bg-primary"
                @click="saveQuestion"
              />
            </div>
          </div>
          <div
            v-else
            v-html="question.question.text"
            class="w-full border border-gray-300 rounded p-3"
          />
          <div class="w-full h-px bg-gray-200 mt-6" />
          <p class="text-xl text-gray-700 font-medium mt-6">
            Agrega las respuestas a tu pregunta
          </p>
          <p class="text-sm text-pink-600 font-light">
            Agrega al menos dos respuestas
          </p>
          <!-- AGREGAR RESPUESTA -->
          <div class="w-full my-4">
            <the-editor v-if="question.answerEditing" v-model="answerContent" />
          </div>
          <!-- LISTA DE RESPUESTAS -->
          <div v-if="question.answers.length" class="w-full mt-8">
            <div
              class="
                w-full
                flex flex-col
                justify-center
                items-center
                border border-gray-300
                rounded
                p-2
              "
            >
              <div
                v-for="(answer, i) in question.answers"
                :key="i"
                class="w-full flex flex-col justify-between items-center mb-3"
              >
                <!-- RESPUESTA -->
                <div class="w-full">
                  <p class="text-gray-700 text-base font-semibold">
                    {{ i + 1 }}) {{ answer.answer }}
                  </p>
                </div>
                <!-- BOTON DE ELIMINAR RESPUESTA -->
                <div
                  class="w-full flex flex-wrap justify-center items-center mt-2"
                >
                  <div class="w-full bg-pink-600">
                    <c-button
                      name="Eliminar Respuesta"
                      class="text-base text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- BOTON PARA AGREGAR RESPUESTA -->
          <div class="w-full flex flex-wrap justify-between items-center mt-8">
            <div v-show="question.answerEditing" class="w-full lg:w-1/2 px-1 text-white">
              <c-button name="Guardar pregunta" class="border border-secondary text-secondary bg-gray-50" @click="createAnswer" />
            </div>
            <div class="w-full lg:w-1/2 px-1 text-white">
              <c-button name="Nueva respuesta" class="bg-primary" @click="createAnswer" />
            </div>
          </div>
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
                  @click="createQuestion"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- GUARDAMOS PREGUNTAS Y PUBLICAMOS -->
      <div
        v-if="question.questionEditing"
        class="
          w-full
          lg:w-3/12
          flex flex-col
          items-start
          border border-gray-200
          rounded
          p-2
        "
      >
        <p class="text-gray-600 text-lg font-medium w-full text-center">
          Guardar y continuar
        </p>
        <div class="w-full px-1 mt-2">
          <c-button name="Guardar" class="bg-secondary text-lg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CButton from '~/components/global/CButton.vue'
export default {
  components: { CButton },
  layout: 'app',
  data: () => ({
    bgImage: require('@/static/images/svg/newLesson.svg'),
    questionContent: '',
    questionImage: '',
    answerContent: '',
    question: {
      questionEditing: false,
      answerEditing: false,
      question: {
        text: '',
        imageUrl: '',
      },
      answers: [],
    },
  }),
  methods: {
    createQuestion() {
      return (this.question.questionEditing = true)
    },
    createAnswer() {
      return (this.question.answerEditing = true)
    },
    saveQuestion() {
      this.question.question.text = this.questionContent
      console.log(this.questionImage)
    },
    saveContent() {
      alert(this.content)
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
