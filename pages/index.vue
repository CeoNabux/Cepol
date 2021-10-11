<template>
  <div class="bg-gradient-to-tr from-white to-secondary">
    <div class="w-full ">
      <the-hero />
      <the-services />
      <dev-courses />
    </div>
  </div>
</template>

<script>
import TheHero from '@/components/index/TheHero.vue'
import TheServices from '~/components/index/TheServices.vue'
import DevCourses from '~/components/index/DevCourses.vue'
export default {
  layout: 'default',
  components: {
    TheHero,
    DevCourses,
    TheServices,
  },
}
</script>