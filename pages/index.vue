<template>
  <div>
    <div class="w-full">
      <the-hero />
    </div>
  </div>
</template>

<script>
import TheHero from '@/components/index/TheHero.vue'
export default {
  layout: 'default',
  components: {
    TheHero,
  },
}
</script>