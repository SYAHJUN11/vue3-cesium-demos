<template>
    <div class="map-top-tools">
        <div class="draw">
            <a-button @click="initDrawTool('Point')">画点</a-button>
            <a-button @click="initDrawTool('LineString')">画线</a-button>
            <a-button @click="initDrawTool('Polygon')">画面</a-button>
            <a-button @click="clearDrawTool">清除</a-button>
        </div>
        <div class="measure">
            <a-button @click="initMeasureTool('Point')">标点</a-button>
            <a-button @click="initMeasureTool('LineString')">测距</a-button>
            <a-button @click="initMeasureTool('Polygon')">测面积</a-button>
            <a-button @click="clearMeasureTool">清除</a-button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMapStore } from '../../store/mapStore'
import { useDrawTool, clearDrawFeatures } from './hooks/useDrawTool'
import { useMeasureTool, clearMeasureFeatures } from './hooks/useMeasureTool'

const mapStore = useMapStore()
const drawTool = ref()
const measureTool = ref()

/**
 * 绘制工具
 * @param type 
 */
function initDrawTool(type) {
    clearDrawFeatures()
    const map = mapStore.mapInstance
    drawTool.value && map.removeInteraction(drawTool.value) // 清除绘制工具
    drawTool.value = useDrawTool(map, {
        type,
        justOnce: false,
        clearLastTime: true,
    })
}
/**
 * 清除绘制工具
 */
function clearDrawTool() {
    clearDrawFeatures()
    drawTool.value.setActive(false) // 关闭绘制工具
    drawTool.value && map.removeInteraction(drawTool.value) // 清除绘制工具
}
/**
 * 测量工具
 * @param type 
 */
function initMeasureTool(type) {
    const map = mapStore.mapInstance
    measureTool.value && map.removeInteraction(measureTool.value)
    measureTool.value = useMeasureTool(map, {
        type,
        justOnce: false,
        clearLastTime: true,
    })
}
/**
 * 清除测量工具
 */
function clearMeasureTool() {
    clearMeasureFeatures()
    const map = mapStore.mapInstance
    measureTool.value.setActive(false)
    measureTool.value && map.removeInteraction(measureTool.value)
}

</script>

<style lang="less" scoped>
.map-top-tools {
    height: 32px;
    border-radius: 2px;
    box-shadow: 0px 0px 16px 0px rgba(127,135,151,0.13);
    display: flex;
    flex-direction: column;
    .measure {
        margin-top: 20px;
    }
}
</style>
