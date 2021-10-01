<template>
  <div class="w-full">
    <div class="px-6 py-2 border border-gray-400 rounded-lg shadow bg-white">
      <h1 class="text-4xl text-gray-700 font-semibold">Crea tú simulador</h1>
      <!-- SECCION DE CREACION DE PREGUNTAS -->
      <div
        class="flex flex-wrap justify-between items-start mt-4 max-w-screen-lg"
      >
        <!-- INSERTAMOS PREGUNTAS -->
        <div
          class="
            w-full
            lg:w-7/12
            py-2
            mb-4
            flex flex-col
            justify-center
            items-center
          "
        >
          <!-- CREANDO PREGUNTAS -->
          <div class="w-full">
            <!-- APARECE EDITOR CUANDO NO HAY PREGUNTA GUARDADA -->
            <div v-if="!simulator.editing" class="w-full">
              <the-editor v-model="descriptionContent" />
              <div class="w-full lg:w-1/2 mt-2">
                <c-button
                  name="Guardar Descripcion"
                  class="bg-primary"
                  @click="saveDescription"
                />
              </div>
            </div>
            <div v-else class="w-full border border-gray-300 rounded p-3">
              <div v-html="simulator.description" />
              <div class="w-full lg:w-1/2 mt-2">
                <c-button
                  name="Editar"
                  class="bg-white text-secondary border border-secondary"
                  @click="editSimulator"
                />
              </div>
            </div>
            <div class="w-full h-px bg-gray-200 mt-6" />
            <p class="text-xl text-gray-700 font-medium mt-6">
              Agrega las preguntas
            </p>
            <p class="text-xs text-pink-600 font-light">
              Agrega al menos 1 categoría y 50 preguntas para un total de 10
              minutos de simulador
            </p>
            <!-- ESCOGER NUMERO DE PREGUNTAS EN CATEGORIA -->
            <div class="w-full">
              <p
                class="
                  text-gray-600 text-lg
                  font-medium
                  mb-2
                  w-full
                  text-left
                  mt-4
                "
              >
                Escoge los razonamiento
              </p>
              <div class="w-full justify-center flex flex-col">
                <div
                  v-for="(category, i) in categories"
                  :key="i"
                  class="
                    w-full
                    border border-gray-300
                    rounded-md
                    shadow-md
                    py-2
                    px-4
                    mb-2
                    flex
                    justify-between
                    items-center
                  "
                >
                  <p class="text-xl text-gray-800 w-1/2">
                    {{ category.name }}
                  </p>
                  <div class="w-1/2 flex justify-end">
                    <div class="w-1/2 flex justify-center items-center">
                      <input
                        v-if="!category.state"
                        type="number"
                        v-model="category.number"
                        class="py-1 px-2 w-12 border border-gray-300 rounded"
                      />
                      <p v-else class="text-secondary text-lg font-semibold">
                        {{ category.number }}
                      </p>
                      <p class="text-lg text-gray-800 font-semibol ml-2">
                        / {{ categoryNumber }}
                      </p>
                    </div>
                    <div class="w-1/2">
                      <div v-if="!category.state" class="w-full">
                        <c-button
                          name="Agregar"
                          class="text-xs border"
                          :class="{
                            'bg-secondary text-white border border-white':
                              category.state,
                            'text-secondary border-secondary': !category.state,
                          }"
                          @click="
                            getNumberOfQuestions(
                              category.category,
                              i,
                              category.number
                            )
                          "
                        />
                      </div>
                      <div v-else class="w-full">
                        <c-button
                          name="Editar"
                          class="bg-secondary"
                          @click="editNumberOfQuestions(i)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- BOTON PARA AGREGAR RESPUESTA -->
            <div class="w-full flex flex-wrap justify-start items-end mt-8">
              <p class="text-lg mr-4 text-gray-800 font-medium">
                Total de preguntas:
              </p>
              <p class="text-2xl font-semibold text-secondary">
                {{ totalOfQuestions }}
              </p>
            </div>
          </div>
        </div>
        <!-- GUARDAMOS PREGUNTAS Y PUBLICAMOS -->
        <div
          class="
            w-full
            lg:w-4/12
            flex flex-col-reverse
            items-start
            border border-gray-200
            rounded
            p-2
          "
        >
          <div class="w-full flex flex-col justify-center items-center mt-1">
            <p class="text-gray-600 text-lg font-medium w-full text-center">
              Guardar y publicar
            </p>
            <div class="w-full px-1 mt-2">
              <c-button
                :disabled="!validSimulator"
                name="Publicar Simulador"
                class="bg-gray-300 text-lg text-white"
                :class="{ 'bg-secondary': validSimulator }"
                @click="sendToFirebase"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CButton from '~/components/global/CButton.vue'
export default {
  components: { CButton },
  layout: 'app',
  data: () => ({
    descriptionContent: '',
    categoryNumber: 15,
    categories: [
      {
        name: 'verbal',
        category: 'verbal',
        state: false,
        number: 0,
      },
      {
        name: 'numerico',
        category: 'numerico',
        state: false,
        number: 0,
      },
      {
        name: 'lógico',
        category: 'logico',
        state: false,
        number: 0,
      },
      {
        name: 'atención y concentración',
        category: 'atencion',
        state: false,
        number: 0,
      },
    ],
    // OBJETO EN EL QUE SE GUARDAN LOS DATOS A SUBIR
    simulator: {
      editing: false,
      description: '',
      simulatorStructure: [],
    },
    totalAnswer: 0,
  }),
  computed: {
    validSimulator() {
      console.log('hola')
    },
    simulatorIsValid() {
      return this.answerContent !== ''
    },
    totalOfQuestions() {
      if (!this.simulator.simulatorStructure.length) {
        return 0
      } else {
        return this.simulator.simulatorStructure
          .map((item) => item.number)
          .reduce((prev, next) => prev + next)
      }
    },
  },
  methods: {
    sendToFirebase() {
      console.log('hola')
    },
    editNumberOfQuestions(index) {
      this.categories[index].state = false
      this.categories[index].number = 0
    },
    saveDescription() {
      this.simulator.description = this.descriptionContent
      this.simulator.editing = true
    },
    editSimulator() {
      this.simulator.editing = false
    },
    saveSimulator() {
      console.log('Guardar simulador')
    },
    getNumberOfQuestions(category, index, numberOfQuestions) {
      this.categories[index].state = true
      if (this.simulator.simulatorStructure.length) {
        const questionExist = this.simulator.simulatorStructure.findIndex(
          (item) => item.categoryName === category
        )
        console.log(questionExist)
        if (questionExist !== -1) {
          const replaceNumberOfQuestions =
            this.simulator.simulatorStructure.indexOf((question) => {
              return question.categoryName === category
            })
          this.simulator.simulatorStructure.splice(
            replaceNumberOfQuestions,
            1,
            {
              categoryName: category,
              number: Number(numberOfQuestions),
            }
          )
        } else {
          this.simulator.simulatorStructure.push({
            categoryName: category,
            number: Number(numberOfQuestions),
          })
        }
      } else {
        this.simulator.simulatorStructure.push({
          categoryName: category,
          number: Number(numberOfQuestions),
        })
      }
    },
  },
}
</script>
