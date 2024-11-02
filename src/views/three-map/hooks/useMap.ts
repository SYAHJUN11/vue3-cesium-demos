import * as THREE from 'three'

export function initRenderer(ele: HTMLElement) {
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    })
}
export function initScene(ele: HTMLElement) {
    const scene = new THREE.Scene()

    return scene
}
export function initCamera(ele: HTMLElement) {
    const width = ele.offsetWidth
    const height = ele.offsetHeight
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000)

    return camera
}
export function initControls() {

}