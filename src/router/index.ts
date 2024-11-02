import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/mtk-map'
        },
        {
            path: '/first-three-scene',
            component: () => import('@/views/threejs-page/first-scene/Index.vue'),
        },
        {
            path: '/three-draw-line',
            component: () => import('@/views/threejs-page/draw-line/Index.vue'),
        },
        {
            path: '/three-map',
            component: () => import('@/views/three-map/Index.vue'),
        },
        {
            path: '/mtk-map',
            component: () => import('@/views/mtk-map/Index.vue'),
            // component: () => import('@/views/mtk-map/Index1.vue'),
        }
    ]
})

export default router