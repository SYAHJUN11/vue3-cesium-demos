export const GisRouteList = [
  {
    path: '/entity',
    component: () => import('../views/cesium-samples/entity/Index.vue'),
    meta: {
      title: '首页',
      keepAlive: true,
    }
  },
  {
    path: '/3d-model',
    component: () => import('../views/cesium-samples/3d-model/Index.vue'),
    meta: {
      title: '首页',
      keepAlive: true,
    }
  },
]