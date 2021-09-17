<template>
  <button class="w-full text-white text-base rounded-xl font-medium py-2" @click="$emit('click', $event)">
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