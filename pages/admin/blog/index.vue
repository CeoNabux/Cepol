<template>
  <div class="w-full flex justify-center items-start flex-wrap">
    <!-- LEFT CONTAINER -->
    <div
      class="
        w-full
        lg:w-2/3
        px-2
        pt-4
        py-2
        pb-4
        border border-gray-400
        rounded-lg
        shadow
        bg-white
      "
    >
      <h1 class="text-gray-700 text-3xl font-medium mb-8">
        Empecemos a escribir algo increíble
      </h1>
      <!-- CONTENEDOR PARA SUBIR TU IMAGEN -->
      <div class="w-full mb-6">
        <p class="text-gray-700 text-medium text-xl">
          Sube una imagen que describa tu blog
        </p>
        <div class="container mt-6 px-0">
          <label
            class="
              w-64
              flex flex-col
              items-center
              px-2
              py-2
              bg-secondary
              rounded-md
              shadow-md
              tracking-wide
              uppercase
              border border-blue
              cursor-pointer
              hover:bg-white hover:text-secondary
              text-white
              ease-linear
              transition-all
              duration-150
            "
            >Sube tu imagen
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="onChange"
            />
          </label>
          <div
            v-if="image.imageUrl"
            class="
              w-64
              mt-4
              flex
              justify-center
              items-center
              border border-gray-300
              p-2
              rounded-sm
            "
          >
            <img :src="image.imageUrl" />
          </div>
        </div>
      </div>

      <!-- CONTENEDOR PARA SUBIR EL BLOG -->
      <div class="w-full">
        <quill-editor v-model="editorData" />
      </div>
      <div class="w-full lg:w-5/12 mt-6">
        <c-button
          name="Guardar"
          :class="{
            'bg-secondary': postIsValid,
            'bg-gray-300': !postIsValid,
          }"
          @click="saveData"
          :disabled="!postIsValid"
        />
      </div>
    </div>
    <!-- RIGHT CONTAINER -->
    <div
      class="
        w-full
        mt-2
        lg:mt-0
        lg:w-1/3
        px-2
        pt-4
        py-2
        border border-gray-400
        rounded-lg
        shadow
        bg-white
      "
    >
      <div class="w-full flex flex-col justify-center items-center my-2">
        <p class="text-gray-600 text-lg font-medium w-full text-center">
          Guardar y continuar
        </p>
        <div class="w-full px-1 mt-2">
          <c-button
            :disabled="!postSaved"
            name="Publicar"
            class="bg-gray-300 text-lg text-white"
            :class="{ 'bg-secondary': postSaved }"
            @click="publishData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  data: () => ({
    editorData: '',
    image: {
      imageUrl: '',
      imageObject: '',
    },
    edited: false,
  }),
  computed: {
    postIsValid() {
      return this.image.imageUrl !== '' && this.editorData !== ''
    },
    postSaved() {
      return this.edited !== false
    },
  },
  methods: {
    saveData() {
      const editorData = {
        image: this.image.imageObject,
        post: this.editorData,
        published: false,
      }
      this.edited = true
      console.log(editorData)
    },
    onChange(event) {
      const file = event.target.files[0]
      this.image.imageObject = file
      this.image.imageUrl = URL.createObjectURL(file)
    },
    publishData() {
      if (this.edited) {
        console.log('por publicar')
        this.edited = false
      }
    },
  },
}
</script>
