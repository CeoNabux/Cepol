<template>
  <div class="w-full">
    <div class="w-full flex flex-wrap justify-between items-start">
      <!-- LEFT SECTION -->
      <div class="w-full lg:w-8/12">
        <div
          class="
            px-4
            py-4
            border border-gray-400
            rounded-lg
            shadow
            w-full
            bg-white
          "
        >
          <!-- BANNER SECTION -->
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
            <h1 class="text-4xl text-gray-700 font-semibold mb-4">
              Ingresa instructores
            </h1>
            <div
              class="w-full h-full bg-image"
              :style="{ backgroundImage: 'url(' + bgImage + ')' }"
            ></div>
          </div>
        </div>
        <div
          class="
            mt-6
            w-full
            rounded-lg
            border border-gray-400
            bg-white
            px-4
            py-6
          "
        >
          <!-- FORM SECTION -->
          <form action="" class="w-full flex flex-col px-4">
            <!-- CORREO -->
            <ValidationProvider
              rules="required|email"
              v-slot="{ errors }"
              class="flex flex-col mb-4"
            >
              <label class="text-blue-700 text-lg font light mb-2">
                Correo
              </label>
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
            <!-- LOADER -->
            <div class="mx-auto my-2">
              <loading :loading="loading" />
            </div>
            <!-- BOTON DE ACCION -->
            <div class="w-full lg:w-32 mx-auto mt-4">
              <c-button
                :disabled="!formIsValid"
                name="Regístrate"
                class="text-white"
                :class="[
                  { 'bg-gray-400': !formIsValid },
                  { 'bg-secondary': formIsValid },
                ]"
                @click.prevent="signUp"
              />
            </div>
          </form>
        </div>
      </div>
      <!-- RIGTH SECTION -->
      <div
        class="w-full bg-white lg:w-3/12 rounded-lg shadow-lg mt-4 lg:mt-0 p-4"
      >
        <p class="text-gray-800 font-medium w-full text-center">
          Tus instructores
        </p>
        <div
          v-for="(user, i) in getInstructors"
          :key="i"
          class="
            w-full
            mt-2
            flex
            justify-center
            items-center
            border border-gray-300
            shadow-lg
            rounded-lg
            py-3
          "
        >
          <p>
            {{ user.email }}
          </p>
          <button
            class="
              bg-pink-700
              flex
              justify-center
              items-center
              w-6
              h-6
              p-1
              rounded-full
              ml-2
              shadow-lg
            "
            @click="eraseInstructorUser(user.email)"
          >
            <c-icon name="trash" class="text-white" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ValidationProvider } from 'vee-validate'
export default {
  layout: 'app',
  components: {
    ValidationProvider,
  },
  data: () => ({
    bgImage: require('@/static/images/svg/newLesson.svg'),
    email: '',
    password: '',
    passwordRepeated: '',
  }),
  computed: {
    ...mapGetters('fireAuthentication', [
      'error',
      'loading',
      'getCurrentInstructor',
    ]),
    ...mapGetters('fireUsers', ['getInstructors']),
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
  },
  watch: {
    getCurrentInstructor(value) {
      if (value !== 0) {
        const user = this.getCurrentInstructor
        console.log(user)
        this.setInstructor(user)
      }
    },
  },
  mounted() {
    if (!this.getInstructors.length) {
      this.fetchInstructors()
    }
  },
  methods: {
    ...mapActions('fireAuthentication', ['signInstructorUp']),
    ...mapActions('fireUsers', [
      'fetchInstructors',
      'setInstructor',
      'eraseInstructor',
    ]),
    signUp() {
      this.signInstructorUp({
        email: this.email,
        password: this.password,
      })
    },
    eraseInstructorUser(email) {
      const instructor = this.getInstructors.filter(
        (instructor) => instructor.email === email
      )
      this.eraseInstructor(instructor)
    },
  },
}
</script>

<style scoped>
.bg-image {
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
}
@media only screen and (max-width: 640px) {
  .bg-image {
    background-size: cover;
    background-position-x: 50rem;
  }
}
</style>
