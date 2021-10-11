<template>
  <div>
    <section class="relative w-full">
      <div class="w-full h-full relative z-0">
        <div class="donut absolute top-3 left-6" />
        <div class="circle absolute bottom-3 right-6" />
        <div class="triangle-left absolute right-10 top-16" />
      </div>
      <div class="w-full pt-10">
        <h2 class="mb-6 text-gray-800 text-center font-semibold text-4xl">
          Modalidades de aprendizaje
        </h2>
        <div class="w-full">
          <!-- SECCION DE CLASES EN LINEA -->
          <div class="flex flex-wrap justify-center items-center w-full">
            <div class="w-full lg:w-2/5">
              <p class="text-3xl text-secondary font-semibold">Síncrono</p>
              <p class="text-xl font-light mt-2 mb-8">
                Clases con horario establecido
              </p>
              <div class="w-full lg:w-2/3">
                <c-button name="Saber por clases síncronas" class="bg-primary" />
              </div>
            </div>
            <!-- SECCION DE ILUSTRACIONES DE CLASES PRESENCIALES -->
            <div class="w-full lg:w-2/5 flex justify-evenly items-center">
              <div class="w-full lg:w-48">
                <figure
                  class="
                    h-52
                    w-full
                    border border-primary
                    rounded-lg
                    p-1
                    flex flex-col
                    justify-between
                    items-center
                  "
                >
                  <img
                    src="@/static/images/illustrations/clases-presenciales.png"
                    alt="clases-presenciales"
                  />
                  <div class="w-full">
                    <p class="text-base font-semibold text-center">
                      Clases presenciales
                    </p>
                    <p class="text-sm font-light text-center">Academia</p>
                  </div>
                </figure>
              </div>
              <div class="w-full lg:w-48">
                <figure
                  class="
                    h-52
                    w-full
                    border border-primary
                    rounded-lg
                    p-1
                    flex flex-col
                    justify-between
                    items-center
                  "
                >
                  <img
                    src="@/static/images/illustrations/clases-zoom.png"
                    class="h-3/4 mx-auto"
                    alt="clases-zoom"
                  />
                  <div class="w-full ">
                    <p class="text-base font-semibold text-center">
                      Clases virtuales
                    </p>
                    <p class="text-sm font-light text-center">Zoom</p>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <!-- SECCION EN CLASES EN LINEA -->
          <div
            class="
              flex flex-row-reverse
              mt-28
              flex-wrap-reverse
              justify-center
              items-center
              w-full
            "
          >
            <div class="w-full lg:w-2/5">
              <p class="text-3xl text-secondary font-semibold">Asíncrono</p>
              <p class="text-xl font-light mt-2 mb-8">
                Clases cuando quieras, donde quieras
              </p>
              <div class="w-full lg:w-2/3">
                <c-button name="Saber por clases síncronas" class="bg-primary" />
              </div>
            </div>
            <!-- SECCION DE ILUSTRACIONES EN CLASES EN LINEA -->
            <div class="w-full lg:w-2/5 flex justify-start items-center">
              <div class="w-full lg:w-48 ml-3">
                <figure
                  class="
                    h-52
                    w-full
                    border border-primary
                    rounded-lg
                    p-1
                    flex flex-col
                    justify-between
                    items-center
                  "
                >
                  <img
                    src="@/static/images/illustrations/plataforma.png"
                    alt="clases-plataforma"
                  />
                  <div class="w-full">
                    <p class="text-base font-semibold text-center">
                      Clases grabadas
                    </p>
                    <p class="text-sm font-light text-center">Plataforma</p>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.donut {
  border: 2px solid #013f66;
  border-radius: 100%;
  width: 12px;
  height: 12px;
}
.circle {
  border-radius: 100%;
  width: 12px;
  height: 12px;
  background-color: #013f66;
}
.triangle-left {
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-right: 24px solid #013f66;
  border-bottom: 12px solid transparent;
}
</style>
