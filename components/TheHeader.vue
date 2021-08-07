<template>
  <div class="bg-white border-b border-primary">
    <div class="container max-w-screen-2xl mx-auto px-2 py-4">
      <div class="flex justify-between items-center">
        <figure class="w-24 flex justify-center items-center">
          <a href="/">
            <img src="@/static/images/logo-color.png" alt="cepol-logo" />
          </a>
        </figure>
        <ul class="flex justify-between items-center w-1/3">
          <li v-for="(item, i) in menu" :key="i" class="text-lg font-medium py-2 px-1 mx-2 text-primary rounded">
            <a :href="item.link">{{ item.name }}</a>
          </li>
        </ul>
        <div class="flex justify-between items-center w-64">
          <div class="px-1 w-1/2 flex justify-center items-center">
            <c-button
              name="Inicia Sesión"
              class="border-2 border-secondary text-secondary"
            />
          </div>
          <div class="px-1 w-1/2 flex justify-center items-center">
            <c-button
              name="Registro"
              class="bg-secondary text-white"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    menu: [
      {name: 'Inicio', link: '/'},
      {name: 'Blog', link: '/blog'},
      {name: 'Servicios', link: '/services'},
      {name: 'Contáctos', link: '/contacts'},
    ]
  })
}
</script>
