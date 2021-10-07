<template>
  <div>
    <div class="w-full px-2 py-3 lg:w-3/4 bg-white rounded-lg">
      <h2 class="text-center text-primary font-medium text-lg">
        Simulador finalizado
      </h2>
      <p class="mt-4 text-center text-secondary text-2xl">
        Sigue preparandote para tu futuro
      </p>
      <p v-if="!getScore" class="text-4xl text-center text-primary font-medium mt-4">
        Estamos calificando tu test...
      </p>
      <div v-else class="flex w-64 justify-center items-end border border-gray-50 shadow-md rounded-lg p-4 mt-8 mx-auto">
        <p class="text-center text-gray-600 font-semibold text-8xl mt-6">
          {{ getScore }}
        </p>
        <p class="text-xl text-gray-500 font-medium">
          / 1000
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'app',
  computed: {
    ...mapGetters('fireSimulator', ['getScore'])
  }
}
</script>
