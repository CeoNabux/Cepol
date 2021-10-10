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
          v-for="(simulator, i) in getSimulators"
          :key="i"
          class="w-full lg:w-1/2 p-2"
        >
          <simulator-card
            :id="simulator.id"
            :title="simulator.title"
            :description="simulator.description"
            :simulatorStructure="simulator.simulatorStructure.length"
            :hours="parseInt(simulator.time / 3600000)"
            :minutes="parseInt(simulator.time / 60000)"
            :seconds="parseInt((simulator.time % 60000) / 1000)"
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
      if(this.getScore > 0) {
        this.resetScore()
      }
    }
  },
  mounted() {
    this.fetchSimulators()
  },
  methods: {
    ...mapActions('fireSimulator', ['fetchSimulators', 'resetScore']),
  },
}
</script>
