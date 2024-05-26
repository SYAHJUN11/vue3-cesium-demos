<template>
  <div class="ol-map" ref="mapRef"></div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { fromLonLat } from 'ol/proj'
import { useMap } from '../hooks/useMap'
import { useTdtImageLayers } from '../hooks/useBaseLayers'

const emits = defineEmits(['init-finished'])

const mapRef = ref()
const mapOptions = reactive({
  baseLayers: null as any,
  center: fromLonLat([104.06, 30.67]), // 成都
  zoom: 10, // 设置初始化时的地图缩放层级
  projection: 'EPSG:3857', // 坐标系
  maxZoom: 18, // 最大缩放层级
  minZoom: 4, // 最小缩放层级
})

onMounted(() => {
  initMap()
})

/**
 * 初始化地图
 */
function initMap() {
  mapOptions.baseLayers = useTdtImageLayers()
  const map = useMap(mapRef.value, mapOptions)

  emits('init-finished', map)
}
</script>

<style lang="less" scoped>
.ol-map {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>