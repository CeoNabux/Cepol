<template>
  <div class="w-full mt-16 mb-12">
    <h2 class="text-gray-800 text-center font-semibold text-4xl">
      Nuestro blog
    </h2>
    <p
      class="
        text-gray-800
        w-full
        md:w-1/2
        text-xl text-center
        mt-4
        mb-16
        mx-auto
      "
    >
      Una invitación de seguimiento a CEPOL a travé de la visualización de los
      posts publicados
    </p>
    <div class="mt-10 py-10 w-3/4 lg:w-1/2 mx-auto">
      <swiper
        class="swiper pl-6"
        :options="swiperOption"
        :auto-update="true"
        :auto-destroy="true"
        :delete-instance-on-destroy="true"
        :cleanup-styles-on-destroy="true"
      >
        <swiper-slide
          v-for="(post, i) in array"
          :key="i"
          class="w-full md:w-3/4"
        >
          <post-preview
            :title="post.title"
            :abstract="post.abstract"
            :image="post.image"
          />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import SwiperClass, {
  Navigation,
  Pagination /* add some modules if you need */,
} from 'swiper'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import PostPreview from '@/components/cards/PostPreview.vue'
SwiperClass.use([Navigation, Pagination])

export default {
  props: {
    array: {
      type: Array,
      required: true,
    },
  },
  components: {
    PostPreview,
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  data: () => ({
    swiperOption: {
      slidesPerView: 'auto',
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    },
  }),
}
</script>

<style scoped>
.swiper-slide {
  width: 80%;
}
</style>
