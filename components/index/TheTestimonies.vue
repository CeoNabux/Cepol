<template>
  <div class="w-full mt-16 pt-16">
    <div class="w-full relative">
      <svg
        width="1280"
        height="622"
        viewBox="0 0 1280 622"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full absolute top-0 left-0"
      >
        <path
          d="M-59.6644 18.8359C296.431 -121.236 680.048 583.709 1285.34 44.4567C1285.34 44.4567 1708.25 891.558 1220.34 533.934C732.426 176.31 408.055 535.257 -59.6644 533.934C-527.384 532.611 -415.759 158.908 -59.6644 18.8359Z"
          fill="#6DA548"
        />
      </svg>
      <div class="w-full relative py-12">
        <h2 class="text-gray-800 text-center font-semibold text-4xl">
          Testimonios de nuestros estudiantes
        </h2>
        <p class="text-gray-800 text-xl text-center mt-4 mb-16">
          CEPOL a través de los ojos de nuestros estudiantes
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
            <swiper-slide v-for="(testimony, i) in array" :key="i" class="w-full md:w-3/4">
              <testimoni-card
                :name="testimony.name"
                :testimony="testimony.testimony"
                :image="testimony.image"
              />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import TestimoniCard from '../cards/TestimoniCard.vue'
export default {
  props: {
    array: {
      type: Array,
      required: true,
    },
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
  components: {
    Swiper,
    SwiperSlide,
    TestimoniCard,
  },
}
</script>

<style scoped>
.swiper-slide {
  width: 80%;
}
</style>
