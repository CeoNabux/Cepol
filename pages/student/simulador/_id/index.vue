<template>
  <div class="w-full border border-gray-300 px-2 py-3">
    <!-- RECIBIMOS LA PREGUNTA -->
    <div class="flex justify-between items-start w-full">
      <div
        v-html="question"
        class="text-gray-800 font-medium text-lg w-full lg:w-3/4"
      />
      <!-- IMAGEN DE LA PREGUNTA -->
      <!-- <figure class="w-full flex justify-center items-center">
        <img src="" alt="" class="w-full">
      </figure> -->
    </div>
    <!-- RECIBIMOS OPCIONES DE RESPUESTA -->
    <div class="w-full border border-gray-300 px-2 py-3 mt-4">
      <div
        v-for="(option, i) in optionsArray"
        :key="i"
        class="border border-gray-200 shadow rounded-lg flex flex-wrap"
      >
        <div v-html="option.text" class="text-gray-800 font-medium text-base w-full lg:w-3/4" />
        <!-- <figure class="w-full fles justify-center items-start">
          <img
            :src="option.image"
            alt="cepol-opcion"
            class="w-full"
          />
        </figure> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionsArray: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: null
    }
  },
}
</script>
