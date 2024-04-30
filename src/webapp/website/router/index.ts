// 创建一个路由器

// 引入createRouter、createWebHistory
import { createRouter, createWebHistory } from 'vue-router'

// 创建路由器
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/home/Index.vue')
    }
  ]
})

export default router