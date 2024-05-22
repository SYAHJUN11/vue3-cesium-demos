<template>
  <router-view v-slot="{ Component }">
    <keep-alive v-if="$route.meta.keepAlive">
      <component :is="Component"></component>
    </keep-alive>
    <component v-else :is="Component"></component>
  </router-view>
</template>

<script lang="ts" setup></script>

<style scoped>
html,
body {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
