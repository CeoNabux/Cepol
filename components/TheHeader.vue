<template>
  <div class="bg-white border-b border-secondary relative">
    <div class="container max-w-screen-2xl mx-auto px-2 py-4">
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
        <div class="hidden lg:flex justify-between items-center w-64">
          <div class="px-1 w-1/2 flex justify-center items-center">
            <c-button
              name="Inicia Sesión"
              class="border-2 border-primary text-primary"
            />
          </div>
          <div class="px-1 w-1/2 flex justify-center items-center">
            <c-button name="Registro" class="bg-primary text-white" />
          </div>
        </div>
        <div class="flex lg:hidden w-12 justify-center items-center">
          <button
            class="rounded-full bg-primary p-2 shadow-lg"
            @click="getMenu"
            v-on-clickaway="closeMenu"
          >
            <c-icon name="menu" class="text-white" />
          </button>
        </div>
      </div>
    </div>
    <div
      class="
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
        items
        center
      "
    >
      <div class="w-full h-full flex flex-col justify-center">
        <div class="flex w-12 justify-center items-center">
          <button
            class="rounded-full bg-primary p-2 shadow-lg"
            @click="getMenu"
            v-on-clickaway="closeMenu"
          >
            <c-icon name="menu" class="text-white" />
          </button>
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
  data: () => ({
    menu: [
      { name: 'Inicio', link: '/' },
      { name: 'Blog', link: '/blog' },
      { name: 'Servicios', link: '/services' },
      { name: 'Contáctos', link: '/contacts' },
    ],
  }),
  computed: {
    ...mapGetters('config_drawer', ['showMenu']),
  },
  methods: {
    ...mapActions('config_drawer', ['activeMenu']),
    getMenu() {
      if (this.showMenu) {
        this.activeMenu(false)
      } else {
        this.activeMenu(true)
      }
    },
    closeMenu() {
      this.activeMenu(false)
    },
  },
}
</script>
