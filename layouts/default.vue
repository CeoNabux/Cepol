<template>
  <div class="flex flex-col min-h-screen">
    <the-header />
    <Nuxt />
    <the-footer class="mt-auto" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('fireAuthentication', ['user'])
  }
}
</script>
