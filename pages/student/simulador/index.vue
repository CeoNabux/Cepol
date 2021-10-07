<template>
  <div class="w-full">
    <div class="px-6 py-2 border border-gray-400 rounded-lg shadow bg-white">
      <h1 class="text-4xl text-gray-700 font-semibold">
        Simuladores disponibles
      </h1>
      <div
        v-if="setSimulators"
        class="mt-4 flex justify-center items-center flex-wrap"
      >
        <!-- AQUI VA EL SIMULADOR -->
        <div
          v-for="(simulator, i) in simulators"
          :key="i"
          class="w-full lg:w-1/2"
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
    ...mapGetters('fireSimulator', ['getSimulators', 'isSimulating']),
    setSimulators() {
      if (this.getSimulators.length) {
        if (!this.simulators.length) {
          this.getSimulators.forEach((doc) => {
            this.simulators.push({
              id: doc.id,
              title: doc.title,
              description: doc.description,
              simulatorStructure: doc.simulatorStructure.length,
              time: doc.time,
              hours: parseInt(doc.time / 3600000),
              minutes: parseInt(doc.time / 60000),
              seconds: parseInt((doc.time % 60000) / 1000),
            })
          })
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
  },
  mounted() {
    this.fetchSimulators()
  },
  methods: {
    ...mapActions('fireSimulator', ['fetchSimulators']),
  },
}
</script>
