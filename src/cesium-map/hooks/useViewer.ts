import { type IViewer } from "../types"
import * as Cesium from "cesium"
import { TdtVectorLayerUrl, TdtVectorLabelLayerUrl, TdtImageLayerUrl, TdtImageLabelLayerUrl } from '../config'

/**
 * 初始化地图
 * @param container 地图容器
 * @param config 地图配置
 */
function initCesiumViewer(
  container: string | Element,
  config?: IViewer
) {
  const viewer = new Cesium.Viewer(container, {
    ...config,
  })

  viewer.imageryLayers.remove(viewer.imageryLayers.get(0)) // 移除默认影像图层

  // addTdtVectorLayer2Map(viewer)
  
  addTdtImageLayer2Map(viewer)

  return viewer
}

/**
 * 添加天地图矢量图层到地图
 * @param viewer 
 */
function addTdtVectorLayer2Map(viewer: Cesium.Viewer) {
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
function addTdtImageLayer2Map(viewer: Cesium.Viewer) {
  const tdtVectorLayer = new Cesium.WebMapTileServiceImageryProvider({ // 天地图矢量图层
    url: TdtImageLayerUrl,
    format: 'image/png',
    layer: 'tdt-img',
    style: 'default',
    tileMatrixSetID: 'GoogleMapsCompatible',
  })
  viewer.imageryLayers.addImageryProvider(tdtVectorLayer)

  const tdtLabelLayer = new Cesium.WebMapTileServiceImageryProvider({ // 天地图影像label图层
    url: TdtImageLabelLayerUrl,
    format: 'image/jpeg',
    layer: 'tdt-img-label',
    style: 'default',
    tileMatrixSetID: 'GoogleMapsCompatible',
  })
  viewer.imageryLayers.addImageryProvider(tdtLabelLayer)
}

export { initCesiumViewer, addTdtVectorLayer2Map, addTdtImageLayer2Map }
