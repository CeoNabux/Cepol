<template>
  <div>
    <div class="w-full bg-white shadow-lg rounded-lg py-2 px-4">
      <p class="text-xl text-gray-800 font-semibold">Simulador</p>
      <!-- EMPEZAR SIMULADOR -->
      <div v-if="!getSimulatorActive" class="w-full mx-auto">
        <p class="text-base font-medium text-gray-800 w-full text-center">
          Comenzar simulador
        </p>
        <c-button
          name="Empezar Simulador"
          class="bg-green-700 mt-4"
          @click="startSimulator"
        />
      </div>
      <!-- SIMULADOR INICIALIZADO -->
      <div v-else class="flex flex-wrap w-full justify-center mt-2">
        <p class="text-base font-medium text-gray-800 w-full text-center">
          Tu tiempo restante
        </p>
        <div class="w-1/4 flex flex-col items-center">
          <p class="text-4xl font-semibold text-gray-800">{{ displayHours }}</p>
          Horas
        </div>
        <p class="w-1/12 text-4xl font-semibold text-gray-800">:</p>
        <div class="w-1/4 flex flex-col items-center">
          <p class="text-4xl font-semibold text-gray-800">
            {{ displayMinutes }}
          </p>
          Minutos
        </div>
        <p class="w-1/12 text-4xl font-semibold text-gray-800">:</p>
        <div class="w-1/4 flex flex-col items-center">
          <p class="text-4xl font-semibold text-gray-800">
            {{ displaySeconds }}
          </p>
          Segundos
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    displayDays: 0,
    displayHours: 0,
    displayMinutes: 0,
    displaySeconds: 0,
    start: {
      hours: 0,
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
    },
  }),
  computed: {
    ...mapGetters('fireSimulator', ['getSimulatorActive']),
  },
  methods: {
    ...mapActions('fireSimulator', ['setSimulatorTime', 'activeSimulator']),
    getStart() {
      const now = new Date()
      this.start.hours = now.getHours()
      this.start.minutes = now.getMinutes()
      this.start.seconds = now.getSeconds()
      this.start.miliseconds = now.getMilliseconds()
    },
    startTest() {
      this.getStart()
      const time = {
        hours: this.start.hours,
        minutes: this.start.minutes,
        seconds: this.start.seconds,
        miliseconds: this.start.miliseconds,
      }
      this.setSimulatorTime(time)
    },
    startSimulator() {
      if (!this.getSimulatorActive) {
        this.activeSimulator(true)
        this.startTest()
      }
    },
  },
}
</script>
