<template>
  <div class="cesium-map" ref="mapRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { type IViewer } from '../types'
import { useViewer } from '../hooks/useViewer'
import { useBaseLayer } from '../hooks/useBaseLayer'

const $emits = defineEmits(['init-finished'])

/**
 * 变量
 */
const viewerConfig: IViewer = {
  animation: false, //是否显示动画控件
  baseLayerPicker: false, //是否显示图层选择控件
  fullscreenButton: false, //是否显示全屏按钮
  vrButton: false, // vr部件
  geocoder: false, // 位置搜索部件
  homeButton: false, //是否显示Home按钮
  infoBox: false, //是否显示点击要素之后显示的信息
  sceneModePicker: false, // 二三维切换部件
  timeline: false, //是否显示时间线控件
  navigationHelpButton: false, //是否显示帮助信息控件
  selectionIndicator: false, //是否显示点击要素之后显示的信息
}
const mapRef = ref()

onMounted(() => {
  initViewer()
})

/**
 * 初始化地图
 */
function initViewer(): void {
  const viewer = useViewer(mapRef.value, viewerConfig)
  const baseLayers = useBaseLayer()

  viewer.imageryLayers.add(baseLayers.imageLayers[0])
  viewer.imageryLayers.add(baseLayers.imageLayers[1])

  viewer.imageryLayers.add(baseLayers.vectorLayers[0])
  viewer.imageryLayers.add(baseLayers.vectorLayers[1])

  baseLayers.vectorLayers[0].show = false
  baseLayers.vectorLayers[1].show = false

  $emits('init-finished', viewer, baseLayers)
}
</script>

<style lang="less" scoped>
.cesium-map {
  position: relative;
  width: 100%;
  height: 100%;
  :deep(.cesium-viewer-bottom) {
    display: none;
  }
}
</style>