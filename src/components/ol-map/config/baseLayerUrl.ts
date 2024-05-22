const tdtKey = "1ced9dd2eb65e01576a9dc94b3a831f7"

const TdtVectorLayerUrl = "http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=" + tdtKey

const TdtVectorLabelLayerUrl = "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=" + tdtKey

const TdtImageLayerUrl = "http://t0.tianditu.gov.cn/img_w/wmts?tk=" + tdtKey

const TdtImageLabelLayerUrl = "http://t0.tianditu.gov.cn/cia_w/wmts?tk=" + tdtKey

const TdtImgLayer_W = {
  id: 'img_w',
  url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=' + tdtKey,
  layer: 'img',
  matrixSet: 'w',
}
const TdtImgLabelLayer_W = {
  id: 'cia_w',
  url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=' + tdtKey,
  layer: 'cia',
  matrixSet: 'w',
}

export {
  TdtVectorLayerUrl,
  TdtVectorLabelLayerUrl,
  TdtImageLayerUrl,
  TdtImageLabelLayerUrl,
  TdtImgLayer_W,
  TdtImgLabelLayer_W,
}