<template>
  <div class="w-full px-2 py-3">
    <p
      v-if="!Object.keys(questionData).length"
      class="h-14 text-center text-gray-500 text-3xl py-3 px-2 bg-white border border-gray-200 rounded-lg"
    >
      Escoge una pregunta del panel
    </p>
    <div v-else class="w-full">
      <!-- RECIBIMOS LA PREGUNTA -->
      <div
        class="w-full rounded-lg border bg-white border-gray-200 shadow-md mb-4 px-2 py-3"
      >
        <div
          v-html="questionData.question"
          class="text-gray-800 font-medium text-xl w-full lg:w-3/4 underline"
        />
        <!-- IMAGEN DE LA PREGUNTA -->
        <figure class="w-full lg:w-1/2 flex justify-center items-center">
          <img :src="questionData.image" alt="" class="w-full" />
        </figure>
      </div>
      <!-- RECIBIMOS OPCIONES DE RESPUESTA -->
      <div class="w-full mt-4 bg-green-50 rounded-lg py-4 px-2">
        <p class="text-2xl font-medium text-secondary mb-4">
          Escoge tu respuesta
        </p>
        <div
          v-for="(option, i) in questionData.options"
          :key="i"
          class="
            mb-2
            px-3
            py-4
            border border-gray-200
            bg-white
            shadow-md
            rounded-lg
            flex flex-wrap
          "
        >
          <div
            v-if="option.text.substring(0, 6) !== 'https:'"
            v-html="option.text"
            class="text-gray-800 font-medium text-base w-full lg:w-3/4"
          />
          <figure v-else class="w-48 fles justify-center items-start">
            <img :src="option.text" alt="cepol-opcion" class="w-full" />
          </figure>
          <!-- BOTON DE ELIMINAR RESPUESTA -->
          <div class="w-full flex flex-wrap justify-evenly items-center mt-2">
            <div class="w-full lg:w-5/12">
              <c-button
                name="Marcar Correcta"
                class="text-base text-white bg-yellow-600"
                @click="getAnswer(i)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    questionData: {
      type: Object,
      required: null,
    },
  },
  data: () => ({
    answer: {},
    question: '',
    options: [],
  }),
  computed: {
    ...mapGetters('fireSimulator', [
      'getCurrentSimulator',
      'getSimulatorAnswers',
    ]),
  },
  methods: {
    ...mapActions('fireSimulator', ['setAnswer', 'markAnswer']),
    getAnswer(index) {
      const question = this.questionData.question
      const category = this.questionData.category
      const options = []
      this.questionData.options.forEach((option) => {
        options.push({
          text: option.text,
          state: false,
        })
      })
      options[index].state = true
      const answer = {
        question: question,
        options: options,
        category: category
      }
      this.setAnswer(answer)
      this.markAnswer(answer)
    },
  },
}
</script>
