import { defineStore } from 'pinia'
import type { Viewer } from 'cesium'

interface IMapStore {
	viewerInstance: Viewer | null
}

const useMapStore = defineStore('viewerStore', {
	state: (): IMapStore => {
		return {
			viewerInstance: null,
		}
	},
	getters:{
		getViewerInstance: (state) => state.viewerInstance
	},
	actions: {
		setViewerInstance(viewer: Viewer) {
			this.viewerInstance = viewer
		}
	}
})

const mapStore = useMapStore()

export default mapStore