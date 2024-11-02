import { createApp } from 'vue'
import * as Cesium from 'cesium'
import "ol/ol.css"
import { createPinia } from 'pinia'
import App from './App.vue'
// import router from './webapp/website/router'
import router from '@/router'

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NGE1MTNiZi0yNmMxLTRmMzEtOTJjZC0yNjVlZWU2NDIzMDAiLCJpZCI6MjgyNjEsImlhdCI6MTY2MzgzNjY3NX0.4R4DdY_B2acUN3we8otGBzfsqXONhA5CV7cnPvSemaI'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
