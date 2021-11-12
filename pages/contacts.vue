<template>
  <div class="w-full bg-gradient-to-tr from-white to-secondary">
    <div class="w-full max-w-screen-2xl mx-auto relative">
      <div
        v-if="loading"
        class="
          absolute
          w-1/3
          h-44
          top-1/3
          left-1/3
          border border-gray-300
          bg-white
          flex
          justify-center
          items-center
          shadow-md
          rounded-md
          z-10
        "
      >
        <loading :loading="loading" />
      </div>
      <div
        v-if="emailSent"
        class="
          absolute
          w-1/3
          h-44
          top-1/3
          left-1/3
          border border-gray-300
          bg-white
          flex
          justify-center
          items-center
          shadow-md
          rounded-md
          z-10
        "
      >
        <p class="text-lg text-primary text-center w-full">
          Mensaje Enviado
        </p>
      </div>
      <div class="w-full">
        <the-map />
      </div>
      <div class="w-full relative h-64 lg:w-10/12 mx-auto">
        <div
          class="
            w-full
            absolute
            flex flex-wrap-reverse
            justify-center
            bg-green-50
            rounded-lg
            shadow-md
            bottom-16
          "
        >
          <div class="w-full lg:w-3/4 py-3 px-4">
            <form action="">
              <div class="w-full flex flex-col">
                <label for="" class="textg-sm text-secondary text-medium">
                  Nombre
                </label>
                <input
                  v-model="name"
                  type="text"
                  class="
                    w-full
                    md:w-3/4
                    lg:w-1/2
                    px-2
                    py-1
                    border-b border-secondary
                  "
                />
              </div>
              <div class="w-full flex flex-col mt-2">
                <label for="" class="textg-sm text-secondary text-medium">
                  Correo
                </label>
                <input
                  v-model="email"
                  type="email"
                  class="
                    w-full
                    md:w-3/4
                    lg:w-1/2
                    px-2
                    py-1
                    border-b border-secondary
                  "
                />
              </div>
              <div class="w-full flex flex-col mt-2">
                <label for="" class="textg-sm text-secondary text-medium">
                  Mensaje
                </label>
                <textarea
                  v-model="message"
                  type="text"
                  class="
                    w-full
                    md:w-3/4
                    lg:w-1/2
                    px-2
                    py-1
                    border-b border-secondary
                  "
                />
              </div>
            </form>
            <div class="w-full lg:w-1/2 mt-4">
              <c-button
                name="Enviar"
                class="text-white"
                :disabled="!formIsValid"
                :class="{
                  'bg-secondary': formIsValid,
                  'bg-gray-300': !formIsValid,
                }"
                @click="sendMail"
              />
            </div>
          </div>
          <div
            class="
              w-full
              lg:w-1/4
              bg-primary
              py-3
              px-4
              rounded-t-lg
              lg:rounded-r-lg
            "
          >
            <p class="text-2xl font-semibold mb-2 text-green-600">
              Envianos un correo
            </p>
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
import emailjs from 'emailjs-com'
import CButton from '~/components/global/CButton.vue'
export default {
  components: { CButton },
  data: () => ({
    name: '',
    email: '',
    message: '',
    loading: false,
    emailSent: false,
    icons: [
      { name: 'facebook', link: 'https://wa.link/4c88ug' },
      { name: 'instagram', link: 'https://www.instagram.com/cepolsa/' },
      { name: 'whatsapp', link: 'https://www.facebook.com/centro.cepol' },
    ],
  }),
  computed: {
    formIsValid() {
      return this.name && this.email && this.message
    },
  },
  methods: {
    redirectionToSocialMedia(link) {
      window.open(link, '_blank')
    },
    resetFieldsForm() {
      this.name = ''
      this.email = ''
      this.message = ''
    },
    async sendMail() {
      this.loading = true
      const params = {
        to_name: 'Cepol',
        from_name: this.name,
        reply_to: this.email,
        message: this.message,
      }
      try {
        await emailjs.send(
          'service_7qnslkc',
          'template_knzxxzh',
          params,
          'user_bzk4OXg1GFi5EG8cNALdG'
        )
        this.loading = false
        this.resetFieldsForm()
        this.emailSent = true
        setTimeout(() => (this.emailSent = false), 1000)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
