import Map from 'ol/Map'
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import Draw from 'ol/interaction/Draw'
import { Type } from 'ol/geom/Geometry'

interface IDrawOptions {
    type: Type
    justOnce: boolean // 是否只绘制一次
    clearLastTime: boolean // 是否清除上次绘制
}

const drawSource = new VectorSource()
/**
 * 绘制工具
 * @param map 地图 
 * @param options 配置
 * @returns 
 */
export function useDrawTool(map: Map, options: IDrawOptions) {
    const { type, justOnce, clearLastTime } = options
    let drawLayer = map.getLayers().getArray().find(layer => layer.get('id') === 'drawLayer')
    if (!drawLayer) { // 如果不存在绘制图层，添加
        drawLayer = new VectorLayer({
            source: drawSource,
            properties: {
                id: 'drawLayer',
            },
            zIndex: 999,
        })
        map.addLayer(drawLayer)
    }
    const drawTool = new Draw({
        type,
        source: drawSource,
    })
    map.addInteraction(drawTool)
    if (justOnce) { // 绘制一次后停止绘制
        drawTool.on('drawend', () => {
            drawTool?.setActive(false)
        })
    }
    if (clearLastTime) { // 清除上次绘制的图形
        drawTool.on('drawstart', () => {
            drawSource.clear()
        })
    }

    return drawTool
}
/**
 * 清除绘制的要素
 */
export function clearDrawFeatures() {
    drawSource.clear()
}