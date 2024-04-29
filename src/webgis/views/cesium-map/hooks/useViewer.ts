import { type IViewer } from "../types"
import * as Cesium from "cesium"
import { TdtVectorLayerUrl } from '../config'

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

  viewer.imageryLayers.remove(viewer.imageryLayers.get(0)) // 移除默认影像

  viewer.scene.globe.enableLighting = true // 启用光照
  const tdtVectorWMTSLayer = new Cesium.WebMapTileServiceImageryProvider({
    url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1ced9dd2eb65e01576a9dc94b3a831f7',
    layer: "img",
    style: "default",
    format: "tiles",
    tileMatrixSetID: 'w',
    subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
    minimumLevel: 0,
    maximumLevel: 18
  })
  viewer.imageryLayers.addImageryProvider(tdtVectorWMTSLayer)

  return viewer
}

export { initCesiumViewer }
