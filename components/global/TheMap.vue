<template>
  <div class="w-full max-h-lg">
    <GmapMap
      :center="{ lat: -2.23212, lng: -79.89662 }"
      :zoom="13"
      style="width: 100%; height: 460px"
      class="mx-auto z-0"
      :options="mapStyle"
    >
      <GmapMarker
        :position="{ lat: -2.23212, lng: -79.89662 }"
        :clickable="true"
        :draggable="true"
        title="Nombre de la empresa"
        label="R"
      />

      // ubicacion
      <GmapMarker
        v-if="coordinates"
        :position="coordinates"
        :clickable="true"
        :draggable="true"
        title="Nombre de la empresa"
        label="R"
      />
    </GmapMap>
  </div>
</template>

<script>
import { darkMode } from '~/helpers/maps.js'
export default {
  name: 'TheMap',
  created() {
    this.$getLocation({}).then(({ lat, lng }) => {
      console.log(lat, lng)
      this.coordinates = {
        lat,
        lng,
      }
    })
  },
  data: () => ({
    mapStyle: {
      styles: darkMode,
      mapTypeControlOptions: { mapTypeIds: [] },
    },
    coordinates: null,
  }),
}
</script>
