<template>
  <div class="px-6 py-2 border border-gray-400 rounded-lg shadow">
    <h1 class="text-4xl text-gray-700 font-semibold">Crea preguntas</h1>
    <!-- SECCION DE CREACION DE PREGUNTAS -->
    <div
      class="flex flex-wrap justify-between items-start mt-4 max-w-screen-lg"
    >
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
        <div v-if="question.editing" class="w-full">
          <!-- APARECE EDITOR CUANDO NO HAY PREGUNTA GUARDADA -->
          <div v-if="!question.question.edit" class="w-full">
            <the-editor v-model="questionContent" />
            <div class="w-full lg:w-1/2 mt-2">
              <c-button
                name="Guardar pregunta"
                class="bg-primary"
                @click="saveQuestion"
              />
            </div>
          </div>
          <div v-else class="w-full border border-gray-300 rounded p-3">
            <div v-html="question.question.text" />
            <div class="w-full lg:w-1/2 mt-2">
              <c-button
                name="Editar"
                class="bg-white text-secondary border border-secondary"
                @click="editQuestion"
              />
            </div>
          </div>
          <div class="w-full h-px bg-gray-200 mt-6" />
          <p class="text-xl text-gray-700 font-medium mt-6">
            Agrega las opciones de respuesta
          </p>
          <p class="text-sm text-pink-600 font-light">
            Agrega al menos dos respuestas
          </p>
          <!-- AGREGAR RESPUESTA -->
          <div class="w-full my-4">
            <the-editor v-if="question.editing" v-model="answerContent" />
          </div>
          <!-- LISTA DE RESPUESTAS -->
          <div v-if="question.answers.length" class="w-full mt-8">
            <div
              class="w-full flex flex-col justify-center items-center rounded"
            >
              <div
                v-for="(answer, i) in question.answers"
                :key="i"
                class="
                  w-full
                  flex flex-col
                  border border-gray-300
                  p-2
                  justify-between
                  items-center
                  mb-3
                "
                :class="{ 'border-secondary': answer.state }"
              >
                <!-- RESPUESTA -->
                <div class="w-full flex">
                  <p class="text-gray-700 text-base font-semibold mr-2">
                    {{ i + 1 }})
                  </p>
                  <div v-html="answer.text" />
                </div>
                <!-- BOTON DE ELIMINAR RESPUESTA -->
                <div
                  class="w-full flex flex-wrap justify-evenly items-center mt-2"
                >
                  <div class="w-full lg:w-5/12">
                    <c-button
                      name="Marcar Correcta"
                      class="text-base text-white bg-yellow-600"
                      @click="rightAnswer(i)"
                    />
                  </div>
                  <div class="w-full lg:w-5/12 mt-2 lg:mt-0">
                    <c-button
                      name="Eliminar Respuesta"
                      class="text-base text-white bg-pink-600"
                      @click="deleteAnswer(i)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- BOTON PARA AGREGAR RESPUESTA -->
          <div class="w-full flex flex-wrap justify-between items-center mt-8">
            <div
              v-show="question.editing"
              class="w-full lg:w-1/2 px-1 text-white"
            >
              <c-button
                name="Guardar pregunta"
                class="border border-gray-400 text-gray-400 bg-gray-50"
                :disabled="!answerIsValid"
                :class="{ ['border-secondary text-secondary']: answerIsValid }"
                @click="saveAnswer"
              />
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
        v-if="question.editing"
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
          <c-button
            :disabled="validQuestion"
            name="Guardar"
            class="bg-gray-300 text-lg text-white"
            :class="{ 'bg-secondary': validQuestion }"
          />
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
      editing: false,
      question: {
        edit: false,
        text: '',
        imageUrl: '',
      },
      answers: [],
    },
  }),
  computed: {
    validQuestion() {
      return (
        this.question.question.text !== '' &&
        this.question.answers.length >= 2 &&
        this.correctAnswerVerified
      )
    },
    answerIsValid() {
      return this.answerContent !== ''
    },
    correctAnswerVerified() {
      for (let i = 0; i < this.question.answers.length; i++) {
        if (this.question.answers[i].state) {
          return true
        }
      }
      return false
    },
  },
  methods: {
    createQuestion() {
      return (this.question.editing = true)
    },
    editQuestion() {
      return (this.question.question.edit = false)
    },
    saveQuestion() {
      this.question.question.text = this.questionContent
      return (this.question.question.edit = true)
    },
    saveAnswer() {
      this.question.answers.push({ text: this.answerContent, state: false })
      this.answerContent = ''
    },
    rightAnswer(index) {
      for (let i = 0; i < this.question.answers.length; i++) {
        this.question.answers[i].state = false
      }
      this.question.answers[index].state = true
    },
    deleteAnswer(index) {
      this.question.answers.splice(index, 1)
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
