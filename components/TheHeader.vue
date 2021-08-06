<template>
  <div class="bg-white border-b border-primary">
    <div class="container max-w-screen-2xl mx-auto px-2 py-4">
      <div class="flex justify-between items-center">
        <figure class="w-24 flex justify-center items-center">
          <img src="@/static/images/logo-color.png" alt="cepol-logo" />
        </figure>
        <ul class="flex justify-between items-center w-1/3">
          <li class="text-xl font-semibold py-2 px-1 mx-2 text-primary rounded">Inicio</li>
          <li class="text-xl font-semibold py-2 px-1 mx-2 text-primary rounded">Servicios</li>
          <li class="text-xl font-semibold py-2 px-1 mx-2 text-primary rounded">Blog</li>
          <li class="text-xl font-semibold py-2 px-1 mx-2 text-primary rounded">Contáctos</li>
        </ul>
        <div class="flex justify-between items-center w-96">
          <c-button name="Inicia Sesión" class="border-2 border-secondary text-secondary mx-2" />
          <c-button name="Registro" class="bg-secondary" />
        </div>
      </div>
    </div>
  </div>
</template>

