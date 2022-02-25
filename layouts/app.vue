<template>
  <div
    class="flex flex-col-reverse lg:flex-row min-h-screen bg-gray-200 relative"
  >
    <!-- SIDEBBAR -->
    <div
      class="
        w-full
        lg:w-16
        xl:w-64
        py-4
        px-4
        lg:px-0 lg:py-0
        flex flex-row
        lg:flex-col
        justify-start
        items-center
        bg-white
        border-t border-secondary
        lg:border-secondary lg:border-r lg:rounded-r-xl
        rounded
        drop-shadow-xl
        lg:divide-y
        divide-secondary
        transform
        transition
        duration-500
        lg:sticky lg:top-0 lg:left-0 lg:h-screen
        open
      "
    >
      <!-- LOGO DE LA EMPRESA -->
      <figure class="p-1 h-14 hidden lg:flex justify-center items-center my-2">
        <img src="@/static/images/favicon.png" alt="cepol-logo" />
      </figure>
      <!-- ICONOS DEL MENU -->
      <div
        class="
          w-full
          flex flex-row
          justify-evenly
          items-center
          lg:flex-col
          xl:items-start
          lg:divide-x-0
          divide-secondary
        "
      >
        <button
          v-for="(item, i) in menu"
          :key="i"
          class="
            w-8
            lg:w-1/2 lg:h-14 lg:mb-4
            xl:w-full
            flex
            justify-center
            xl:justify-start xl:pl-3
            items-center
            my-auto
            mx-auto
            text-secondary
            align-sidebar
          "
          @click="redirection(item.link)"
        >
          <div class="w-full lg:w-6 xl:w-8 xl:mr-3 icons">
            <c-icon :name="item.icon" />
          </div>
          <p
            class="text-secondary text-base font-semibold hidden xl:block words"
          >
            {{ item.name }}
          </p>
        </button>
      </div>
    </div>
    <!-- CONTENT -->
    <div
      class="
        w-full
        flex-grow
        justify-center
        items-center
        max-w-screen-xl
        py-2
        px-3
      "
    >
      <nuxt class="bg-gray-200" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('fireAuthentication', ['user']),
    menu() {
      let menuItems = [
        { icon: 'dashboard', link: 'dashboard', name: 'Dashboard' },
        { icon: 'simulador', link: 'simulador', name: 'Simulador' },
        { icon: 'account', link: 'profile', name: 'Perfil' },
      ]
      if (this.userRole === 'admin') {
        let menuItems = [
          { icon: 'dashboard', link: 'dashboard', name: 'Dashboard' },
          { icon: 'instructor', link: 'instructors', name: 'Instructores' },
          { icon: 'post', link: 'blog', name: 'Blog' },
          { icon: 'account', link: 'profile', name: 'Perfil' },
        ]
        return menuItems
      } else if (this.userRole === 'instructor') {
        let menuItems = [
          { icon: 'newLesson', link: 'questions', name: 'Crear preguntas' },
          // { icon: 'simulador', link: 'simulador', name: 'Simulador' },
          { icon: 'account', link: 'profile', name: 'Perfil' },
        ]
        return menuItems
      }
      return menuItems
    },
    userRole() {
      const role = this.isUserRole(this.user)
      return role
    },
  },
  watch: {
    user(value) {
      if (value !== undefined && value !== null && user.role.student) {
        this.$router.push('/student/dashboard')
      } else if (value !== undefined && value !== null && user.role.instructor) {
        this.$router.push('/instructor/questions')
      } else if (value !== undefined && value !== null && user.role.admin) {
        this.$router.push('/admin/dashboard')
      }
      else {
        this.$router.push('/')
      }
    },
  },
  methods: {
    redirection(link) {
      this.$router.push(link)
    },
    isUserRole(user) {
      if (user.role.student) {
        return 'student'
      } else if (user.role.admin) {
        return 'admin'
      } else {
        return 'instructor'
      }
    },
  },
}
</script>

<style scoped>
@media only screen and (min-width: 1024px) {
  .open:hover {
    width: 256px;
  }

  .open:hover .words {
    display: flex;
  }

  .open:hover .align-sidebar {
    justify-content: start;
    width: 80%;
  }

  .open:hover .icons {
    margin-right: 0.75rem;
  }
}
</style>
