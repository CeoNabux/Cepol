<template>
  <button class="w-full text-white text-lg rounded-xl font-semibold py-2">
    {{name}}
  </button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>