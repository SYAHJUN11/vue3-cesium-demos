<template>
  <div class="my-2d-map">
    <!-- 地图 -->
    <ol-map @init-finished="initFinished" />
    <!-- 地图工具 -->
    <div class="map-bottom-tools-wrapper">
      <map-bottom-tools />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Map } from 'ol'
import OlMap from '@/components/ol-map'
import { useMapStore } from './store/mapStore'
import MapBottomTools from './components/map-bottom-tools/Index.vue'

function initFinished(map: Map) {
  const mapStore = useMapStore()
  mapStore.mapInstance = map
}
</script>

<style lang="less" scoped>
.my-2d-map {
  position: relative;
  width: 100%;
  height: 100vh;
  .map-bottom-tools-wrapper {
    position: absolute;
    bottom: 12px;
    right: 12px;
    z-index: 2;
  }
}
</style>