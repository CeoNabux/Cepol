<template>
  <div class="w-full py-4">
    <div class="flex flex-wrap justify-between items-start">
      <!-- LEFT -->
      <div class="w-full lg:w-8/12">
        <!-- CRONOMETRO -->
        <the-timer :time="simulator[0].time" />
        <!-- VISUALIZACION DE PREGUNTAS -->
        <div class="w-full bg-white shadow-lg rounded-lg py-2 px-4 mt-4">
          Aqui se verian las preguntas
        </div>
      </div>
      <!-- RIGTH -->
      <!-- PANEL DE NAVAGACION DE PREGUNTAS -->
      <div
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
        <div
          v-for="(category, i) in getCurrentSimulator.simulatorSrtucture"
          :key="i"
          class="w-full"
        >
          <p class="text-gray-800 font-medium">{{ category.categoryName }}</p>
          <div class="flex flex-wrap w-full justify-between items-center">
            <nuxt-link class="w-3 h-3 rounded-full bg-secondary">
              {{}}
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
  created() {
    const test = this.$route.query.test
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
