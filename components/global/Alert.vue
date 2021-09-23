<template>
  <button class="w-full border border-pink-700 bg-pink-500 py-2 px-3" @click="onClose">
    <p class="text-sm font-semibold text-pink-700">
      Oooops ha ocurrido un error
    </p>
  </button>
</template>

<script>
export default {
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
}
</script>
