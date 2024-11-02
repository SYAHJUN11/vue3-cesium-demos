<template>
    <div class="three-draw-line" ref="sceneRef">
        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'

const sceneRef = ref()

let globalScene, globalCamera, globalRenderer

onMounted(() => {
    initScene()
})
function initScene() {
    globalScene = new THREE.Scene()
    globalCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
    globalCamera.position.set(0, 0, 100)
    globalCamera.lookAt(0, 0, 0)
    globalRenderer = new THREE.WebGLRenderer()
    globalRenderer.setSize(window.innerWidth, window.innerHeight)

    sceneRef.value.appendChild(globalRenderer.domElement)

    addLine2Scene()
}
function addLine2Scene() {
    const material = new THREE.LineBasicMaterial({ color: '#fff' })
    const points = []
    points.push(new THREE.Vector3(-10, 0, 0))
    points.push(new THREE.Vector3(0, 10, 0))
    points.push(new THREE.Vector3(5, 10, 0))
    points.push(new THREE.Vector3(10, 0, 0))

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(geometry, material)

    globalScene.add(line)
    globalRenderer.render(globalScene, globalCamera)
}
</script>

<style lang="less" scoped>
.three-draw-line {
    position: relative;
    height: 100vh;
}
</style>
