import { Map, View } from 'ol'
import { defaults } from 'ol/control/defaults'

function useMap(container: HTMLElement | string, options?: any): Map {
  const map = new Map({
    view: new View({
      center: options.center || [],
      zoom: options.zoom || 0,
      projection: options.projection || 'EPSG:4326',
      maxZoom: options.maxZoom || 18,
      minZoom: options.minZoom || 0,
    }),
    layers: options.baseLayers || [],
    controls: defaults({
      // 清除地图上的控件
      attribution: false,
      rotate: false,
      zoom: false,
    }),
    target: container,
  })

  return map
}

export { useMap }