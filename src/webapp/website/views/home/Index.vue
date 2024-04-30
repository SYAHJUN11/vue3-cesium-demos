<template>
  <div class="home-wrapper">
    <my-map />
  </div>
</template>

<script lang="ts" setup>
import MyMap from '@/webapp/webgis/views/my-map/Index.vue'

</script>

<style lang="less" scoped>
.home-wrapper {
	position: relative;
  width: 100vw;
  height: 100vh;
}
</style>