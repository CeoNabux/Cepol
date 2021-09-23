<template>
  <div class="flex flex-col-reverse lg:flex-row h-screen">
    <!-- SIDEBBAR -->
    <div
      class="
        w-full
        lg:w-16
        xl:w-64
        py-4
        px-4
        lg:px-0
        lg:py-0
        flex flex-row
        lg:flex-col
        justify-start
        items-center
        border-t border-secondary
        lg:border-secondary lg:border-r
        lg:rounded-r-xl rounded
        shadow-md
        lg:divide-y
        divide-secondary
      "
    >
      <!-- LOGO DE LA EMPRESA -->
      <figure class="p-1 h-14 hidden lg:flex justify-center items-center">
        <img src="@/static/images/favicon.png" alt="cepol-logo" />
      </figure>
      <!-- ICONOS DEL MENU -->
      <div class="flex flex-row lg:flex-col divide-x divide-secondary">
        <button class="w-8 lg:w-1/2 lg:h-14 lg:mb-4 flex justify-center items-center my-auto mx-auto text-secondary">
          <c-icon name="account" />
          <p class="text-secondary text-lg font-light hidden xl:block">
            Perfil jaja
          </p>
        </button>
      </div>
    </div>
    <!-- CONTENT -->
    <div class="w-full flex-grow justify-center items-center">
      <nuxt />
    </div>
  </div>
</template>
