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
    closeMeasureTool()
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
        clearLastTime: true,
    })
}
/**
 * 测量工具
 * @param type 
 */
function initMeasureTool(type) {
    closeDrawTool()
    const map = mapStore.mapInstance
    measureTool.value && map.removeInteraction(measureTool.value)
    if (type === 'clear') {
        return clearMeasureFeatures()
    } else if (type === 'close') {
        return closeMeasureTool()
    }
    measureTool.value = useMeasureTool(map, {
        type,
        justOnce: false,
        clearLastTime: true,
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
