<template>
	<div class="map-view">
		<!-- 地图 -->
		<cesium-map :viewer-config="viewerConfig" @init-finished="initFinished" />
		<div class="map-top-tools-wrapper">
			<map-top-tools />
			<a-button @click="add3DTileData">加载3D Tiles</a-button>
			<a-button>移除3D Tiles</a-button>
		</div>
		<!-- 地图工具 -->
		<div class="map-bottom-tools-wrapper">
			<map-bottom-tools />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Viewer, ImageryLayer, Cesium3DTileset, Cartesian3 } from 'cesium'
import * as Cesium from 'cesium'
import { add3DTileset } from './hooks/useLayers.ts'
import CesiumMap from '@/components/cesium-map'
import type { IViewer } from '@/components/cesium-map/types/index.js'
import MapBottomTools from './components/map-bottom-tools/Index.vue'
import MapTopTools from './components/map-top-tools/Index.vue'
import { useMapStore } from './store/map.ts'

const mapStore = useMapStore()

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
	// mapProjection : new WebMercatorProjection()
}

/**
 * 地图加载完成后的回调
 * @param viewer 
 * @param baseLayers 
 */
function initFinished(viewer: Viewer, baseLayers: {
	imageLayers: ImageryLayer[],
	vectorLayers: ImageryLayer[]
}) {
	// viewer.camera.flyTo({
	// 	destination: Cartesian3.fromDegrees(104.06, 30.67, 1500),
	// 	orientation: {
	// 		heading: Cesium.Math.toRadians(0),
	// 		pitch: Cesium.Math.toRadians(-90),
	// 		roll: 0,
	// 	}
	// })
	mapStore.viewerInstance = viewer
	mapStore.baseLayers = baseLayers
}

async function add3DTileData() {
	const viewer = mapStore.viewerInstance
	const translation = Cartesian3.fromArray([0, 0, -30])
	const m = Cesium.Matrix4.fromTranslation(translation)
	add3DTileset('http://data.mars3d.cn/3dtiles/max-fsdzm/tileset.json', {
		modelMatrix: m
	}).then((tileset) => {
		viewer?.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0))
		console.log('tileset', tileset)
	})
}
</script>

<style lang="less" scoped>
.map-view {
	position: relative;
  width: 100%;
  height: 100%;
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