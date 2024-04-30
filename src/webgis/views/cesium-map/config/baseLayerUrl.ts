const tdtKey = "1ced9dd2eb65e01576a9dc94b3a831f7"

const TdtImageLayerUrl = "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=wmts&REQUEST=gettile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=" + tdtKey

const TdtVectorLayerUrl = "http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=" + tdtKey

const TdtLabelLayerUrl = "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=" + tdtKey

export {
	TdtVectorLayerUrl,
	TdtLabelLayerUrl,
	TdtImageLayerUrl,
}