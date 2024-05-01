<template>
	<div class="map-view">
		<!-- 地图 -->
		<cesium-map />
		<!-- 地图工具 -->
		<div class="map-bottom-tools-wrapper">
			<map-bottom-tools />
		</div>
	</div>
</template>

<script lang="ts" setup>
import CesiumMap from '@/components/cesium-map'
import MapBottomTools from './components/map-bottom-tools/Index.vue'
</script>

<style lang="less" scoped>
.map-view {
	position: relative;
  width: 100%;
  height: 100%;
	.map-bottom-tools-wrapper {
		position: absolute;
		bottom: 20px;
		right: 20px;
		z-index: 2;
	}
}
</style>