<template>
  <div>
    <div class="w-full bg-white shadow-lg rounded-lg py-2 px-4">
      <p class="text-xl text-gray-800 font-semibold">Simulador</p>
      <p class="text-base font-medium text-gray-800 w-full text-center">
        Tu tiempo restante
      </p>
      <div class="flex w-full justify-center mt-2">
        <div class="w-1/4 flex flex-col items-center">
          <p class="text-4xl font-semibold text-gray-800">00</p>
          Horas
        </div>
        <p class="w-1/12 text-4xl font-semibold text-gray-800">:</p>
        <div class="w-1/4 flex flex-col items-center">
          <p class="text-4xl font-semibold text-gray-800">00</p>
          Minutos
        </div>
        <p class="w-1/12 text-4xl font-semibold text-gray-800">:</p>
        <div class="w-1/4 flex flex-col items-center">
          <p class="text-4xl font-semibold text-gray-800">00</p>
          Segundos
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    _hours: ''
  })
}
</script>

