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
        py-3
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
      <alert class="my-2" />
      <h3 class="text-lg font-semibold text-gray-600 mb-4">Regístrate con</h3>
      aqui va el boton de google
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
            class="py-2 px-3 border border-secondary rounded-md"
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
            class="py-2 px-3 border border-secondary rounded-md"
            required
            placeholder="UnPasswordLargoEsMasSeguro"
          />
          <span class="text-pink-700 text-sm">{{ errors[0] }}</span>
        </ValidationProvider>
        <label for="" class="text-blue-700 text-lg font light mb-2">
          Repite Contraseña
        </label>
        <input
          v-model="passwordRepeated"
          type="password"
          class="py-2 px-3 border border-secondary rounded-md"
          required
          placeholder="UnPasswordLargoEsMasSeguro"
        />
        <span class="text-pink-700 text-sm">{{ passwordConfirmed }}</span>
        <!-- BOTON DE ACCION -->
        <div class="w-full lg:w-32 mx-auto mt-4">
          <c-button
            :disabled="!formIsValid"
            name="Regístrate"
            class="text-white"
            :class="[{ 'bg-gray-400': !formIsValid}, {'bg-secondary': formIsValid}]"
            @click.prevent="signUp"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CButton from '@/components/global/CButton.vue'
import CIcon from '@/components/global/CIcon.vue'
import { ValidationProvider } from 'vee-validate'
import { mapActions } from 'vuex'
import Alert from '~/components/global/Alert.vue'
export default {
  components: {
    CButton,
    CIcon,
    ValidationProvider,
    Alert
  },
  data: () => ({
    email: '',
    password: '',
    passwordRepeated: '',
  }),
  computed: {
    passwordConfirmed() {
      return this.password !== this.passwordRepeated
        ? 'Tu Contraseña debe ser igual'
        : ''
    },
    formIsValid() {
      return (
        this.email !== '' &&
        this.password !== '' &&
        this.passwordRepeated !== '' &&
        this.password === this.passwordRepeated
      )
    },
    user() {
      return this.$store.getters['fireAuthentication/user']
    }
  },
  watch: {
    user(value) {
      if(value !== undefined && value !== null) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    ...mapActions('fireAuthentication', ['signUserUp']),
    signUp() {
      this.signUserUp({
        email: this.email,
        password: this.password
      })
    },
    getBack() {
      this.$router.push('/')
    },
  },
}
</script>
