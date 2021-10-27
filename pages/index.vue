<template>
  <div class="bg-gradient-to-tr from-white to-secondary">
    <div class="w-full max-w-screen-2xl mx-auto">
      <the-hero />
      <the-services />
      <the-testimonies :array="studentsTestimonies" />
      <the-blog-section :array="getPosts" />
      <the-schools />
      <!-- <the-contact-section /> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheHero from '@/components/index/TheHero.vue'
import TheSchools from '@/components/index/TheSchools.vue'
import TheServices from '~/components/index/TheServices.vue'
import TheTestimonies from '~/components/index/TheTestimonies.vue'
import TheBlogSection from '~/components/index/TheBlogSection.vue'
import TheContactSection from '~/components/index/TheContactSection.vue'
export default {
  layout: 'default',
  components: {
    TheHero,
    TheSchools,
    TheTestimonies,
    TheServices,
    TheBlogSection,
    TheContactSection,
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
  computed: {
    ...mapGetters('fireBlogs', ['getPosts'])
  },
  created() {
    this.fetchPosts()
  },
  methods: {
    ...mapActions('fireBlogs', ['fetchPosts'])
  }
}
</script>
