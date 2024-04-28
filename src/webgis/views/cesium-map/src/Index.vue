<template>
  <div class="cesium-map" id="mapContainer">
    {{ map }}
  </div>
</template>

<script lang="ts" setup>
import { IMap } from '../types'

const map: IMap = {
  animation: false,
  baseLayerPicker: false,
  fullscreenButton: false,
  vrButton: false,
}

console.log('map', map)
</script>

<style lang="less" scoped>
.cesium-map {
  width: 100%;
  height: 100%;
}
</style>