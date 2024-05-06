import { defineStore } from 'pinia'
import { Viewer } from 'cesium'

const useViewerStore = defineStore('viewerStore', {
  state: () => {
		return {
			viewer: Viewer,
		}
	},
	getters:{
		getViewer: state => state.viewer
	},
	actions: {
		setViewer(viewer: Viewer) {
			this.viewer = viewer
		}
	}
})