import { mapStore } from "../store"
/**
 * 放大
 */
export function zoomIn() {
  const viewer = mapStore.getViewerInstance
  const camera = viewer?.camera
  camera?.zoomIn()
}

/**
 * 缩小
 */
export function zoomOut() {
  const viewer = mapStore.getViewerInstance
  const camera = viewer?.camera
  camera?.zoomOut()
}