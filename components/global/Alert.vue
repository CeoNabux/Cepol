<template>
  <button
    class="w-full rounded border border-pink-600 bg-pink-300 py-2 px-3"
    @click="onClose"
  >
    <p class="text-sm font-semibold text-pink-600">
      Oooops ha ocurrido un error
    </p>
  </button>
</template>

<script>
export default {
  methods: {
    onClose() {
      this.$emit('dismissed')
    },
  },
}
</script>
