<template>
  <div class="w-full my-16">
    <div
      class="relative w-full mx-auto bg-image py-36"
      :style="{ backgroundImage: 'url(' + bgImage + ')' }"
    >
      <div class="w-full relative my-12">
        <div class="flex flex-wrap justify-evenly items-center">
          <div class="w-full lg:w-1/2 pl-8">
            <h2
              class="
                mx-auto
                w-full
                text-primary text-left
                font-semibold
                text-4xl
              "
            >
              Escuelas en Producción
            </h2>
            <p class="mx-auto w-full text-primary text-xl text-left mt-4 mb-16">
              Estamos innovando en nuevas formas de acelerar tu nuevo futuro
              profesiona en esta era digital
            </p>
          </div>
          <div class="w-full lg:w-1/2 flex justify-center items-center">
            <div class="grid grid-cols-2 gap-4">
              <div class="flex justify-end items-center">
                <div
                  class="
                    bg-white
                    flex flex-col
                    justify-center
                    items-center
                    w-32
                    h-32
                    sm:w-60 sm:h-60
                    rounded-l-3xl rounded-tr-3xl
                  "
                >
                  <img
                    src="@/static/images/illustrations/development.png"
                    alt="cepol-schools"
                  />
                  <p class="text-secondary text-sm md:text-base">
                    Desarrollo web
                  </p>
                </div>
              </div>
              <div class="flex justify-start items-end">
                <div
                  class="
                    bg-white
                    flex flex-col
                    justify-center
                    items-center
                    w-24
                    h-24
                    sm:w-36 sm:h-36
                    rounded-r-3xl rounded-tl-3xl
                  "
                >
                  <img
                    src="@/static/images/illustrations/design.png"
                    alt="cepol-schools"
                  />
                  <p class="text-secondary text-sm md:text-base">
                    Diseño gráfico
                  </p>
                </div>
              </div>
              <div class="flex justify-end items-center">
                <div
                  class="
                    bg-white
                    flex flex-col
                    justify-center
                    items-center
                    w-24
                    h-24
                    sm:w-36 sm:h-36
                    rounded-l-3xl rounded-br-3xl
                  "
                >
                  <div class="w-9 md:w-full flex justify-center items-center">
                    <img
                      src="@/static/images/illustrations/marketing.png"
                      alt="cepol-schools"
                    />
                  </div>
                  <p class="text-secondary text-xs text-center md:text-base">
                    Growth marketing
                  </p>
                </div>
              </div>
              <div class="flex justify-start items-center">
                <div
                  class="
                    bg-white
                    flex flex-col
                    justify-center
                    items-center
                    w-24
                    h-24
                    sm:w-36 sm:h-36
                    rounded-r-3xl rounded-br-3xl
                  "
                >
                  <div class="w-9 md:w-full flex justify-center items-center">
                    <img
                      src="@/static/images/illustrations/math.png"
                      alt="cepol-schools"
                    />
                  </div>
                  <p class="text-secondary text-xs text-center md:text-base">
                    Formación básica
                  </p>
                </div>
              </div>
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
    bgImage: require('@/static/images/illustrations/the-schools.png'),
  }),
}
</script>

<style scoped>
.bg-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
