<template>
  <div
    class="
      w-screen
      h-screen
      absolute
      top-0
      left-0
      bg-gray-600
      z-50
      flex
      justify-center
      items-center
    "
  >
    <div
      class="
        w-full
        h-screen
        md:w-96 md:h-auto
        border
        py-2
        px-4
        border-primary
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
      <!-- ALERTA DE ERRORES -->
      <alert
        v-if="error"
        class="my-2"
        @dismissed="onDismissed"
        :text="error.message"
      />
      <h3 class="text-lg font-semibold text-gray-600 mb-4">Inicia Sesion</h3>
      <div class="flex justify-center items-center w-10/12">
        <div class="h-px w-1/3 bg-gray-400" />
        <p class="text-gray-400 mx-2">o</p>
        <div class="h-px w-1/3 bg-gray-400" />
      </div>
      <!-- FORMULARIO -->
      <form action="" class="w-full flex flex-col px-4">
        <!-- CORREO -->
        <ValidationProvider
          rules="required|email"
          v-slot="{ errors }"
          class="flex flex-col mb-4"
        >
          <label class="text-blue-700 text-lg font light mb-2"> Correo </label>
          <input
            v-model="email"
            type="email"
            class="py-2 px-3 border border-primary rounded-md"
            autocomplete="email"
            required
            placeholder="juanito@gmail.com"
          />
          <span class="text-pink-700 text-sm">{{ errors[0] }}</span>
        </ValidationProvider>
        <!-- PASSWORD -->
        <ValidationProvider
          :rules="{
            min: 12,
            required: true,
            regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
          }"
          v-slot="{ errors }"
          class="flex flex-col mb-4"
        >
          <label for="" class="text-blue-700 text-lg font light mb-2">
            Contraseña
          </label>
          <input
            v-model="password"
            type="password"
            class="py-2 px-3 border border-primary rounded-md"
            required
            placeholder="UnPasswordLargoEsMasSeguro"
          />
          <span class="text-pink-700 text-sm">{{ errors[0] }}</span>
        </ValidationProvider>
        <nuxt-link to="signUp" class="text-sm text-primary underline">
          ¿Aún no tienes cuenta? Regístrate
        </nuxt-link>
        <!-- LOADER -->
        <div class="mx-auto my-2">
          <loading :loading="loading" />
        </div>
        <!-- BOTON DE ACCION -->
        <div class="w-full lg:w-32 mx-auto mt-4">
          <c-button
            :disabled="!formIsValid"
            name="Inicia sesion"
            class="text-white"
            :class="[
              { 'bg-gray-400': !formIsValid },
              { 'bg-primary': formIsValid },
            ]"
            @click.prevent="signIn"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    ValidationProvider,
  },
  data: () => ({
    email: '',
    password: '',
  }),
  computed: {
    ...mapGetters('fireAuthentication', ['loading', 'error']),
    formIsValid() {
      return (
        this.email !== '' &&
        this.password !== ''
      )
    },
    user() {
      return this.$store.getters['fireAuthentication/user']
    },
  },
  watch: {
    user(value) {
      if (value !== undefined && value !== null) {
        this.$router.push('/student/dashboard')
      }
    },
  },
  methods: {
    ...mapActions('fireAuthentication', ['signUserIn']),
    signIn() {
      this.signUserIn({
        email: this.email,
        password: this.password,
      })
    },
    getBack() {
      this.$router.push('/')
    },
    onDismissed() {
      this.$store.dispatch('fireAuthentication/clearError')
    }
  },
}
</script>
