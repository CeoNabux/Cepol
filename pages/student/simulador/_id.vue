<template>
  <div class="w-full py-4">
    <div class="flex flex-wrap justify-between items-start">
      <!-- LEFT -->
      <div class="w-full lg:w-8/12">
        <!-- CRONOMETRO -->
        <!-- <the-timer :time="simulator[0].time" /> -->
        <the-timer :time="15000" />
        <!-- VISUALIZACION DE PREGUNTAS -->
        <div
          v-if="isSimulating"
          class="w-full py-2 px-4 mt-4"
        >
          <nuxt-child :questionData="question" />
        </div>
      </div>
      <!-- RIGTH -->
      <!-- PANEL DE NAVAGACION DE PREGUNTAS -->
      <div
        v-if="isSimulating"
        class="
          w-full
          lg:w-1/4
          bg-white
          shadow-lg
          rounded-lg
          py-2
          px-4
          mt-4
          lg:mt-0
        "
      >
        <p class="text-xl text-primary font-semibold mb-2">
          Escoge una pregunta
        </p>
        <div
          v-for="(categoryQuestions, i) in getCurrentSimulator"
          :key="i"
          class="w-full mb-2"
        >
          <p class="text-gray-500 font-medium text-lg">
            {{ categoryQuestions.category }}
          </p>
          <div class="flex flex-wrap w-full justify-start items-center">
            <button
              v-for="(question, ii) in categoryQuestions.questions"
              :key="ii"
              class="
                w-5
                h-5
                mr-2
                text-xs
                rounded-full
                bg-secondary
                shadow
                text-white
                flex
                justify-center
                items-center
                focus:bg-primary
              "
              @click="getQuestion(i, ii)"
            >
              {{ ii + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheTimer from '~/components/TheTimer.vue'
export default {
  components: { TheTimer },
  layout: 'app',
  data: () => ({
    test: null,
    simulator: [{ time: 0 }],
    questionSelected: {}
  }),
  computed: {
    ...mapGetters('fireSimulator', [
      'getSimulatorsById',
      'getSimulators',
      'isSimulating',
      'getCurrentSimulator',
      'getScore'
    ]),
    question() {
      return this.questionSelected
    },
  },
  created() {
    const test = this.$route.params.id
    this.test = test
  },
  mounted() {
    this.validatingTestById()
    this.redirectionToDashboard()
    console.log('Esto es lo que quiero renderizar', this.getCurrentSimulator)
  },
  methods: {
    ...mapActions('fireSimulator', ['setCurrentSimulator']),
    validatingTestById() {
      if (this.getSimulatorsById.some((query) => query.id === this.test)) {
        const simulator = this.getSimulators.filter((test) => {
          return test.id === this.test
        })
        this.simulator = simulator
        this.setCurrentSimulator(this.simulator[0].simulatorStructure)
      } else {
        return
      }
    },
    getQuestion(i, ii) {
      const questionSelected = {
        question: this.getCurrentSimulator[i].questions[ii].question,
        image: this.getCurrentSimulator[i].questions[ii].image,
        options: this.getCurrentSimulator[i].questions[ii].options
      }
      if(i == undefined && i == null) {
        return
      } else {
        return this.questionSelected = questionSelected
      }
    },
    redirectionToDashboard() {
      if(this.getScore > 0) {
        this.$router.push('/student/dashboard')
      }
    }
  },
}
</script>
