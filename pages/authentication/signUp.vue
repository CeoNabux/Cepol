<template>
  <div class="w-screen h-screen absolute top-0 left-0 bg-gray-600 z-50 flex justify-center items-center">
    <the-sign-up/>
  </div>
</template>

<script>
import TheSignUp from '/components/modals/TheSignUp.vue'
export default {
  components: {
    TheSignUp
  }
}
</script>