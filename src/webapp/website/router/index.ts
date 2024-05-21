// 创建一个路由器

// 引入createRouter、createWebHistory
import { createRouter, createWebHistory } from 'vue-router'

// 创建路由器
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('../views/home/Index.vue'),
      meta: {
        title: '首页',
        keepAlive: true,
      }
    },
    {
      path: '/my-2d-map',
      component: () => import('@/webapp/webgis/views/my-2d-map/Index.vue'),
      meta: {
        title: '二维地图',
        keepAlive: true,
      }
    }
  ]
})

export default router