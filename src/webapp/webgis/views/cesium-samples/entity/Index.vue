<template>
	<div class="map-view">
		<!-- 地图 -->
		<cesium-map :viewer-config="viewerConfig" @init-finished="initFinished" />
	</div>
</template>

<script lang="ts" setup>
import * as Cesium from 'cesium'
import CesiumMap from '@/components/cesium-map'
import type { IViewer } from '@/components/cesium-map/types/index.js'
import { useMapStore } from './store/map.ts'

const mapStore = useMapStore()

const viewerConfig: IViewer = {
	animation: true, //是否显示动画控件
	timeline: true, //是否显示时间线控件
	baseLayerPicker: false, //是否显示图层选择控件
	fullscreenButton: false, //是否显示全屏按钮
	vrButton: false, // vr部件
	geocoder: false, // 位置搜索部件
	homeButton: false, //是否显示Home按钮
	infoBox: false, //是否显示点击要素之后显示的信息
	sceneModePicker: false, // 二三维切换部件
	navigationHelpButton: false, //是否显示帮助信息控件
	selectionIndicator: false, //是否显示点击要素之后显示的信息
	// mapProjection : new WebMercatorProjection()
}

/**
 * 地图加载完成后的回调
 * @param viewer 
 * @param baseLayers 
 */
function initFinished(viewer: Cesium.Viewer, baseLayers: {
	imageLayers: Cesium.ImageryLayer[],
	vectorLayers: Cesium.ImageryLayer[]
}) {
	mapStore.viewerInstance = viewer
	mapStore.baseLayers = baseLayers
}
</script>

<style lang="less" scoped>
.map-view {
	position: relative;
  width: 100%;
  height: 100vh;
}
</style>