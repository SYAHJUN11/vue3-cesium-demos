import * as Cesium from 'cesium'
import { TdtVectorLayerUrl, TdtVectorLabelLayerUrl, TdtImageLayerUrl, TdtImageLabelLayerUrl } from '../config'
/**
 * 添加天地图矢量图层到地图
 */
function getTdtVectorLayer2Map() {
  const tdtVectorLayer = new Cesium.ImageryLayer( // 天地图矢量图层
    new Cesium.WebMapTileServiceImageryProvider({
      url: TdtVectorLayerUrl,
      format: 'image/png',
      layer: 'tdt-vec',
      style: 'default',
      tileMatrixSetID: 'GoogleMapsCompatible',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    })
  )

  const tdtVectorLabelLayer = new Cesium.ImageryLayer( // 天地图矢量label图层
    new Cesium.WebMapTileServiceImageryProvider({
      url: TdtVectorLabelLayerUrl,
      format: 'image/jpeg',
      layer: 'tdt-vec-label',
      style: 'default',
      tileMatrixSetID: 'GoogleMapsCompatible',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    })
  )

  return [tdtVectorLayer, tdtVectorLabelLayer]
}

/**
 * 添加天地图矢量图层到地图
 */
function getTdtImageLayer2Map(): Cesium.ImageryLayer[] {
  const tdtImageLayer = new Cesium.ImageryLayer( // 天地图影像图层
    new Cesium.WebMapTileServiceImageryProvider({
      url: TdtImageLayerUrl,
      format: 'image/png',
      layer: 'tdt-img',
      style: 'default',
      tileMatrixSetID: 'GoogleMapsCompatible',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    })
  )

  const tdtImageLabelLayer = new Cesium.ImageryLayer( // 天地图影像label图层
    new Cesium.WebMapTileServiceImageryProvider({
      url: TdtImageLabelLayerUrl,
      format: 'image/jpeg',
      layer: 'tdt-img-label',
      style: 'default',
      tileMatrixSetID: 'GoogleMapsCompatible',
      subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
    })
  )

  return [tdtImageLayer, tdtImageLabelLayer]
}

function useBaseLayer(): {
  imageLayers: Cesium.ImageryLayer[],
  vectorLayers: Cesium.ImageryLayer[],
} {
  return {
    imageLayers: getTdtImageLayer2Map(),
    vectorLayers: getTdtVectorLayer2Map(),
  }
}

export {
	useBaseLayer
}