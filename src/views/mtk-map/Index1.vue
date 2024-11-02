<template>
    <div class="mtk-map" id="mtkMap">
        
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { GeoJSONVectorTileLayer, GroupGLLayer } from '@maptalks/gl-layers'
import { Map, TileLayer, VectorLayer } from 'maptalks'
import cdcGeojson from './geojson-data/510000.json'
import areaGeoJson from './geojson-data/area.json'

let map

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
        // baseLayer: new TileLayer("base", {
        //     type: 'WMTS',
        //     name: "矢量地图",
        //     urlTemplate: `https://t5.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${tdtKey}&transparent=true`,// token是到天地图网站申请的
        //     subdomains: ["a", "b", "c", "d"],// 不可忽略
        //     visible: true,
        // }),
    })
    addGeoJsonLayer2Map()
    // addTileLayer()
}
function addTileLayer() {
    // const layer = new TileLayer('service-layer', {
    //     urlTemplate: "https://cache.bigdatacd.com:9556/iserver/services/map-shuifaGK/rest/maps/水网工程总图/zxyTileImage.png?z={z}&x={x}&y={y}&width=256&height=256&transparent=true",
    //     subdomains: ["a", "b", "c", "d"],
    //     zIndex: 2,
    // }).addTo(map)

    // const tileLayer = new TileLayer("base", {
    //     type: 'WMTS',
    //     name: "矢量地图",
    //     urlTemplate: `https://t5.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${tdtKey}`,// token是到天地图网站申请的
    //     subdomains: ["a", "b", "c", "d"],// 不可忽略
    //     visible: true,
    // }).addTo(map)
    const tileLayer = new TileLayer("base", {
        urlTemplate:
            "https://cache.bigdatacd.com:9556/iserver/services/map-shuifaGK/rest/maps/水网工程总图/zxyTileImage.png?z={z}&x={x}&y={y}&width=256&height=256&transparent=true",
        // urlTemplate: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        // urlTemplate: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        subdomains: ["a", "b", "c", "d"],
    });

    tileLayer.on("renderercreate", function (e) {
        //load tile image
        //   img(Image): an Image object
        //   url(String): the url of the tile
        e.renderer.loadTileBitmap = function (url, tile, callback) {
            //get Tile data
            tileActor
                .getTile({
                    url: maptalks.Util.getAbsoluteURL(url),
                    filter: "sepia(100%) invert(90%)",
                })
                .then((imagebitmap) => {
                    //clip tile
                    tileActor
                        .clipTile({
                            tile: imagebitmap,
                            tileBBOX: tileLayer._getTileBBox(tile),
                            projection: tileLayer.getProjection().code,
                            tileSize: tileLayer.getTileSize().width,
                            maskId,
                        })
                        .then((image) => {
                            callback(image);
                        })
                        .catch((error) => {
                            //do some things
                            console.error(error);
                        });
                })
                .catch((error) => {
                    //do some things
                    console.error(error);
                });
        };
    });
}
function addGeoJsonLayer2Map() {
    const style = [
        {
            filter: true,
            renderPlugin: {
                type: "lit",
                dataConfig: {
                    type: "3d-extrusion",
                    altitudeProperty: "height",
                    minHeightProperty: "min_height",
                    altitudeScale: 30,
                    defaultAltitude: 1000,
                    topThickness: 1,
                    top: true,
                    side: false
                },
            },
            symbol: {
                polygonOpacity: 1,
                material: {
                    baseColorTexture: getImage('marker-icon.png')
                }
            }
        },
        {
            filter: true,
            renderPlugin: {
                type: "lit",
                dataConfig: {
                    type: "3d-extrusion",
                    altitudeProperty: "height",
                    minHeightProperty: "min_height",
                    altitudeScale: 30,
                    defaultAltitude: 1000,
                    topThickness: 1,
                    top: false,
                    side: true,
                    sideVerticalUVMode: 1,
                },
            },
            symbol: {
                bloom: false,
                ssr: false,
                polygonOpacity: 1,
                material: {
                    baseColorTexture: getImage('sub-area-bg.png'),
                    baseColorFactor: [1, 1, 1, 1],
                    hsv: [0, 0.446, -0.158],
                    baseColorIntensity: 1.318,
                    contrast: 1.414,
                    outputSRGB: 1,
                    metallicRoughnessTexture: getImage('side.png'),
                    roughnessFactor: 0.7,
                    metallicFactor: 1,
                    normalTexture: getImage('side.png'),
                    uvScale: [0.86, 0.86],
                    uvOffset: [0.35, 0],
                    normalMapFactor: 0.69,
                    normalMapFlipY: 0,
                    bumpTexture: getImage('side.png'),
                    occlusionTexture: getImage('side.png'),
                    materialShiness: 124
                }
            }
        }
    ]
    const layer = new GeoJSONVectorTileLayer('geojson-cdc', {
        data: cdcGeojson,
        zIndex: 0
    })
    layer.setStyle({
        style,
    }).addTo(map)
}
function getImage(image) {
    return new URL(`./images/${image}`, import.meta.url).href
}
</script>

<style lang="less" scoped>
.mtk-map {
    position: relative;
    height: 100vh;
}
</style>
