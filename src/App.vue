<template>
  <router-view v-slot="{ Component }">
    <keep-alive v-if="$route.meta.keepAlive">
      <component :is="Component"></component>
    </keep-alive>
    <component v-else :is="Component"></component>
  </router-view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  console.log('rrrrr', route.meta.keepAlive)
})
</script>

<style scoped>
html,
body {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
