<template>
  <div class="w-full relative">
    <!-- ESTE ES EL CARGANDO -->
    <div
      v-if="getLoading"
      class="
        py-4
        px-2
        w-40
        h-48
        sm:w-64
        sm:h-48
        absolute
        z-10
        bg-white
        shadow-lg
        rounded-lg
        top-1/2
        left-1/3
        sm:left-1/3
        flex
        flex-col
        justify-between
        items-center
      "
    >
      <p class="text-xl text-primary font-medium text-center">
        Guardando
      </p>
      <loading :loading="getLoading" />
    </div>
    <!-- CONTENEDOR PRINCIPAL DE LA VISTA -->
    <div
      class="
        relative
        px-6
        py-2
        border border-gray-400
        rounded-lg
        shadow
        bg-white
      "
    >
      <!-- ESTA ES LA PANTALLA CON LOS FORMULARIOS -->
      <div class="w-full flex justify-end items-center">
        <div class="w-32">
          <c-button
            name="Cerrar Sessión"
            @click="signOut"
            class="bg-pink-700"
          />
        </div>
      </div>
      <h1 class="text-4xl text-gray-700 font-semibold">Ingresa tus datos</h1>
      <form class="bg-gray-50 shadow my-6 w-full lg:w-1/2 py-6 px-2">
        <div class="flex flex-col mt-4">
          <label class="text-lg font-medium text-gray-800 mb-2"> Nombre </label>
          <input
            v-model="name"
            type="text"
            class="
              py-1
              px-2
              border border-gray-400
              rounded
              focus:border-secondary
            "
          />
        </div>
        <div class="flex flex-col mt-4">
          <label class="text-lg font-medium text-gray-800 mb-2">
            Apellido
          </label>
          <input
            v-model="lastname"
            type="text"
            class="
              py-1
              px-2
              border border-gray-400
              rounded
              focus:border-secondary
            "
          />
        </div>
        <div class="flex flex-col mt-4">
          <label class="text-lg font-medium text-gray-800 mb-2"
            >Cumpleaños
          </label>
          <input
            v-model="birthday"
            type="date"
            class="
              py-1
              px-2
              border border-gray-400
              rounded
              focus:border-secondary
            "
          />
        </div>
      </form>
      <div class="w-32 px-2 py-1">
        <c-button name="Guardar" @click="saveDataUser" class="bg-secondary" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from './global/Loading.vue'
export default {
  components: { Loading },
  data: () => ({
    name: '',
    lastname: '',
    birthday: null,
  }),
  computed: {
    ...mapGetters('fireAuthentication', ['user']),
    ...mapGetters('fireUsers', ['getUserData', 'getLoading']),
  },
  mounted() {
    this.fetchUserData(this.user)
    this.updateData()
  },
  methods: {
    ...mapActions('fireAuthentication', ['signUserOut']),
    ...mapActions('fireUsers', ['uploadUserData', 'fetchUserData']),
    signOut() {
      this.signUserOut()
    },
    updateData() {
      ;(this.name = this.getUserData.name),
        (this.lastname = this.getUserData.lastname),
        (this.birthday = this.getUserData.birthdate)
    },
    saveDataUser() {
      const today = new Date()
      const birthday = new Date(this.birthday)
      const age = today.getFullYear() - birthday.getFullYear()
      const month = today.getMonth() - birthday.getMonth()
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      const userData = {
        name: this.name,
        lastname: this.lastname,
        age: age,
        id: this.user.id,
        birthdate: this.birthday,
      }
      this.uploadUserData(userData)
    },
  },
}
</script>
