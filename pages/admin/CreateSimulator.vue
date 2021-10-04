<template>
  <div class="w-full">
    <div class="px-6 py-2 border border-gray-400 rounded-lg shadow bg-white">
      <h1 class="text-4xl text-gray-700 font-semibold">Crea tu simulador</h1>
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
              <p class="text-lg font-semibold text-gray-800">
                Título para el simulador
              </p>
              <input
                type="text"
                v-model="titleContent"
                class="py-2 px-3 w-full mb-4 border border-gray-300 rounded lg"
              />
              <the-editor v-model="descriptionContent" />
              <div class="w-full lg:w-1/2 mt-2">
                <c-button
                  name="Guardar Descripcion"
                  class=""
                  :disabled="!titleAndDescriptionAreValid"
                  :class="{
                    'bg-primary': titleAndDescriptionAreValid,
                    'bg-gray-400': !titleAndDescriptionAreValid,
                  }"
                  @click="saveDescription"
                />
              </div>
            </div>
            <div v-else class="w-full border border-gray-300 rounded p-3">
              <div>
                <p class="text-secondary text-2xl font-medium">
                  {{ titleContent }}
                </p>
              </div>
              <div v-html="simulator.description" class="my-4" />
              <div class="w-full lg:w-1/2">
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
              Agrega al menos 1 categoría y 28 preguntas para un total de 10
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
              <div
                v-if="setCategories"
                class="w-full justify-center flex flex-col"
              >
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
                    {{ category.category }}
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
                        / {{ category.counter }}
                      </p>
                    </div>
                    <div class="w-1/2">
                      <div v-if="!category.state" class="w-full">
                        <c-button
                          name="Agregar"
                          class="text-xs border"
                          :disabled="category.number > category.counter"
                          :class="{
                            'bg-secondary text-white border border-white':
                              category.number <= category.counter,
                            'bg-gray-400': category.number > category.counter,
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
              <div v-else class="text-gray-400">Estamos cargando</div>
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
                :disabled="!simulatorIsValid"
                name="Publicar Simulador"
                class="bg-gray-300 text-lg text-white"
                :class="{ 'bg-secondary': simulatorIsValid }"
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
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { CButton },
  layout: 'app',
  data: () => ({
    titleContent: '',
    descriptionContent: '',
    categories: [],
    // OBJETO EN EL QUE SE GUARDAN LOS DATOS A SUBIR
    simulator: {
      editing: false,
      title: '',
      description: '',
      simulatorStructure: [],
    },
    time: 0,
    timePerQuestion: 21.17,
    milisecond: 1000
  }),
  created() {
    this.fetchCategoriesState()
  },
  computed: {
    ...mapGetters('fireSimulator', ['getSimulatorCategories']),
    simulatorIsValid() {
      return (
        this.simulator.simulatorStructure.length === 4 &&
        this.simulator.description !== '' &&
        this.simulator.title !== '' &&
        this.totalOfQuestions > 0
      )
    },
    titleAndDescriptionAreValid() {
      return this.descriptionContent !== '' && this.titleContent !== ''
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
    setCategories() {
      if (this.getSimulatorCategories.length) {
        if (!this.categories.length) {
          this.getSimulatorCategories.forEach((doc) => {
            this.categories.push({
              category: doc.category,
              counter: doc.counter,
              number: 0,
              state: false,
            })
          })
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
  },
  methods: {
    ...mapActions('fireSimulator', ['fetchCategoriesState', 'postSimulator']),
    editNumberOfQuestions(index) {
      this.categories[index].state = false
      this.categories[index].number = 0
    },
    saveDescription() {
      this.simulator.description = this.descriptionContent
      this.simulator.title = this.titleContent
      this.simulator.editing = true
    },
    editSimulator() {
      this.simulator.editing = false
    },
    getNumberOfQuestions(category, index, numberOfQuestions) {
      this.categories[index].state = true
      if (this.simulator.simulatorStructure.length) {
        const questionExist = this.simulator.simulatorStructure.findIndex(
          (item) => item.categoryName === category
        )
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
    sendToFirebase() {
      for (let i = 0; i <  this.simulator.simulatorStructure.length; i++) {
        this.time = this.time + this.simulator.simulatorStructure[i].number
      }
      this.time = this.time  * this.timePerQuestion * this.milisecond
      const simulatorData = {
        simulatorStructure: this.simulator.simulatorStructure,
        title: this.simulator.title,
        description: this.simulator.description,
        time: this.time
      }
      this.postSimulator(simulatorData)
    },
  },
}
</script>
