import { createApp } from 'vue'
import App from './App.vue'
import * as Cesium from 'cesium'

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NGE1MTNiZi0yNmMxLTRmMzEtOTJjZC0yNjVlZWU2NDIzMDAiLCJpZCI6MjgyNjEsImlhdCI6MTY2MzgzNjY3NX0.4R4DdY_B2acUN3we8otGBzfsqXONhA5CV7cnPvSemaI'
createApp(App).mount('#app')
