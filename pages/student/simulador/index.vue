<template>
  <div class="w-full">
    <div class="px-6 py-2 border border-gray-400 rounded-lg shadow bg-white">
      <h1 class="text-4xl text-gray-700 font-semibold">
        Simuladores disponibles
      </h1>
      <div
        v-if="!getSimulators.length"
        class="mt-4 flex justify-center items-center"
      >
        <p class="text-secondary font-medium text-2xl">
          Estamos cargando los simuladores
        </p>
      </div>
      <div v-else class="mt-4 flex justify-center items-center flex-wrap">
        <!-- AQUI VA EL SIMULADOR -->
        <div
          v-for="(simulator, i) in simulators"
          :key="i"
          class="w-full lg:w-1/2 p-2"
        >
          <simulator-card
            :id="simulator.id"
            :title="simulator.title"
            :description="simulator.description"
            :simulatorStructure="simulator.simulatorStructure"
            :hours="simulator.hours"
            :minutes="simulator.minutes"
            :seconds="simulator.seconds"
            class="mx-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimulatorCard from '@/components/cards/simulatorCard.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'app',
  components: {
    SimulatorCard,
  },
  data: () => ({
    simulators: [],
  }),
  computed: {
    ...mapGetters('fireSimulator', [
      'getSimulators',
      'isSimulating',
      'getScore',
    ]),
    score() {
      if (this.getScore > 0) {
        this.resetScore()
      }
    },
  },
  watch: {
    getSimulators(value) {
      if (value) {
        this.setSimulators()
      }
    },
  },
  mounted() {
    this.fetchSimulators()
    this.resetData()
  },
  methods: {
    ...mapActions('fireSimulator', ['fetchSimulators', 'resetDataSimulation']),
    setSimulators() {
      this.getSimulators.forEach((doc) => {
        let number = 0
        this.simulators.push({
          id: doc.id,
          title: doc.title,
          description: doc.description,
          countingQuestions: doc.simulatorStructure.forEach((simulator) => {
            number = number + simulator.number
          }),
          simulatorStructure: number,
          hours: parseInt(doc.time / 3600000),
          minutes: parseInt(doc.time / 60000),
          seconds: parseInt((doc.time % 60000) / 1000),
        })
      })
    },
    resetData() {
      if(this.getScore > 0) {
        this.resetDataSimulation
      }
    }
  },
}
</script>
