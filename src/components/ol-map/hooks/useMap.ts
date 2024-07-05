import { Map, View } from 'ol'

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
    controls: [],
    target: container,
  })

  return map
}

export { useMap }