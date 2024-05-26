const tdtKey = "1ced9dd2eb65e01576a9dc94b3a831f7"

const TdtImgLayer_W = { // 影像图层信息
  id: 'img_w',
  url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=' + tdtKey,
  layer: 'img',
  matrixSet: 'w',
}
const TdtImgLabelLayer_W = { // 影像标注图层信息
  id: 'cia_w',
  url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=' + tdtKey,
  layer: 'cia',
  matrixSet: 'w',
}

const TdtVectorLayer_W = {
  id: 'vec_w',
  url: 'http://t0.tianditu.gov.cn/vec_w/wmts?tk=' + tdtKey,
  layer: 'vec',
  matrixSet: 'w',
}
const TdtVectorLabelLayer_W = {
  id: 'vec_w',
  url: 'http://t0.tianditu.gov.cn/cva_w/wmts?tk=' + tdtKey,
  layer: 'cva',
  matrixSet: 'w',
}

export {
  TdtImgLayer_W,
  TdtImgLabelLayer_W,
  TdtVectorLayer_W,
  TdtVectorLabelLayer_W,
}