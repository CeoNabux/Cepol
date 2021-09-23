<template>
  <div class="w-full">
    <atom-spinner
      :animation-duration="1000"
      :size="60"
      :color="'#013F66'"
    />
  </div>
</template>

<script>
import { AtomSpinner } from 'epic-spinners'

export default {
  components: {
    AtomSpinner
  }
}
</script>