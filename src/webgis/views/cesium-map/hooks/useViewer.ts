import { type IViewer } from "../types"
import * as Cesium from "cesium"
import { TdtVectorLayerUrl, TdtLabelLayerUrl, TdtImageLayerUrl } from '../config'

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

  const tdtVectorLayer = new Cesium.WebMapTileServiceImageryProvider({ // 天地图矢量图层
    url: TdtVectorLayerUrl,
    format: 'image/png',
    layer: 'tdt-vec',
    style: 'default',
    tileMatrixSetID: 'GoogleMapsCompatible',
  })
  viewer.imageryLayers.addImageryProvider(tdtVectorLayer)
  
  const tdtLabelLayer = new Cesium.WebMapTileServiceImageryProvider({ // 天地图label图层
    url: TdtLabelLayerUrl,
    format: 'image/jpeg',
    layer: 'tdt-label',
    style: 'default',
    tileMatrixSetID: 'GoogleMapsCompatible',
  })
  viewer.imageryLayers.addImageryProvider(tdtLabelLayer)

  return viewer
}

export { initCesiumViewer }
