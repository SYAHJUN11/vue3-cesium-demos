import { defineStore } from 'pinia'
import { Map } from 'ol'
import { ref } from 'vue'

export const useMapStore = defineStore('map-store', () => {
  const mapInstance = ref<Map | null>(null)

  return {
    mapInstance
  }
})