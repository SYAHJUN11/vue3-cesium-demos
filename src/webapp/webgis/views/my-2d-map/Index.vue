<template>
  <div class="my-2d-map">
    <!-- 地图 -->
    <ol-map @init-finished="initFinished" />
    <!-- 地图顶部工具 -->
    <div class="map-top-tools-wrapper">
        <map-top-tools />
    </div>
    <!-- 地图底部工具 -->
    <div class="map-bottom-tools-wrapper">
      <map-bottom-tools />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Map } from 'ol'
import OlMap from '@/components/ol-map'
import { useMapStore } from './store/mapStore'
import MapTopTools from './components/map-top-tools/Index.vue'
import MapBottomTools from './components/map-bottom-tools/Index.vue'

const mapStore = useMapStore()
function initFinished(map: Map) {
  mapStore.mapInstance = map
}
</script>

<style lang="less" scoped>
.my-2d-map {
  position: relative;
  width: 100%;
  height: 100vh;
  .map-top-tools-wrapper {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;
  }
  .map-bottom-tools-wrapper {
    position: absolute;
    bottom: 12px;
    right: 12px;
    z-index: 2;
  }
}
</style>