import * as Cesium from 'cesium'
import { mapStore } from '../store'
export function changeBaseLayer(type: string) {
  const baseLayers = mapStore.getBaseLayers
  if (type === 'tdt-vector') {
    const vectorLayers = baseLayers?.vectorLayers
    const imageLayers = baseLayers?.imageLayers
    if (imageLayers) {
      imageLayers.forEach((item: Cesium.ImageryLayer) => {
        item.show = false
      })
    }
    if (vectorLayers) {
      vectorLayers.forEach((item: Cesium.ImageryLayer) => {
        item.show = true
      })
    }
  } else {
    const vectorLayers = baseLayers?.vectorLayers
    const imageLayers = baseLayers?.imageLayers
    if (vectorLayers) {
      vectorLayers.forEach((item: Cesium.ImageryLayer) => {
        item.show = false
      })
    }
    if (imageLayers) {
      imageLayers.forEach((item: Cesium.ImageryLayer) => {
        item.show = true
      })
    }
  }
}