<template>
  <div class="w-full py-4">
    <div class="flex flex-wrap justify-between items-start">
      <!-- LEFT -->
      <div class="w-full lg:w-8/12">
        <!-- CRONOMETRO -->
        <the-timer />
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
        Aqui va el panel de navegacion de perguntas
      </div>
    </div>
  </div>
</template>

<script>
import TheTimer from '~/components/TheTimer.vue'
export default {
  components: { TheTimer },
  layout: 'app',
}
</script>
