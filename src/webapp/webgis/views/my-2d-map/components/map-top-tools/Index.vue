<template>
    <div class="map-top-tools">
        <a-dropdown :trigger="['click']">
            <div class="tool-item">{{ drawTools.title }}</div>
            <template #overlay>
                <a-menu v-model="drawTools.activeTool">
                    <a-menu-item v-for="item in drawTools.children" :key="item.id" @click="initDrawTool(item.type)">
                        <span>{{ item.label }}</span>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
        <a-divider type="vertical" />
        <a-dropdown :trigger="['click']">
            <div class="tool-item">{{ measureTools.title }}</div>
            <template #overlay>
                <a-menu v-model="measureTools.activeTool">
                    <a-menu-item v-for="item in measureTools.children" :key="item.id" @click="initMeasureTool(item.type)">
                        <span>{{ item.label }}</span>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Style, Fill, Stroke } from 'ol/style'
import { useMapStore } from '../../store/mapStore'
import { useDrawTool, clearDrawFeatures, closeDrawTool } from './hooks/useDrawTool'
import { useMeasureTool, clearMeasureFeatures, closeMeasureTool } from './hooks/useMeasureTool'

const mapStore = useMapStore()
const drawTool = ref()
const measureTool = ref()

const measureTools = reactive({
    activeTool: '',
    visible: false,
    title: '量算工具',
    children: [
        {
            id: 'point',
            type: 'Point',
            label: '标点'
        },
        {
            id: 'line-string',
            type: 'LineString',
            label: '测距离'
        },
        {
            id: 'polygon',
            type: 'Polygon',
            label: '测面积'
        },
        {
            id: 'close',
            type: 'close',
            label: '关闭'
        },
        {
            id: 'clear',
            type: 'clear',
            label: '清除'
        },
    ]
})
const drawTools = reactive({
    activeTool: '',
    visible: false,
    title: '绘制工具',
    children: [
        {
            id: 'point',
            type: 'Point',
            label: '画点'
        },
        {
            id: 'line-string',
            type: 'LineString',
            label: '画线'
        },
        {
            id: 'polygon',
            type: 'Polygon',
            label: '画面'
        },
        {
            id: 'circle',
            type: 'Circle',
            label: '画圆'
        },
        {
            id: 'close',
            type: 'close',
            label: '关闭'
        },
        {
            id: 'clear',
            type: 'clear',
            label: '清除'
        },
    ]
})

/**
 * 绘制工具
 * @param type 
 */
function initDrawTool(type) {
    closeMeasureTool() // 关闭测量工具，避免冲突
    const map = mapStore.mapInstance
    drawTool.value && map.removeInteraction(drawTool.value) // 清除绘制工具
    if (type === 'clear') {
        return clearDrawFeatures()
    } else if (type === 'close') {
        return closeDrawTool()
    }
    drawTool.value = useDrawTool(map, { // 添加绘制工具
        type,
        justOnce: false,
        clearLastTime: false,
        layerStyle: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new Stroke({
                color: '#ffcc33',
                width: 2
            })
        })
    })
}
/**
 * 测量工具
 * @param type 
 */
function initMeasureTool(type) {
    closeDrawTool() // 关闭绘制工具，避免冲突
    const map = mapStore.mapInstance
    if (type === 'clear') {
        return clearMeasureFeatures()
    } else if (type === 'close') {
        return closeMeasureTool()
    }
    measureTool.value = useMeasureTool(map, {
        type,
        justOnce: false,
        clearLastTime: false,
    })
}

</script>

<style lang="less" scoped>
.map-top-tools {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 16px 0px rgba(127,135,151,0.13);
    .tool-item {
        cursor: pointer;
        padding: 8px 12px;
        &:hover {
            color: #4096ff;
        }
    }
}
</style>
<style>
/**
* 测量工具提示框的样式信息
*/
.tooltip {
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    color: white;
    padding: 4px 8px;
    opacity: 0.7;
    white-space: nowrap;
}
.tooltip-measure {
    opacity: 1;
    font-weight: bold;
}
.tooltip-static {
    background-color: #ffcc33;
    color: black;
    border: 1px solid white;
}
.tooltip-measure:before,
.tooltip-static:before {
    border-top: 6px solid rgba(0, 0, 0, 0.5);
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    content: "";
    position: absolute;
    bottom: -6px;
    margin-left: -7px;
    left: 50%;
}
.tooltip-static:before {
    border-top-color: #ffcc33;
}
</style>