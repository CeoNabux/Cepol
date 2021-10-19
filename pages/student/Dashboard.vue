<template>
  <div class="w-full">
    <div class="px-6 py-2 border border-gray-400 rounded-lg shadow bg-white">
      <h1 class="text-4xl text-secondary font-semibold">
        Bienvenido {{ getUserData.name }}
      </h1>
      <div class="w-full my-8">
        <client-only>
          <line-chart
            :data="chartData"
            :options="options"
            :styles="chartStyles"
          ></line-chart>
        </client-only>
      </div>
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
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'Simulaciones Transformar',
          borderColor: '#ffa420',
          backgroundColor: 'transparent',
          data: null
        },
      ],
      responsive: true,
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            min: 0,
            max: 1000,
          },
        ],
      },
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true,
        },
      },
      maintainAspectRatio: false,
    },
  }),
  computed: {
    ...mapGetters('fireSimulator', [
      'getSimulators',
      'isSimulating',
      'getScore',
    ]),
    ...mapGetters('fireUsers', ['getUserData', 'getScores']),
    ...mapGetters('fireAuthentication', ['user']),
    score() {
      if (this.getScore > 0) {
        this.resetScore()
      }
    },
    chartStyles() {
      return {
        height: 350 + 'px',
        position: 'relative',
      }
    },
  },
  mounted() {
    this.fetchSimulators()
    this.getData()
    this.scoresHistory()
  },
  methods: {
    ...mapActions('fireSimulator', ['fetchSimulators', 'resetScore']),
    ...mapActions('fireUsers', ['fetchUserData']),
    getData() {
      if (this.user.id) {
        this.fetchUserData(this.user.id)
      }
    },
    scoresHistory() {
      const scoreHistory = this.getScores
      scoreHistory.slice(scoreHistory.length - 4, 0)
      this.chartData.datasets[0].data = scoreHistory
      this.chartData.datasets[0].data.forEach((score, index) => {
        this.chartData.labels.push(`simulador ${index + 1}`)
      })
      this.chartData.labels.reverse()
    }
  },
}
</script>
