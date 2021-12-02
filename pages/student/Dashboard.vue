<template>
  <div class="w-full">
    <div class="px-6 py-2 border border-gray-400 rounded-lg shadow bg-white">
      <h1 class="text-4xl text-secondary font-semibold">
        Bienvenido {{ getUserData.name }}
      </h1>
      <!-- MOSTRAMOS BOTON Y CARTEL VACIO EN CASO
      DE NO TENER DATOS -->
      <div
        v-if="!chartData.datasets[0].data.length"
        class="
          w-full
          py-8
          bg-gray-200
          shadow-lg
          my-8
          flex flex-col
          justify-center
          items-center
        "
      >
        <p class="text-gray-400 text-xl font-medium">Aun no tenemos puntajes</p>
        <p class="text-secondary font-medium mb-8">Simula ya!</p>
        <div class="w-32">
          <c-button
            name="Simula ahora"
            class="bg-secondary"
            @click="redirectToSimulator"
          />
        </div>
      </div>
      <!-- MOSTRAMOS LA DATA EN CASO DE QUE EXISTA -->
      <div v-else class="w-full my-8">
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
import CButton from '~/components/global/CButton.vue'
export default {
  layout: 'app',
  components: {
    SimulatorCard,
    CButton,
  },
  data: () => ({
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'Simulaciones Transformar',
          borderColor: '#ffa420',
          backgroundColor: 'transparent',
          data: [],
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
    simulators: [],
  }),
  computed: {
    ...mapGetters('fireSimulator', [
      'getSimulators',
      'isSimulating',
      'getScore',
    ]),
    ...mapGetters('fireUsers', ['getUserData', 'getScores']),
    ...mapGetters('fireSimulator', ['getScore']),
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
  watch: {
    getSimulators(value) {
      if (value) {
        this.setSimulators()
      }
    },
    getScores(value) {
      if (value) {
        this.scoresHistory()
      }
    },
  },
  mounted() {
    this.fetchSimulators()
    this.getData()
    this.resetData()
  },
  methods: {
    ...mapActions('fireSimulator', [
      'fetchSimulators',
      'resetScore',
      'resetDataSimulation',
    ]),
    ...mapActions('fireUsers', ['fetchUserData']),
    getData() {
      if (this.user.id) {
        this.fetchUserData(this.user.id)
      }
    },
    //TOMAMOS EL PUNTAJE DE LOS ULTIMOS 4 SIMULADORES/
    //Y LOS PRESENTAMOS
    scoresHistory() {
      const scoreHistory = this.getScores
      scoreHistory.slice(scoreHistory.length - 4, 0)
      this.chartData.datasets[0].data = scoreHistory
      this.chartData.datasets[0].data.forEach((score, index) => {
        this.chartData.labels.push(`simulador ${index + 1}`)
      })
    },
    setSimulators() {
      this.getSimulators.forEach((doc) => {
        let number = 0
        let h, m, s
        s = doc.time / 1000
        h = parseInt(s / 3600)
        s = s % 3600
        m = parseInt(s / 60)
        s = s % 60
        this.simulators.push({
          id: doc.id,
          title: doc.title,
          description: doc.description,
          countingQuestions: doc.simulatorStructure.forEach((simulator) => {
            number = number + simulator.number
          }),
          simulatorStructure: number,
          hours: h,
          minutes: m,
          seconds: s,
        })
      })
    },
    redirectToSimulator() {
      this.$router.push('simulador')
    },
    resetData() {
      if (this.getScore > 0) {
        this.resetDataSimulation
      }
    },
  },
}
</script>
