<template>
  <div class="bg-gradient-to-tr from-white to-secondary">
    <div class="w-full max-w-screen-2xl mx-auto">
      <the-hero />
      <the-services />
      <the-testimonies :array="studentsTestimonies" />
    </div>
  </div>
</template>

<script>
import TheHero from '@/components/index/TheHero.vue'
import TheServices from '~/components/index/TheServices.vue'
import TheTestimonies from '~/components/index/TheTestimonies.vue'
export default {
  layout: 'default',
  components: {
    TheHero,
    TheTestimonies,
    TheServices,
  },
  data: () => ({
    studentsTestimonies: [
      {
        name: 'Luis',
        testimony: 'Esta es una descripcion de lo bien que la pase dentro de la academia de cepol',
        image: require('@/static/images/people/chico-hero-cepol.png')
      },
      {
        name: 'Luis',
        testimony: 'Esta es una descripcion de lo bien que la pase dentro de la academia de cepol',
        image: require('@/static/images/people/chico-hero-cepol.png')
      },
    ],
  }),
}
</script>
