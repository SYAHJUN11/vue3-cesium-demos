<template>
  <cesium-map @init-finished="initFinished" />
</template>

<script lang="ts" setup>
import CesiumMap from './cesium-map'

function initFinished(viewer: any) {
  console.log('viewer', viewer)
}
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
}
</style>
