<template>
  <div>
    <div class="w-full bg-white shadow-lg rounded-lg py-2 px-4">
      <p class="text-xl text-gray-800 font-semibold">Simulador</p>
      <!-- EMPEZAR SIMULADOR -->
      <div v-if="!isSimulating" class="w-full mx-auto">
        <p class="text-base font-medium text-gray-800 w-full text-center">
          Comenzar simulador
        </p>
        <c-button
          name="Empezar Simulador"
          class="bg-green-700 mt-4"
          @click="startTest"
        />
      </div>
      <!-- SIMULADOR INICIALIZADO -->
      <div v-else class="flex flex-wrap w-full justify-center mt-2">
        <p class="text-base font-medium text-gray-800 w-full text-center">
          Tu tiempo restante
        </p>
        <div class="w-1/2 flex flex-col items-center">
          <client-only>
            <vac
              ref="print"
              :end-time="new Date().getTime() + time"
              @finish="(vac) => timesUp()"
            >
              <span
                slot="process"
                slot-scope="{ timeObj }"
                class="text-secondary text-2xl font-medium"
                >{{ `${timeObj.h}hrs : ${timeObj.m}min : ${timeObj.s}s` }}</span
              >
              <span slot="finish" class="text-2xl font-medium text-secondary"
                >Simulador Finalizado</span
              >
            </vac>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    time: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters('fireSimulator', ['isSimulating']),
  },
  methods: {
    ...mapActions('fireSimulator', ['startSimulator', 'finishSimulator']),
    startTest() {
      if (!this.isSimulating) {
        this.startSimulator(true)
      }
    },
    timesUp() {
      this.finishSimulator(false)
      this.$router.push('score')
    }
  },
}
</script>
