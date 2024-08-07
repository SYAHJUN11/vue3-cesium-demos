import type { Extent } from 'ol/extent'
import { Tile as TileLayer } from 'ol/layer'
import { WMTS } from 'ol/source'
import * as olExtent from 'ol/extent'
import * as olProj from 'ol/proj'
import * as olTileGrid from 'ol/tilegrid'
import { TdtImgLayer_W, TdtImgLabelLayer_W, TdtVectorLayer_W, TdtVectorLabelLayer_W } from '../config'

const projection = olProj.get('EPSG:900913')
const projectionExtent = projection?.getExtent() as Extent
const width = olExtent.getWidth(projectionExtent)
const resolutions = []
const matrixIds = []
for (let z = 1; z < 18; z++) {
  resolutions[z] = width / (256 * Math.pow(2, z))
  matrixIds[z] = z.toString()
}
let wmtsTileGrid = new olTileGrid.WMTS({
  origin: olExtent.getTopLeft(projectionExtent), // 原点（左上角）
  resolutions: resolutions, // 分辨率数组
  matrixIds: matrixIds, // 矩阵ID，就是瓦片坐标系z维度各个层级的标识
})

/**
 * 影像图层（投影：EPSG:990913，包含标注）
 * @returns 
 */
function useTdtImageLayers() {
  const imageSource = new WMTS({
    url: TdtImgLayer_W.url,
    layer: TdtImgLayer_W.layer,
    tileGrid: wmtsTileGrid,
    style: 'default',
    matrixSet: TdtImgLayer_W.matrixSet,
  })
  const imageLayer = new TileLayer({
    source: imageSource,
  })
  const imageLabelSource = new WMTS({
    url: TdtImgLabelLayer_W.url,
    layer: TdtImgLabelLayer_W.layer,
    tileGrid: wmtsTileGrid,
    style: 'default',
    matrixSet: TdtImgLabelLayer_W.matrixSet,
  })
  const imageLabelLayer = new TileLayer({
    source: imageLabelSource,
  })
  return [
    imageLayer,
    imageLabelLayer,
  ]
}

/**
 * 矢量图层（投影：EPSG:990913，包含标注）
 * @returns 
 */
function useTdtVectorLayers() {
  const vectorSource = new WMTS({
    url: TdtVectorLayer_W.url,
    layer: TdtVectorLayer_W.layer,
    style: 'default',
    matrixSet: TdtVectorLayer_W.matrixSet,
    tileGrid: wmtsTileGrid,
  })
  const vectorLayer = new TileLayer({
    source: vectorSource,
  })

  const vectorLabelSource = new WMTS({
    url: TdtVectorLabelLayer_W.url,
    layer: TdtVectorLabelLayer_W.layer,
    style: 'default',
    matrixSet: TdtVectorLayer_W.matrixSet,
    tileGrid: wmtsTileGrid,
  })
  const vectorLabelLayer = new TileLayer({
    source: vectorLabelSource,
  })
  return [
    vectorLayer,
    vectorLabelLayer,
  ]
}

export {
  useTdtImageLayers,
  useTdtVectorLayers,
}