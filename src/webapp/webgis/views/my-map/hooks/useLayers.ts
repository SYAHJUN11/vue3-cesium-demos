import * as Cesium from 'cesium'
import { useMapStore } from '../store/map'

const mapStore = useMapStore()
export function changeBaseLayer(type: string) {
  const baseLayers = mapStore.baseLayers
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
/**
 * 添加3D Tiles到地图
 * @param url 
 * @param options 
 * @returns 
 */
export async function add3DTileset(url: string | number, options?:any) {
  const viewer = mapStore.viewerInstance
  let tileset = {} as Cesium.Cesium3DTileset
  try {
    if (typeof url === 'number') {
      tileset = await Cesium.Cesium3DTileset.fromIonAssetId(url, options)
    } else {
      tileset = await Cesium.Cesium3DTileset.fromUrl(url, options)
    }
		viewer?.scene.primitives.add(tileset)
	} catch(e) {
		console.log('error', e)
	}

  return tileset
}