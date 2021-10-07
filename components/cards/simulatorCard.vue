<template>
  <div>
    <div class="w-full py-2 px-4 rounded-xl border border-primary shadow-lg">
      <div class="w-full flex justify-between items-start sm:items-center">
        <!-- LEFT CONTENT -->
        <div class="w-3/5 h-full flex flex-col justify-between">
          <p class="text-2xl lg:text-xl text-left font-medium text-secondary">
            {{ title }}
          </p>
          <div
            v-html="description"
            class="my-4 text-sm text-gray-600 font-light"
          />
          <div class="w-full flex items-center mb-2">
            <div class="w-4 h-4 mr-2">
              <c-icon name="file" class="text-secondary" />
            </div>
            <p class="text-left text-gray-800 font-medium text-xs">
              Preguntas: {{ simulatorStructure }}
            </p>
          </div>
          <div class="w-full flex items-center mb-4">
            <div class="w-4 h-4 mr-2">
              <c-icon name="clock" class="text-secondary" />
            </div>
            <p class="text-left text-gray-800 font-medium text-xs">
              Duración: {{ hours }} hrs, {{ minutes }} min, {{ seconds }} s
            </p>
          </div>
        </div>
        <!-- RIGHT CONTENT -->
        <div class="w-2/5 sm:1/5">
          <figure
            class="mx-auto sm:w-1/2 lg:w-3/5 flex justify-center items-center"
          >
            <img
              src="@/static/images/illustrations/education.png"
              alt="simulator-image"
            />
          </figure>
        </div>
      </div>
      <div class="w-full">
        <c-button
          name="Simular"
          class="bg-primary"
          @click="redirectionToSimulator(id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimulatorCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    simulatorStructure: {
      type: Number,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    redirectionToSimulator(index) {
      this.$router.push(`simulador/simulacion`)
    },
  },
}
</script>
