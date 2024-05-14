<template>
	<div class="map-view">
		<!-- 地图 -->
		<cesium-map @init-finished="initFinished" />
		<!-- 地图工具 -->
		<div class="map-bottom-tools-wrapper">
			<map-bottom-tools />
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { Viewer, ImageryLayer } from 'cesium'
import CesiumMap from '@/components/cesium-map'
import MapBottomTools from './components/map-bottom-tools/Index.vue'
import { useMapStore } from './store/map.ts'

const mapStore = useMapStore()

function initFinished(viewer: Viewer, baseLayers: {
	imageLayers: ImageryLayer[],
	vectorLayers: ImageryLayer[]
}) {
	mapStore.setViewerInstance(viewer)
	mapStore.setBaseLayers(baseLayers)
}
</script>

<style lang="less" scoped>
.map-view {
	position: relative;
  width: 100%;
  height: 100%;
	.map-bottom-tools-wrapper {
		position: absolute;
		bottom: 12px;
		right: 12px;
		z-index: 2;
	}
}
</style>