<template>
  <div class="w-full bg-gradient-to-tr from-white to-secondary">
    <div class="w-full max-w-screen-2xl mx-auto">
      <div class="w-full">
        <the-map />
      </div>
      <div class="w-full relative lg:w-10/12 mx-auto">
        <div
          class="
            w-full
            absolute
            flex flex-wrap
            justify-center
            items-center
            bg-green-50
            rounded-lg
            shadow-md
            bottom-1
          "
        >
          <div class="w-full lg:w-3/4 py-3 px-4"></div>
          <div class="w-full lg:w-1/4 bg-primary py-3 px-4 rounded-r-lg">
            <p class="text-2xl font-semibold mb-2 text-green-600">Envianos un correo</p>
            <div class="w-full flex justify-center item-center px-2">
              <div class="w-2/5 flex justify-center items-center">
                <div class="bg-gray-200 h-px w-full"></div>
              </div>
              <p class="text-gray-200 text-center w-1/5">o</p>
              <div class="w-2/5 flex justify-center items-center">
                <div class="bg-gray-200 h-px w-full"></div>
              </div>
            </div>
            <p class="text-gray-100 text-lg font-semibold mt-4">Síguenos</p>
            <div
              v-for="(icon, i) in icons"
              :key="i"
              class="mt-1 flex justify-center items-center flex-wrap"
            >
              <button
                class="w-5 h-5 flex justify-center items-center"
                @click="redirectionToSocialMedia(link)"
              >
                <c-icon :name="icon.name" class="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    icons: [
      { name: 'facebook', link: '' },
      { name: 'instagram', link: '' },
      { name: 'whatsapp', link: '' },
    ],
  }),
  methods: {
    redirectionToSocialMedia(link) {
      window.open(link, '_blank')
    },
  },
}
</script>
