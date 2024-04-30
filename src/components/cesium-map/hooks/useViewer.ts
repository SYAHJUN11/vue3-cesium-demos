import * as Cesium from 'cesium'
import { type IViewer } from '../types'
/**
 * 初始化地图
 * @param container 地图容器
 * @param config 地图配置
 */
function useViewer(
  container: string | Element,
  config?: IViewer
): Cesium.Viewer {
  const viewer = new Cesium.Viewer(container, {
    ...config,
  })

  viewer.imageryLayers.remove(viewer.imageryLayers.get(0)) // 移除默认影像图层

  return viewer
}

export { useViewer }
