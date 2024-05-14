import { defineStore } from 'pinia'
import type { Viewer, ImageryLayer } from 'cesium'

interface IMapStore {
	viewerInstance: Viewer | null
	baseLayers: {
		imageLayers: ImageryLayer[],
		vectorLayers: ImageryLayer[],
	} | null
}

export const useMapStore = defineStore('map', {
	state: (): IMapStore => {
		return {
			viewerInstance: null,
			baseLayers: null,
		}
	},
	getters: {
		getViewerInstance: (state) => state.viewerInstance,
		getBaseLayers: (state) => state.baseLayers,
	},
	actions: {
		setViewerInstance(viewer: Viewer) {
			this.viewerInstance = viewer
		},
		setBaseLayers(layers: {
			imageLayers: ImageryLayer[],
			vectorLayers: ImageryLayer[],
		}) {
			this.baseLayers = layers
		},
	}
})