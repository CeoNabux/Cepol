<template>
  <div class="w-full">
    <div class="px-6 py-2 border border-gray-400 rounded-lg shadow bg-white">
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
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('fireAuthentication', ['signUserOut']),
    signOut() {
      this.signUserOut()
    }
  }
}
</script>
