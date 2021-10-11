<template>
  <div class="w-full mx-auto relative">
    <div
      class="
        w-full
        flex flex-wrap
        items-center
        justify-evenly
        pt-16
        pb-16
        px-4
        absolute
        z-10
      "
    >
      <!-- CONTENIDO -->
      <div class="flex flex-col w-full lg:w-2/5">
        <h1 class="w-full text-center lg:text-left text-5xl sm:text-6xl md:text-7xl text-gray-700 font-semibold">
          Prepárate para tu futuro
        </h1>
        <p class="w-3/4 text-center lg:text-left text-2xl text-blue-600 font-light my-12 leading-7 mx-auto lg:mx-0">
          Cepol busca ayudarte con las habilidades que necesitas para triunfar
          en tu vida profesional <span class="text-secondary leading-tight text-3xl font-semibold">.</span>
        </p>
        <button class="rounded bg-secondary p-4 w-full h-12 text-white flex justify-center items-center text-lg font-semibold">
          Este es un boton jaja
        </button>
      </div>
      <!-- IMAGEN -->
      <div class="w-full hidden lg:w-2/5 lg:flex justify-center items-center p-1">
        <div class="w-full flex justify-center items-center relative h-full">
          <figure class="w-full h-full flex items-center justify-center absolute top-7 left-0 z-0">
            <img src="@/static/images/svg/blob-blue.svg" alt="hero-cepol" class="w-full" />
          </figure>
          <figure class="w-full h-full flex items-center justify-center absolute top-0 left-0 z-10">
            <img src="@/static/images/svg/blob-green.svg" alt="hero-cepol" class="w-full"/>
          </figure>
          <figure class="w-full flex items-center justify-center z-20 mask">
            <img src="@/static/images/people/chico-hero-cepol.png" alt="hero-cepol" class="w-full" />
          </figure>
        </div>
      </div>
    </div>
    <!-- SHAPES DE FONDOS -->
    <div class="w-full relative z-0 shape-container">
      <div class="absolute top-10 right-5 triangle-left" />
      <div class="absolute bottom-0 left-2/4 triangle-down" />
      <div class="absolute bottom-0 right-80 pacman" />
      <div class="absolute top-56 right-28 donut" />
      <div class="absolute top-2/3 left-1/2 circle" />
      <div class="absolute top-1/3 right-1/2 triangle-left" />
      <div class="absolute top-10 left-5 donut" />
      <div class="absolute top-1/2 left-1/3 circle" />
      <div class="absolute bottom-2 left-1/4 pacman" />
      <!-- <div class="absolute top-10 left-5 triangle" /> -->
      <!-- <div class="absolute top-10 left-5 triangle" /> -->
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.shape-container {
  content: '';
  width: 100%;
  height: 600px;
}
.triangle-left {
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-right: 24px solid #013f66;
  border-bottom: 12px solid transparent;
}
.triangle-down {
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 24px solid #013f66;
}
.pacman {
  width: 0px;
  height: 0px;
  border-right: 8px solid transparent;
  border-top: 8px solid #013f66;
  border-left: 8px solid #013f66;
  border-bottom: 8px solid #013f66;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
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
.mask {
  clip-path: circle(49.2% at 47% 48%);
}
</style>
