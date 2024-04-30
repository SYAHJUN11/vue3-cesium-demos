<template>
	<div class="map-view">
		<cesium-map />
	</div>
</template>

<script lang="ts" setup>
import CesiumMap from '@/components/cesium-map'
</script>

<style lang="less" scoped>
.map-view {
	position: relative;
  width: 100%;
  height: 100%;
}
</style>