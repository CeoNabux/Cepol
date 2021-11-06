<template>
  <div class="w-full">
    <div
      v-if="getLoading"
      class="
        absolute
        w-1/3
        h-44
        top-1/3
        left-1/3
        border border-gray-300
        bg-white
        flex
        justify-center
        items-center
        shadow-md
        rounded-md
      "
    >
      <loading :loading="getLoading" />
    </div>
    <div class="flex justify-between flex-wrap items-start w-full">
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
        <h1 class="text-4xl text-gray-700 font-semibold mb-4">
          Crea preguntas
        </h1>
        <!-- INICIO PARA IR A CREAR -->
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
            <div
              class="w-full h-full flex flex-col justify-between items-start"
            >
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
      <!-- FILTRO DE PREGUNTAS POR CATEGORIA -->
      <div
        class="w-full bg-white lg:w-3/12 rounded-lg shadow-lg mt-4 lg:mt-0 p-4"
      >
        <p class="text-gray-800 font-medium w-full text-center">
          Filtra por dominio
        </p>
        <div
          v-for="(category, i) in categories"
          :key="i"
          class="w-full lg:w-3/4 mb-2 mx-auto"
        >
          <c-button
            :name="category.category"
            class="text-sm border"
            :class="{
              'bg-secondary text-white border border-white': category.state,
              'text-secondary border-secondary': !category.state,
            }"
            @click="getCategory(i)"
          />
        </div>
      </div>
    </div>
    <!-- SECCION DE FILTRADO DE PEGUNTAS -->
    <div
      class="
        mt-6
        h-96
        w-full
        lg:w-8/12
        overflow-y-auto
        rounded-lg
        border border-gray-400
        bg-white
        px-4
        py-6
      "
    >
      <!-- RENDERIZADO DE PREGUNTAS -->
      <div
        v-for="(question, i) in getQuestions"
        :key="i"
        class="
          w-full
          flex flex-wrap
          justify-between
          items-end
          shadow-2xl
          rounded
          px-2
          py-3
          mb-4
          border border-gray-200
        "
      >
        <div class="w-full lg:w-1/2">
          <p class="text-sm font-semibold text-gray-800">
            {{ question.question.category }}
          </p>
          <div
            v-html="question.question.question"
            class="text-base text-gray-800 mt-2"
          />
        </div>
        <div class="w-full lg:w-1/4 mt-4 lg:mt-0 flex flex-wrap">
          <div class="w-full">
            <c-button
              name="Eliminar pregunta"
              class="bg-pink-700 text-white"
              @click="removeQuestion(question.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- BOTONES PARA PEDIR NUEVAS PREGUNTAS -->
    <div
      class="
        w-full
        lg:w-8/12
        h-12
        mt-4
        mr-auto
        flex
        justify-center
        items-center
      "
    >
      <div
        class="
          w-40
          flex
          justify-center
          items-center
          bg-white
          mx-auto
          py-2
          rounded-lg
          shadow-lg
        "
      >
        <div class="flex justify-center items-center">
          <!-- BOTON DE LA IZQUIERDA -->
          <button
            class="
              border border-gray-300
              shadow-md
              rounded-full
              flex
              w-8
              h-8
              justify-center
              items-center
              mr-4
            "
          >
            <c-icon name="leftArrow" class="text-gray-400" />
          </button>
          <!-- BOTON DE LA DERECHA -->
          <button
            class="
              shadow-md
              rounded-full
              flex
              bg-secondary
              w-8
              h-8
              justify-center
              items-center
            "
            @click="fetchQuestions"
          >
            <c-icon name="rightArrow" class="text-white" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  getDocs,
  query,
  limit,
  startAfter,
  collection,
} from 'firebase/firestore'
import { fireDataBase } from '~/plugins/firebase/app'
export default {
  layout: 'app',
  data: () => ({
    bgImage: require('@/static/images/svg/newLesson.svg'),
    category: '',
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
    eof: false,
    lastDoc: null,
    batchSize: 10,
    questions: [],
  }),
  computed: {
    ...mapGetters('fireQuestions', ['getQuestions', 'getLoading']),
  },
  mounted() {
    this.fetchQuestions()
  },
  methods: {
    ...mapActions('fireQuestions', [
      'setQuestions',
      'fetchByCategory',
      'eraseQuestion',
      'fetchNextQuestions',
    ]),
    async fetchQuestions() {
      try {
        if (this.eof) {
          return
        }
        this.isLoading = true
        let questionQuery = query(
          collection(fireDataBase, 'questions'),
          limit(this.batchSize)
        )

        if (this.lastDoc) {
          questionQuery = query(
            collection(fireDataBase, 'questions'),
            startAfter(this.lastDoc),
            limit(this.batchSize)
          )
        }

        const questionSnapshot = await getDocs(questionQuery)
        this.lastDoc = questionSnapshot.docs[questionSnapshot.docs.length - 1]
        questionSnapshot.forEach((doc) => {
          this.questions.push({
            id: doc.id,
            question: doc.data(),
          })
        })
        this.isLoading = false
        this.setQuestions(this.questions)
      } catch (error) {
        console.error(error)
      }
    },
    redirectionToCreateQuestion() {
      this.$router.push('/instructor/createquestions')
    },
    getCategory(index) {
      for (let i = 0; i < this.categories.length; i++) {
        this.category = ''
        this.categories[i].state = false
      }
      this.categories[index].state = true
      this.category = this.categories[index].category
      this.getDoc(this.category)
    },
    getDoc(category) {
      this.fetchByCategory(category)
    },
    removeQuestion(id) {
      const questionData = this.getQuestions.filter(
        (question) => question.id === id
      )
      this.eraseQuestion(questionData[0])
    },
    getMoreQuestions() {
      this.fetchNextQuestions()
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
