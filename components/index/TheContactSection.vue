<template>
  <div class="w-full bg-gray-800">
    <div class="flex flex-col justify-between items-start py-12">
      <div class="w-full">
        <the-map />
      </div>
    </div>
  </div>
</template>

<script>
import TheMap from '@/components/global/TheMap.vue'
export default {
  components: {
    TheMap
  }
}
</script>