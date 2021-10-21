<template>
  <div class="bg-white border-b border-secondary relative">
    <div class="container max-w-screen-2xl mx-auto px-2 py-4">
      <!-- HEADER PREPARADO PARA PANTALLAS MAYORES A 1024 -->
      <div class="flex justify-between items-center">
        <figure class="w-24 flex justify-center items-center">
          <a href="/">
            <img src="@/static/images/logo-color.png" alt="cepol-logo" />
          </a>
        </figure>
        <ul class="hidden lg:flex justify-between items-center w-1/3">
          <li
            v-for="(item, i) in menu"
            :key="i"
            class="text-lg font-medium py-2 px-1 mx-2 text-primary rounded"
          >
            <a :href="item.link">{{ item.name }}</a>
          </li>
        </ul>
        <!-- BOTONES CON USUARIO NO AUTENTICADO -->
        <div
          v-if="!userIsAuthenticated"
          class="hidden lg:flex justify-between items-center w-64"
        >
          <div class="px-1 w-1/2 flex justify-center items-center">
            <c-button
              name="Inicia Sesión"
              class="border-2 border-primary text-primary"
              @click="signInRedirection"
            />
          </div>
          <div class="px-1 w-1/2 flex justify-center items-center">
            <c-button
              name="Registro"
              class="bg-primary text-white"
              @click="signUpRedirection"
            />
          </div>
        </div>
        <!-- BOTONES CON USUARIOS AUTENTICADOS -->
        <div v-else class="hidden lg:flex justify-between items-center w-52">
          <div class="p-1 w-12 h-12 flex justify-center items-center">
            <button
              class="p-1 rounded-full border-2 text-primary"
              @click="profileRedirection"
            >
              <c-icon name="account" />
            </button>
          </div>
          <div class="py-1 px-2 w-4/5 h-8 flex justify-center items-center">
            <button
              class="
                px-1
                py-2
                w-full
                text-sm
                rounded-md
                bg-primary
                text-white
                flex
                justify-center
                items-center
              "
              @click="signOut"
            >
              Cerrar sesion
              <div class="w-6 h-6 ml-2">
                <c-icon name="logout" />
              </div>
            </button>
          </div>
        </div>
        <div class="flex lg:hidden w-12 justify-center items-center">
          <button
            class="rounded-full bg-primary p-2 shadow-lg"
            @click="getMenu"
          >
            <c-icon name="menu" class="text-white" />
          </button>
        </div>
      </div>
    </div>
    <!-- MENU EN SIDEBAR PARA RESPONSIVE DESIGN -->
    <div
      class="
        z-50
        fixed
        top-0
        left-0
        right-0
        bottom-0
        bg-primary
        w-full
        h-full
        flex
        justify-center
        items-center
        transition-all
        duration-300
        ease-linear
        delay-75
      "
      :class="{ 'left-100': !showMenu }"
    >
      <div class="w-full h-full">
        <div class="flex w-full flex-col justify-center items-center">
          <div class="w-full h-20 flex justify-end px-2 py-4">
            <div class="w-12 flex justify-center items-center">
              <button
                class="rounded-full bg-primary p-2 shadow-lg"
                @click="getMenu"
              >
                <c-icon name="menu" class="text-white" />
              </button>
            </div>
          </div>
          <figure class="w-56 flex justify-center items-center mb-8">
            <nuxt-link to="/">
              <img
                src="@/static/images/logo-color.png"
                class="img-grayscale"
                alt="logo-cepol"
              />
            </nuxt-link>
          </figure>
          <div class="flex flex-col items-center mb-8">
            <div
              v-for="(item, i) in menu"
              :key="i"
              class="w-full h-12 flex justify-center items-center py-4 mb-4"
            >
              <nuxt-link :to="item.link">
                <p class="text-white text-xl font-semibold">
                  {{ item.name }}
                </p>
              </nuxt-link>
            </div>
          </div>
          <div
            v-if="!userIsAuthenticated"
            class="flex flex-col mt-4 w-full items-center"
          >
            <div
              class="px-2 w-full max-w-sm flex justify-center items-center mb-6"
            >
              <c-button
                name="Inicia Sesión"
                class="border-2 border-secondary text-secondary shadow-lg"
                @click="signInRedirection"
              />
            </div>
            <div class="px-2 w-full max-w-sm flex justify-center items-center">
              <c-button
                name="Registro"
                class="bg-primary border border-white text-white shadow-lg"
                @click="signUpRedirection"
              />
            </div>
          </div>
          <div v-else class="flex flex-col justify-between items-center w-52">
            <div class="p-1 w-12 h-12 flex justify-center items-center">
              <button
                class="p-1 rounded-full border-2 text-white"
                @click="profileRedirection"
              >
                <c-icon name="account" />
              </button>
            </div>
            <div class="py-1 px-2 w-4/5 h-8 flex justify-center items-center">
              <button
                class="
                  px-1
                  py-2
                  w-full
                  text-sm
                  rounded-md
                  bg-primary
                  text-white
                  flex
                  justify-center
                  items-center
                "
              >
                Cerrar sesion
                <div class="w-6 h-6 ml-2">
                  <c-icon name="logout" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CIcon from './global/CIcon.vue'
export default {
  components: { CIcon },
  computed: {
    ...mapGetters('config_drawer', ['showMenu']),
    menu() {
      let menuItems = [
        { name: 'Inicio', link: '/' },
        { name: 'Blog', link: '/blog' },
        { name: 'Servicios', link: '/services' },
        { name: 'Contáctos', link: '/contacts' },
      ]
      if (this.userIsAuthenticated) {
        let menuItems = [
          // { name: 'Blog', link: '/blog' },
          { name: 'Dashboard', link: '/dashboard' },
          { name: 'Simulador', link: '/simulador' },
          { name: 'Servicios', link: '/services' },
          { name: 'Contáctos', link: '/contacts' },
        ]
        return menuItems
      }
      return menuItems
    },
    userIsAuthenticated() {
      return (
        this.$store.getters['fireAuthentication/user'] !== null &&
        this.$store.getters['fireAuthentication/user'] !== undefined
      )
    },
  },
  methods: {
    ...mapActions('config_drawer', ['activeMenu']),
    ...mapActions('fireAuthentication', ['signUserOut']),
    getMenu() {
      if (!this.showMenu) {
        this.activeMenu(true)
      } else {
        this.activeMenu(false)
      }
    },
    closeMenu() {
      this.activeMenu(false)
    },
    signUpRedirection() {
      this.$router.push('/authentication/signUp')
    },
    profileRedirection() {
      this.$router.push('/profile')
    },
    signInRedirection() {
      this.$router.push('/authentication/signIn')
    },
    signOut() {
      this.signUserOut()
      this.$router.push('/')
    }
  },
}
</script>

<style scoped>
.img-grayscale {
  filter: grayscale(100);
}
</style>
