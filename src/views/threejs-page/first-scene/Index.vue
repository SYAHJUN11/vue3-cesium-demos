<template>
    <div class="first-three-scene" ref="sceneRef">
        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three'

const sceneRef = ref()
let globalScene, globalCamera, globalRenderer
let cube

onMounted(() => {
    initThreeScene()
})
function initThreeScene() {
    globalScene = new Scene()
    globalCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    globalRenderer = new WebGLRenderer()
    globalRenderer.setSize(window.innerWidth, window.innerHeight)
    sceneRef.value.appendChild(globalRenderer.domElement)

    addGeometry2Scene()
    animate()
}
function addGeometry2Scene() {
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({color: '#fff'})
    cube = new Mesh(geometry, material)

    globalScene.add(cube)

    globalCamera.position.z = 5
}
function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    globalRenderer.render(globalScene, globalCamera)
}
</script>

<style lang="less" scoped>
.first-three-scene {
    position: relative;
    height: 100vh;
}
</style>
