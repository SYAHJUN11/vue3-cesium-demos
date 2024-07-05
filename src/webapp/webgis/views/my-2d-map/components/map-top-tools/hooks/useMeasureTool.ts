import Map from 'ol/Map'
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { LineString, Polygon } from 'ol/geom'
import { getLength, getArea } from 'ol/sphere'
import Draw from 'ol/interaction/Draw'
import { Type } from 'ol/geom/Geometry'
import { unByKey } from 'ol/Observable'
import { Feature, Overlay } from 'ol'
import { ref } from 'vue'
import { EventsKey } from 'ol/events'

interface IDrawOptions {
    type: Type
    justOnce: boolean // 是否只绘制一次
    clearLastTime: boolean // 是否清除上次绘制
}

let globalMap: Map
let currentDrawnFeature: Feature | null
let helpTooltipElement: HTMLElement
const helpTooltip = ref<Overlay>()
let measureTooltipElement: HTMLElement | null
const measureTooltip = ref<Overlay>()
const continuePolygonMsg: string = '点击继续测量面积'
const continueLineMsg: string = '点击继续测量距离'
const tooltips = [] as Overlay[] // 记录所有测量产生的的overlay，便于后续移除

const measureSource = new VectorSource()
export function useMeasureTool(map: Map, options: IDrawOptions) {
    globalMap = map
    map.on('pointermove', pointerMoveHandler)
    const { type } = options
    let measureLayer = map.getLayers().getArray().find(layer => layer.get('id') === 'measureLayer')
    if (!measureLayer) { // 如果不存在测量图层，添加
        measureLayer = new VectorLayer({
            source: measureSource,
            properties: {
                id: 'measureLayer',
            },
            zIndex: 999,
        })
        map.addLayer(measureLayer)
    }
    const measureTool = new Draw({
        type,
        source: measureSource,
    })
    map.addInteraction(measureTool)
    createHelpTooltip()
    createMeasureTooltip()
    let listener: EventsKey
    measureTool.on('drawstart', (e) => {
        currentDrawnFeature = e.feature
        let tooltipCoord = e.target
        listener = currentDrawnFeature.getGeometry()?.on('change', (e) => {
            const geom = e.target
            let output
            if (geom instanceof Polygon) {
                output = formatArea(geom)
                tooltipCoord = geom.getInteriorPoint().getCoordinates()
            } else if (geom instanceof LineString) {
                output = formatLength(geom)
                tooltipCoord = geom.getLastCoordinate()
            }
            if (measureTooltipElement) {
                measureTooltipElement.innerHTML = output as string
            }
            measureTooltip.value?.setPosition(tooltipCoord)
        }) as EventsKey
    })
    measureTool.on('drawend', (e) => {
        measureTooltip.value?.setOffset([0, -7])
        currentDrawnFeature = null
        measureTooltipElement = null
        createMeasureTooltip()
        unByKey(listener)
    })

    return measureTool
}
/**
 * 鼠标移动事件
 * @param evt 
 * @returns 
 */
function pointerMoveHandler(evt: any) {
    if (evt.dragging) {
        return
    }
    let helpMsg = '点击开始测量'
    if (currentDrawnFeature) {
        const geom = currentDrawnFeature.getGeometry()
        if (geom instanceof Polygon) {
            helpMsg = continuePolygonMsg
        } else if (geom instanceof LineString) {
            helpMsg = continueLineMsg
        }
    }
    helpTooltipElement.innerHTML = helpMsg
    helpTooltip.value?.setPosition(evt.coordinate)
}
function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode?.removeChild(helpTooltipElement)
    }
    helpTooltipElement = document.createElement('div')
    helpTooltip.value = new Overlay({
        element: helpTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
    })
    globalMap.addOverlay(helpTooltip.value)
    tooltips.push(helpTooltip.value)
}
function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode?.removeChild(measureTooltipElement)
    }
    measureTooltipElement = document.createElement('div')
    measureTooltip.value = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
    })
    globalMap.addOverlay(measureTooltip.value)
    tooltips.push(measureTooltip.value)
}
function formatLength(line: LineString) {
    const length = getLength(line)
    let output
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km'
    } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm'
    }
    return output
}
function formatArea(polygon: Polygon) {
    const area = getArea(polygon)
    let output
    if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>'
    } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>'
    }
    return output
}
/**
 * 清除绘制的要素
 */
export function clearMeasureFeatures() {
    measureSource.clear()
    console.log('tooltips', tooltips)
    tooltips.forEach(tooltip => {
        globalMap.removeOverlay(tooltip)
    })
    // if (helpTooltip.value) {
    //     globalMap.removeOverlay(helpTooltip.value)
    // }
    // if (measureTooltip.value) {
    //     globalMap.removeOverlay(measureTooltip.value)
    // }
}