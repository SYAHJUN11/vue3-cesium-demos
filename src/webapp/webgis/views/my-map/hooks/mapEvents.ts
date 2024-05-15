import { useMapStore } from '../store/map.ts'

const mapStore = useMapStore()
/**
 * 放大
 */
export function zoomIn() {
  const viewer = mapStore.viewerInstance
  const camera = viewer?.camera
  camera?.zoomIn()
}

/**
 * 缩小
 */
export function zoomOut() {
  const viewer = mapStore.viewerInstance
  const camera = viewer?.camera
  camera?.zoomOut()
}