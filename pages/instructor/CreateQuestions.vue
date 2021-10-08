<template>
  <div class="w-full">
    <div class="px-6 py-2 border border-gray-400 rounded-lg shadow bg-white">
      <h1 class="text-4xl text-gray-700 font-semibold">Crea tú pregunta</h1>
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
          <div class="w-full">
            <!-- APARECE EDITOR CUANDO NO HAY PREGUNTA GUARDADA -->
            <div v-if="!question.editing" class="w-full">
              <the-editor v-model="questionContent" />

              <div class="container mt-6 px-0">
                <label
                  class="
                    w-64
                    flex flex-col
                    items-center
                    px-4
                    py-6
                    bg-secondary
                    rounded-md
                    shadow-md
                    tracking-wide
                    uppercase
                    border border-blue
                    cursor-pointer
                    hover:bg-white hover:text-secondary
                    text-white
                    ease-linear
                    transition-all
                    duration-150
                  "
                  >Sube tu imagen
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="onChange"
                  />
                </label>
                <div
                  v-if="question.question.image.imageUrl"
                  class="
                    w-64
                    flex
                    justify-center
                    items-center
                    border border-gray-300
                    p-2
                    rounded-sm
                  "
                >
                  <img :src="question.question.image.imageUrl" />
                </div>
              </div>
              <div class="w-full lg:w-1/3 mt-2">
                <c-button
                  name="Guardar pregunta"
                  class="bg-primary"
                  @click="saveQuestion"
                />
              </div>
            </div>
            <div v-else class="w-full border border-gray-300 rounded p-3">
              <div v-html="question.question.text" />
              <div
                v-if="question.question.image.imageUrl"
                class="
                  w-64
                  flex
                  justify-center
                  items-center
                  border border-gray-300
                  p-2
                  rounded-sm
                "
              >
                <img :src="question.question.image.imageUrl" />
              </div>
              <div class="w-full lg:w-1/2 mt-2">
                <c-button
                  name="Editar"
                  class="bg-white text-secondary border border-secondary"
                  @click="editQuestion"
                />
              </div>
            </div>
            <!-- SECCION PARA AGREGAR RESPUESTAS -->
            <div class="w-full h-px bg-gray-200 mt-6" />
            <p class="text-xl text-gray-700 font-medium mt-6">
              Agrega las opciones de respuesta
            </p>
            <p class="text-xs text-pink-600 font-light">
              Agrega al menos dos respuestas y una categoría
            </p>
            <!-- AGREGAR RESPUESTA -->
            <div class="w-full my-4">
              <the-editor v-model="answerContent" />
              <div class="flex justify-between items-end mt-4">
                <label
                  class="
                    w-64
                    flex flex-col
                    items-center
                    px-4
                    py-6
                    bg-secondary
                    rounded-md
                    shadow-md
                    tracking-wide
                    uppercase
                    border border-blue
                    cursor-pointer
                    hover:bg-white hover:text-secondary
                    text-white
                    ease-linear
                    transition-all
                    duration-150
                  "
                  >Sube tu imagen
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="onChangeAnswer"
                  />
                </label>
                <div
                  v-if="answerImage.imageUrl"
                  class="
                    w-64
                    flex
                    justify-center
                    items-center
                    border border-gray-300
                    p-2
                    rounded-sm
                  "
                >
                  <img :src="answerImage.imageUrl" />
                </div>
              </div>
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
                    <div
                      v-if="typeof answer.text === 'string'"
                      v-html="answer.text"
                    />
                    <div
                      v-else
                      class="
                        w-64
                        flex
                        justify-center
                        items-center
                        border border-gray-300
                        p-2
                        rounded-sm
                      "
                    >
                      <img :src="answer.text.imageUrl" />
                    </div>
                  </div>
                  <!-- BOTON DE ELIMINAR RESPUESTA -->
                  <div
                    class="
                      w-full
                      flex flex-wrap
                      justify-evenly
                      items-center
                      mt-2
                    "
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
            <div
              class="w-full flex flex-wrap justify-between items-center mt-8"
            >
              <div class="w-full lg:w-1/2 px-1 text-white">
                <c-button
                  name="Guardar respuesta"
                  class="border border-gray-400 text-gray-400 bg-gray-50"
                  :disabled="!answerIsValid"
                  :class="{
                    ['border-secondary text-secondary']: answerIsValid,
                  }"
                  @click="saveAnswer"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- GUARDAMOS PREGUNTAS Y PUBLICAMOS -->
        <div
          class="
            w-full
            lg:w-4/12
            flex flex-col-reverse
            items-start
            border border-gray-200
            rounded
            p-2
          "
        >
          <div class="w-full flex flex-col justify-center items-center mt-4">
            <p class="text-gray-600 text-lg font-medium w-full text-center">
              Guardar y continuar
            </p>
            <div class="w-full px-1 mt-2">
              <c-button
                :disabled="!validQuestion"
                name="Guardar"
                class="bg-gray-300 text-lg text-white"
                :class="{ 'bg-secondary': validQuestion }"
                @click="sendToFirebase"
              />
            </div>
          </div>
          <!-- AGREGAR CATEGORIAS -->
          <div class="w-full">
            <p
              class="text-gray-600 text-lg font-medium mb-2 w-full text-center"
            >
              Escoge un razonamiento
            </p>
            <div
              v-for="(category, i) in categories"
              :key="i"
              class="w-full lg:w-3/4 mb-2 mx-auto"
            >
              <c-button
                :name="category.name"
                class="text-xs border"
                :class="{
                  'bg-secondary text-white border border-white': category.state,
                  'text-secondary border-secondary': !category.state,
                }"
                @click="getCategory(i)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CButton from '~/components/global/CButton.vue'
