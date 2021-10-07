<template>
  <div class="w-full px-2 py-3">
    {{ questionData }}
    <!-- RECIBIMOS LA PREGUNTA -->
    <div class="flex justify-between items-start w-full">
      <div
        v-html="question.text"
        class="text-gray-800 font-medium text-lg w-full lg:w-3/4"
      />
      <!-- IMAGEN DE LA PREGUNTA -->
      <!-- <figure class="w-full flex justify-center items-center">
        <img src="" alt="" class="w-full">
      </figure> -->
    </div>
    <!-- RECIBIMOS OPCIONES DE RESPUESTA -->
    <div class="w-full py-3 mt-4">
      <div
        v-for="(option, i) in question.options"
        :key="i"
        class="
          mb-2
          px-3
          py-4
          border border-gray-200
          shadow-md
          rounded-lg
          flex flex-wrap
        "
      >
        <div
          v-html="option.text"
          class="text-gray-800 font-medium text-base w-full lg:w-3/4"
        />
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
    questionData: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    question: {
      text: 'Soy una pregunta',
      options: [{ text: 'hola' }, { text: 'como' }],
    },
  }),
}
</script>
