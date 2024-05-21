import { useMapStore } from '../store/mapStore'

const mapStore = useMapStore()

/**
 * 地图放大
 */
export function zoomIn() {
  const map = mapStore.mapInstance
  const view = map?.getView()
  const zoom = view?.getZoom() as number
  view?.setZoom(zoom + 1)
}

/**
 * 地图缩小
 */
export function zoomOut() {
  const map = mapStore.mapInstance
  const view = map?.getView()
  const zoom = view?.getZoom() as number
  view?.setZoom(zoom - 1)
}