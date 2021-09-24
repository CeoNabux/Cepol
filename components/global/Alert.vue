<template>
  <button
    class="w-full flex justify-between rounded border border-pink-600 bg-pink-300 py-2 px-3"
    @click="onClose"
    :value="true"
  >
    <p class="text-sm font-semibold text-pink-600">
      {{ text }}
    </p>
    <div class="w-6 h-6 text-pink-600 ml-4">
      <c-icon name="close" />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: null
    }
  },
  methods: {
    onClose() {
      this.$emit('dismissed')
    },
  },
}
</script>
