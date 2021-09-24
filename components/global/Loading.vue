<template>
  <div v-if="loading" class="w-full">
    <half-circle-spinner
      :animation-duration="1000"
      :size="60"
      :color="'#013F66'"
    />
  </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  components: {
    HalfCircleSpinner
  }
}
</script>