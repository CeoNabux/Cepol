<template>
  <div
    class="
      w-full
      h-screen
      md:w-96
      md:h-auto
      border
      py-2
      px-4
      border-secondary
      rounded-md
      bg-white
      flex flex-col
      justify-center
      items-center
      shadow-md
    "
  >
    <div class="w-full flex justify-end items-center">
      <button class="w-6 h-6" @click="getBack">
        <c-icon name="close" class="hover:text-pink-700" />
      </button>
    </div>
    <h3 class="text-lg font-semibold text-gray-600 mb-4">Regístrate con</h3>
    aqui va el boton de google
    <div class="flex justify-center items-center w-10/12">
      <div class="h-px w-1/3 bg-gray-400" />
      <p class="text-gray-400 mx-2">o</p>
      <div class="h-px w-1/3 bg-gray-400" />
    </div>
    <!-- FORMULARIO -->
    <form action="" class="w-full flex flex-col px-4">
      <label for="" class="text-blue-700 text-lg font light mb-2"> Correo </label>
      <input
        type="email"
        class="py-2 px-3 border border-secondary rounded-md mb-4"
        autocomplete="email"
        required
        placeholder="juanito@gmail.com"
      />
      <label for="" class="text-blue-700 text-lg font light mb-2"> Contraseña </label>
      <input
        type="password"
        class="py-2 px-3 border border-secondary rounded-md mb-4"
        required
        placeholder="UnPasswordLargoEsMasSeguro"
      />
      <label for="" class="text-blue-700 text-lg font light mb-2"> Repite Contraseña </label>
      <input
        type="password"
        class="py-2 px-3 border border-secondary rounded-md mb-4"
        required
        placeholder="UnPasswordLargoEsMasSeguro"
      />
      <!-- BOTON DE ACCION -->
      <div class="w-full lg:w-32 mx-auto">
        <c-button name="Regístrate" class="text-white bg-secondary" />
      </div>
    </form>
  </div>
</template>

<script>
import CButton from '../global/CButton.vue'
import CIcon from '../global/CIcon.vue'
export default {
  components: {
    CButton,
    CIcon
  },
  name: 'TheSignUp',
  methods: {
    getBack() {
      this.$router.push('/')
    }
  }
}
</script>
