<template>
    <div class="mtk-map" id="mtkMap">
        <div class="info-window" ref="infoWindowRef">
            <div class="title">覆盖范围</div>
            <div class="content">4市11县(市、区)</div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GeoJSONVectorTileLayer, GroupGLLayer, ExtrudePolygonLayer } from '@maptalks/gl-layers'
import { GeoJSON, Map, Marker, TextMarker, TileLayer, Util, VectorLayer, ui } from 'maptalks'
import {
    getTileActor
} from 'maptalks.tileclip'
import cdcGeojson from './geojson-data/510000.json'
import subCity from './geojson-data/sc_city.json'

let map
const infoWindowRef = ref()
const tdtKey = "1ced9dd2eb65e01576a9dc94b3a831f7"

onMounted(() => {
    initMap()
})
function initMap() {
    map = new Map('mtkMap', {
        center: [103.6426, 30.1832],
        zoom: 7,
        pitch: 60,
        dragPitch: true,
        dragRotate: true,
        dragRotatePitch: true,
        baseLayer: new TileLayer("base", {
            type: 'WMTS',
            name: "矢量地图",
            urlTemplate: `https://t5.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${tdtKey}&transparent=true`,// token是到天地图网站申请的
            subdomains: ["a", "b", "c", "d"],// 不可忽略
            visible: true,
        }),
    })
    addArea2Map()
    addTileLayer()
    addPoint2Map()
    addSubAreas()
}

function addArea2Map() {
    const dataConfig = {
        type: '3d-extrusion',
        altitudeProperty: 'height',
        altitudeScale: 5,
        top: true,
        side: true,
    }
    const material = { // 侧面添加纹理
        emissiveFactor: [1, 1, 1],
        emissiveTexture: getImage('southeast.jpg'),
        uvScale: [0.001, 0.001],
        uvRotation: 45
    }
    const layer = new ExtrudePolygonLayer('cdc-vector', {
        dataConfig,
        material,
        geometryEvents: false,
        zIndex: 2
    })
    const groupLayer = new GroupGLLayer('group', [layer]).addTo(map)
    const polygons = GeoJSON.toGeometry(cdcGeojson, (polygon) => {
        polygon.setSymbol({
            topPolygonFill: '#1984b1',
            bottomPolygonFill: '#1984b1',
        })
        polygon.setProperties({
            height: -2000,
        })
    })
    layer.addGeometry(polygons)
}
function addSubAreas() {
    const layer = new VectorLayer('sub-area', {
        zIndex: 2
    })
    const subAreaSymbol = {
        // polygonPatternFile: getImage('sub-area-bg.png'),
        lineWidth: 0,
        uvScale: [-1, -1]
    }
    const polygons = GeoJSON.toGeometry(cdcGeojson, (geo) => {
        geo.setSymbol(subAreaSymbol)
    })
    layer.addGeometry(polygons).addTo(map)
}
function addTileLayer() {
    const polygons = GeoJSON.toGeometry(cdcGeojson)
    const tileActor = getTileActor()
    const maskId = 'xxx'
    const baseLayer = new TileLayer('base', {
        urlTemplate: 'https://cache.bigdatacd.com:9556/iserver/services/map-shuifaGK/rest/maps/水网工程总图/zxyTileImage.png?z={z}&x={x}&y={y}&width=256&height=256&transparent=true',
        subdomains: ["a", "b", "c", "d"],
        zIndex: 3
    })
    baseLayer.on('renderercreate', function(e) { // 对tilelayer进行切割
        e.renderer.loadTileBitmap = function(url, tile, callback) {
            tileActor.getTile({
                url: Util.getAbsoluteURL(url),
            }).then(imagebitmap => {
                tileActor.clipTile({
                    tile: imagebitmap,
                    tileBBOX: baseLayer._getTileBBox(tile),
                    projection: baseLayer.getProjection().code,
                    tileSize: baseLayer.getTileSize().width,
                    maskId,
                }).then(image => {
                    callback(image)
                }).catch(error => {
                    console.error(error)
                })
            }).catch(error => {
                console.error(error)
            })
        };
    })
    tileActor.injectMask(maskId, cdcGeojson.features[0]).then(data => {
        baseLayer.addTo(map)
    }).catch(error => {
        console.error(error)
    })
}
function addPoint2Map() {
    const point = new Marker([103.6426, 30.1832], {
        properties: {
            altitude: 0
        },
        symbol: {}
        // symbol: {
        //     markerType: 'ellipse',
        //     markerFill: '#000'
        // }
    })
    new VectorLayer('point-vector', [point], {
        enableAltitude: true,
        altitudeProperty: "altitude",
        zIndex: 10
    }).addTo(map)
    point.setInfoWindow({
        content: infoWindowRef.value,
        dy: 25
    })
    point.openInfoWindow()
    // point.setInfoWindow({
    //     content: '<div class="content">' +
    //       '<div class="pop_title">Custom InfoWindow</div>' +
    //       '<div class="pop_time">' +
    //       new Date().toLocaleTimeString() +
    //       "</div><br>" +
    //       '<div class="pop_dept">' +
    //       "</div>" +
    //       '<div class="pop_dept">' +
    //       "</div>" +
    //       '<div class="arrow"></div>' +
    //       "</div>",
    // })
}
function getImage(image) {
    return new URL(`./images/${image}`, import.meta.url).href
}
</script>

<style lang="less" scoped>
.mtk-map {
    position: relative;
    height: 100vh;
    box-sizing: border-box;
    .info-window {
        width: 162px;
        height: 117px;
        background: url('./images/marker-icon.png') no-repeat;
        display: flex;
        flex-direction: column;
        .title, .content {
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 20px;
            text-align: left;
            font-style: normal;
        }
        .title {
            margin-left: 12px;
            margin-top: 4px;
        }
        .content {
            margin-left: 12px;
            margin-top: 6px;
        }
    }
    :deep(.maptalks-close) {
        display: none;
    }
}
</style>
