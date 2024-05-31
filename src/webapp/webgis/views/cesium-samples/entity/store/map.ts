import { defineStore } from 'pinia'
import type { Viewer, ImageryLayer } from 'cesium'

/**
 * 组合式
 */
interface IBaseLayers {
	imageLayers: ImageryLayer[],
	vectorLayers: ImageryLayer[],
}
import { ref } from 'vue'
export const useMapStore = defineStore('map', () => {
	const viewerInstance = ref<Viewer>()
	const baseLayers = ref<IBaseLayers>({
		imageLayers: [],
		vectorLayers: [],
	})

	function getViewerInstance(): Viewer {
		return viewerInstance.value as Viewer
	}
	function getBaseLayers(): IBaseLayers {
		return baseLayers.value
	}

	return {
		viewerInstance,
		baseLayers,
		getViewerInstance,
		getBaseLayers,
	}
})

/**
 * 选项式
 */
// interface IMapStore {
// 	viewerInstance: Viewer | null
// 	baseLayers: {
// 		imageLayers: ImageryLayer[],
// 		vectorLayers: ImageryLayer[],
// 	} | null
// }
// export const useMapStore = defineStore('map', {
// 	state: (): IMapStore => {
// 		return {
// 			viewerInstance: null,
// 			baseLayers: null,
// 		}
// 	},
// 	getters: {
// 		getViewerInstance: (state) => state.viewerInstance,
// 		getBaseLayers: (state) => state.baseLayers,
// 	},
// 	actions: {
// 		setViewerInstance(viewer: Viewer) {
// 			this.viewerInstance = viewer
// 		},
// 		setBaseLayers(layers: {
// 			imageLayers: ImageryLayer[],
// 			vectorLayers: ImageryLayer[],
// 		}) {
// 			this.baseLayers = layers
// 		},
// 	}
// })