import { mapActions } from 'vuex'
export default {
  components: { CButton },
  layout: 'app',
  data: () => ({
    questionContent: '',
    questionImage: '',
    answerContent: '',
    answerImage: {
      imageObject: null,
      imageUrl: null,
    },
    categories: [
      {
        name: 'verbal',
        category: 'verbal',
        state: false,
      },
      {
        name: 'numerico',
        category: 'numerico',
        state: false,
      },
      {
        name: 'lógico',
        category: 'logico',
        state: false,
      },
      {
        name: 'atención y concentración',
        category: 'atencion',
        state: false,
      },
    ],
    // OBJETO EN EL QUE SE GUARDAN LOS DATOS A SUBIR
    question: {
      editing: false,
      category: '',
      question: {
        edit: false,
        text: '',
        image: {
          imageUrl: '',
          imageObject: '',
        },
      },
      answerImage: {
        imageUrl: null,
        imageObject: null,
      },
      answers: [],
    },
  }),
  computed: {
    validQuestion() {
      return (
        this.question.question.text !== '' &&
        this.question.answers.length >= 2 &&
        this.correctAnswerVerified &&
        this.question.category !== ''
      )
    },
    answerIsValid() {
      return (
        (this.answerContent !== '' &&
          this.question.answerImage.imageUrl === null) ||
        (this.answerContent === '' && this.question.answerImage.imageUrl !== 0)
      )
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
    ...mapActions('fireQuestions', ['saveQuestionInformation']),
    // EMPEZAMOS A CREAR PREGUNTAS
    // INDICAMOS QUE ESTAMOS EDITANDO LA PREGUNTA
    editQuestion() {
      return (this.question.editing = false)
    },
    // EMPEZAMOS A ARMAR NUESTRO OBJETO PARA EL PAYLOAD DE VUEX EN FIREQUESTIONS
    saveQuestion() {
      this.question.question.text = this.questionContent
      return (this.question.editing = true)
    },
    // GUARDAMOS LAS RESPUESTA QUE SE VAN CREANDO
    saveAnswer() {
      if (this.answerContent !== '') {
        this.question.answers.push({ text: this.answerContent, state: false })
        this.answerContent = ''
      } else{
        this.getImages(this.question.answerImage.imageObject)
      }
    },
    // TOMAMOS LAS IMAGENES DEL ARRAY CORRESPONDIENTE
    getImages(imageFile) {
      const imageObject = imageFile
      const imageUrl = URL.createObjectURL(
        imageFile
      )
      const newImage = {
        imageObject: imageObject,
        imageUrl: imageUrl,
      }
      this.question.answers.push({
        text: newImage,
        state: false,
      })
    },
    // SELECCIONAMOS LA RESPUESTA CORRECTA
    rightAnswer(index) {
      for (let i = 0; i < this.question.answers.length; i++) {
        this.question.answers[i].state = false
      }
      this.question.answers[index].state = true
    },
    // TOMAMOS IMAGEN DE PREGUNTA
    onChange(event) {
      const file = event.target.files[0]
      this.question.question.image.imageObject = file
      this.question.question.image.imageUrl = URL.createObjectURL(file)
    },
    // TOMAMOS LA IMAGEN DE LA RESPUESTA
    onChangeAnswer(event) {
      const file = event.target.files[0]
      const imageObject = file
      this.answerImage.imageUrl = URL.createObjectURL(file)
      return (this.question.answerImage.imageObject = imageObject)
    },
    // ELIMINAMOS LA RESPUESTA DE LA LISTA EXISTENTE
    deleteAnswer(index) {
      this.question.answers.splice(index, 1)
    },
    // ESCOGEMOS CATEGORIA
    getCategory(index) {
      for (let i = 0; i < this.categories.length; i++) {
        this.question.category = ''
        this.categories[i].state = false
      }
      this.categories[index].state = true
      this.question.category = this.categories[index].category
    },
    // ENVIAMOS LA INFORMACION GUARDADA EN FIREQUESTIONS DE VUEX
    sendToFirebase() {
      const question = {
        text: this.question.question.text,
        image: this.question.question.image.imageObject,
        answers: this.question.answers,
        category: this.question.category,
      }
      this.saveQuestionInformation(question)
      this.questionContent = ''
      this.answerContent = ''
      this.question.question.text = ''
      this.question.question.image.imageObject = ''
      this.question.question.image.imageUrl = ''
      this.question.answers = []
      this.question.category = ''
      this.question.editing = false
      for (let i = 0; i < this.categories.length; i++) {
        this.categories[i].state = false
      }
    },
  },
}
</script>
