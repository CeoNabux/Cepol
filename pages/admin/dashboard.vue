<template>
  <div class="w-full">
    <div class="flex justify-between flex-wrap items-start w-full">
      <div
        class="
          px-4
          py-4
          border border-gray-400
          rounded-lg
          shadow
          w-full
          lg:w-8/12
          bg-white
        "
      >
        <h1 class="text-4xl text-gray-700 font-semibold mb-4">
          Crea los simuladores
        </h1>
        <!-- INICIO PARA IR A CREAR -->
        <div
          class="
            w-full
            bg-gradient-to-br
            from-secondary
            to-primary
            shadow-lg
            flex
            justify-start
            items-center
            h-44
            sm:h-60
            rounded
            py-4
            px-2
          "
        >
          <div
            class="w-full h-full bg-image"
            :style="{ backgroundImage: 'url(' + bgImage + ')' }"
          >
            <div
              class="w-full h-full flex flex-col justify-between items-start"
            >
              <h2 class="text-white font-semibold text-2xl w-full sm:w-1/2">
                Aún no estás creando simuladores. Comienza ahora
              </h2>
              <div class="w-full sm:w-1/2 lg:w-33 mt-4">
                <c-button
                  name="Crear Simuladores"
                  class="bg-primary mb-1"
                  @click="redirectionToCreateSimulator"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- SECCION DE FILTRADO DE PEGUNTAS -->
    <div
      v-if="simulators.length"
      class="
        mt-6
        w-full
        lg:w-8/12
        rounded-lg
        border border-gray-400
        bg-white
        px-4
        py-6
      "
    >
      <!-- RENDERIZADO DE PREGUNTAS -->
      <div
        v-for="(simulator, i) in simulators"
        :key="i"
        class="
          w-full
          flex flex-wrap
          justify-between
          items-end
          shadow-2xl
          rounded
          px-2
          py-3
          mb-4
          border border-gray-200
        "
      >
        <div class="w-full lg:w-1/2">
          <p class="text-sm font-semibold text-primary">
            Horas: {{ simulator.hours }}, Minutos: {{ simulator.minutes }},
            Segundos: {{ simulator.seconds }}
          </p>
          <p class="text-secondary text-xl font-medium my-2">
            {{ simulator.title }}
          </p>
          <div v-html="simulator.description" class="text-base text-gray-800" />
          <p class="text-base text-gray-800 font-semibold mt-2">
            Total de preguntas: {{ simulator.simulatorStructure }}
          </p>
        </div>
        <div class="w-full lg:w-1/4 mt-4 lg:mt-0 flex flex-wrap">
          <div class="w-full">
            <c-button
              name="Eliminar simulador"
              class="bg-pink-700 text-white"
              @click="removeSimulator(simulator.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'app',
  simulators: [],
  data: () => ({
    bgImage: require('@/static/images/svg/newLesson.svg'),
    simulators: [],
  }),
  computed: {
    ...mapGetters('fireSimulator', ['getSimulators']),
  },
  watch: {
    getSimulators(value) {
      if (value) {
        this.setSimulators()
      }
    },
  },
  created() {
    this.fetchSimulators()
  },
  methods: {
    ...mapActions('fireSimulator', ['fetchSimulators', 'clearSimulators']),
    redirectionToCreateSimulator() {
      this.$router.push('/admin/CreateSimulator')
    },
    removeSimulator(index) {
      const id = ''
      id = this.getSimulators[index]
      console.log(id)
    },
    setSimulators() {
      this.getSimulators.forEach((doc) => {
        let number = 0
        this.simulators.push({
          id: doc.id,
          title: doc.title,
          description: doc.description,
          countingQuestions: doc.simulatorStructure.forEach((simulator) => {
            number = (number + simulator.number)
          }),
          simulatorStructure: number,
          hours: parseInt(doc.time / 3600000),
          minutes: parseInt(doc.time / 60000),
          seconds: parseInt((doc.time % 60000) / 1000),
        })
      })
    },
  },
  destroyed() {
    this.clearSimulators()
  },
}
</script>

<style scoped>
.bg-image {
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
}
@media only screen and (max-width: 640px) {
  .bg-image {
    background-size: cover;
    background-position-x: 50rem;
  }
}
</style>
