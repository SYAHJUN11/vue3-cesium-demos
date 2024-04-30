import * as Cesium from 'cesium'
import type { Viewer } from 'cesium'
import { TdtVectorLayerUrl, TdtVectorLabelLayerUrl, TdtImageLayerUrl, TdtImageLabelLayerUrl } from '../config'
/**
 * 添加天地图矢量图层到地图
 * @param viewer 
 */
function addTdtVectorLayer2Map(viewer: Viewer) {
	const tdtVectorLayer = new Cesium.WebMapTileServiceImageryProvider({ // 天地图矢量图层
		url: TdtVectorLayerUrl,
		format: 'image/png',
		layer: 'tdt-vec',
		style: 'default',
		tileMatrixSetID: 'GoogleMapsCompatible',
	})
	viewer.imageryLayers.addImageryProvider(tdtVectorLayer)

	const tdtLabelLayer = new Cesium.WebMapTileServiceImageryProvider({ // 天地图矢量label图层
		url: TdtVectorLabelLayerUrl,
		format: 'image/jpeg',
		layer: 'tdt-vec-label',
		style: 'default',
		tileMatrixSetID: 'GoogleMapsCompatible',
	})
	viewer.imageryLayers.addImageryProvider(tdtLabelLayer)
}

/**
 * 添加天地图矢量图层到地图
 * @param viewer 
 */
function getTdtImageLayer2Map() {
  const tdtImageLayer = new Cesium.ImageryLayer( // 天地图影像图层
    new Cesium.WebMapTileServiceImageryProvider({
      url: TdtImageLayerUrl,
      format: 'image/png',
      layer: 'tdt-img',
      style: 'default',
      tileMatrixSetID: 'GoogleMapsCompatible',
    })
  )

  const tdtImageLabelLayer = new Cesium.ImageryLayer( // 天地图影像label图层
    new Cesium.WebMapTileServiceImageryProvider({
      url: TdtImageLabelLayerUrl,
      format: 'image/jpeg',
      layer: 'tdt-img-label',
      style: 'default',
      tileMatrixSetID: 'GoogleMapsCompatible',
    })
  )

  return [tdtImageLayer, tdtImageLabelLayer]
}

function useBaseLayer() {
  return getTdtImageLayer2Map()
}

export {
	useBaseLayer
}