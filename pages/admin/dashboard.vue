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
                  name="Crear preguntas"
                  class="bg-primary mb-1"
                  @click="redirectionToCreateSimulator"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- FILTRO DE PREGUNTAS POR CATEGORIA -->
      <div
        class="w-full bg-white lg:w-3/12 rounded-lg shadow-lg mt-4 lg:mt-0 p-4"
      >
        <p class="text-gray-800 font-medium w-full text-center">
          Filtra por dominio
        </p>
        <div
          v-for="(category, i) in categories"
          :key="i"
          class="w-full lg:w-3/4 mb-2 mx-auto"
        >
          <c-button
            :name="category.category"
            class="text-sm border"
            :class="{
              'bg-secondary text-white border border-white': category.state,
              'text-secondary border-secondary': !category.state,
            }"
            @click="getCategory(i)"
          />
        </div>
      </div>
    </div>
    <!-- SECCION DE FILTRADO DE PEGUNTAS -->
    <div
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
        v-for="(question, i) in getQuestions"
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
          <p class="text-sm font-semibold text-gray-800">
            {{ question.question.category }}
          </p>
          <div
            v-html="question.question.question"
            class="text-base text-gray-800 mt-2"
          />
        </div>
        <div class="w-full lg:w-1/4 mt-4 lg:mt-0 flex flex-wrap">
          <div class="w-full">
            <c-button
              name="Eliminar pregunta"
              class="bg-pink-700 text-white"
              @click="removeQuestion(question.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  methods: {
    redirectionToCreateSimulator() {
      this.$router.push('/admin/CreateSimulator')
    }
  }
}
</script>
