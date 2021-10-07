<template>
  <div class="w-full px-2 py-3">
    <p
      v-if="!Object.keys(questionData).length"
      class="text-center text-gray-500 text-3xl"
    >
      Escoge una pregunta del panel
    </p>
    <div v-else class="w-full">
      <!-- RECIBIMOS LA PREGUNTA -->
      <div class="flex justify-between items-start w-full">
        <div
          v-html="questionData.question"
          class="text-gray-800 font-medium text-lg w-full lg:w-3/4"
        />
        <!-- IMAGEN DE LA PREGUNTA -->
        <!-- <figure class="w-full flex justify-center items-center">
        <img src="questionData.image" alt="" class="w-full">
      </figure> -->
      </div>
      <!-- RECIBIMOS OPCIONES DE RESPUESTA -->
      <div class="w-full py-3 mt-4">
        <div
          v-for="(option, i) in questionData.options"
          :key="i"
          class="
            mb-2
            px-3
            py-4
            border border-gray-200
            shadow-md
            rounded-lg
            flex flex-wrap
          "
        >
          <div
            v-html="option.text"
            class="text-gray-800 font-medium text-base w-full lg:w-3/4"
          />
          <!-- <figure class="w-full fles justify-center items-start">
          <img
            :src="option.image"
            alt="cepol-opcion"
            class="w-full"
          />
        </figure> -->
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
    states: [],
  }),
  computed: {
    ...mapGetters('fireSimulator', [
      'getCurrentSimulator',
      'getSimulatorAnswers',
    ]),
  },
  methods: {
    ...mapActions('fireSimulator', ['setAnswer']),
    getAnswer(index) {
      const question = this.questionData.question
      const options = []
      this.questionData.options.forEach((option) => {
        options.push({
          option: option.text,
          state: false,
        })
      })
      options[index].state = true
      const answer = {
        question: question,
        options: options,
      }
      if (!this.states.length) {
        for (let i = 0; i < this.questionData.options.length; i++) {
          this.states.push(false)
        }
      }
      this.mark(index)
      this.setAnswer(answer)
    },
    mark(index) {
      for (let i = 0; i < this.questionData.options.length; i++) {
        this.states[i] = false
      }
      return this.states[index] = true
    },
  },
}
</script>
