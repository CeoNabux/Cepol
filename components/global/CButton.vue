<template>
  <button class="w-full text-white text-xl rounded-xl font-semibold">
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