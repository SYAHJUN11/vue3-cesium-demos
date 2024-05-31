<template>
	<div class="map-view">
		<!-- 地图 -->
		<cesium-map :viewer-config="viewerConfig" @init-finished="initFinished" />
		<div class="btns">
			<a-button @click="createModel('../../../sample-data/models/CesiumAir/Cesium_Air.glb', 1000)">添加model</a-button>
			<a-button @click="removeModel">移除model</a-button>
			<a-select placeholder="input search text" style="width: 200px;" v-model:value="currentSelect" :options="selectOptions" @change="onChangeType"></a-select>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
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

const selectOptions = [
	{
		value: 'point-with-label',
		label: 'Draw Point With Label',
	},
	{
		value: 'billboard',
		label: 'Draw BillBoard',
	},
	{
		value: 'corridor',
		label: 'Draw Corridor',
	},
	{
		value: 'polygon',
		label: 'Draw Polygon',
	},
	{
		value: 'texture-polygon',
		label: 'Draw Texture Polygon',
	},
	{
		value: 'rect',
		label: 'Draw Rectangle',
	},
	{
		value: 'model',
		label: 'Draw Model',
	},
	{
		value: 'polyline',
		label: 'Draw Polyline',
	},
]
const currentSelect = ref(null)

/**
 * 地图加载完成后的回调
 * @param viewer 
 * @param baseLayers 
 */
async function initFinished(viewer: Cesium.Viewer, baseLayers: {
	imageLayers: Cesium.ImageryLayer[],
	vectorLayers: Cesium.ImageryLayer[]
}) {
	mapStore.viewerInstance = viewer
	mapStore.baseLayers = baseLayers
	viewer.scene.globe.depthTestAgainstTerrain = true
	try {
		const worldTerrian = await Cesium.createWorldTerrainAsync()
		viewer!.scene.terrainProvider = worldTerrian
		// viewer.scene.globe.show = false
	} catch(e) {
		console.log('error', e)
	}
	try {
		const worldTileset = await Cesium.createGooglePhotorealistic3DTileset()
		viewer.scene.primitives.add(worldTileset)
	} catch(e) {
		console.log('error', e)
	}
}

/**
 * 添加Entity
 * @param url 
 * @param height 
 */
function createModel(url: string, height: number) {
	url = getModel(url)
	const viewer = mapStore.viewerInstance

	viewer?.entities.removeAll() // 移除所有的entity

	const position = Cesium.Cartesian3.fromDegrees(104.06, 30.67, height)

	const hpr = new Cesium.HeadingPitchRoll(135, 0, 0)
	const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

	const entity = viewer?.entities.add({
		id: 'my-model',
		name: url,
		position,
		orientation,
		model: {
			uri: url,
			minimumPixelSize: 128, // 像素
			maximumScale: 20000,
		}
	})
	viewer!.trackedEntity = entity
}

function removeModel() {
	const viewer = mapStore.viewerInstance

	viewer?.entities.removeById('my-model')
}

function onChangeType(e: Event) {
	console.log('e', e)
}

function getModel(url: string) {
	return new URL(url, import.meta.url).href
}
</script>

<style lang="less" scoped>
.map-view {
	position: relative;
  width: 100%;
  height: 100vh;
	.btns {
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 2;
	}
}
</style>