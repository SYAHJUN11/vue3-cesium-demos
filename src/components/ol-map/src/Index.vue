<template>
  <div class="ol-map" ref="mapRef">

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { fromLonLat } from 'ol/proj'
import { Tile as TileLayer } from 'ol/layer'
import XYZ from 'ol/source/XYZ'
import { useMap } from '../hooks/useMap'

const emits = defineEmits(['init-finished'])

const mapRef = ref()
const mapOptions = reactive({
  baseLayer: new TileLayer({
    source: new XYZ({
      url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
    }),
  }),
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