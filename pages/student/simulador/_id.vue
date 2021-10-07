<template>
  <div class="w-full py-4">
    <div class="flex flex-wrap justify-between items-start">
      <!-- LEFT -->
      <div class="w-full lg:w-8/12">
        <!-- CRONOMETRO -->
        <the-timer :time="simulator[0].time" />
        <!-- VISUALIZACION DE PREGUNTAS -->
        <div
          v-if="isSimulating"
          class="w-full bg-white shadow-lg rounded-lg py-2 px-4 mt-4"
        >
          <nuxt-child />
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
            <nuxt-link
              :to="{
                path: routePath,
                query: { question: categoryQuestions.id },
              }"
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
              "
            >
              {{ ii + 1 }}
            </nuxt-link>
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
  validate({ query }) {
    return query.test
  },
  data: () => ({
    test: null,
    simulator: [{ time: 0 }],
  }),
  computed: {
    ...mapGetters('fireSimulator', [
      'getSimulatorsById',
      'getSimulators',
      'isSimulating',
      'getCurrentSimulator',
    ]),
  },
  async asyncData({ params }) {
    console.log(params)
  },
  created() {
    const test = this.$route.query.test
    console.log(test)
    this.test = test
  },
  mounted() {
    this.validatingTestById()
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
        console.log('saludos desde el error')
      }
    },
  },
}
</script>
