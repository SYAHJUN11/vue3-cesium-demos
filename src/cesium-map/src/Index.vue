<template>
  <div class="cesium-map" ref="mapRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { type IViewer } from '../types'
import { initCesiumViewer } from '../hooks/useViewer'

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
  const viewer = initCesiumViewer(mapRef.value, viewerConfig)
  $emits('init-finished', viewer)
})
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