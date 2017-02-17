import Vue from 'vue'
import Vuex from 'vuex'
import loadingMutations from './loading/mutations'
import newMutations from './user/mutations'

Vue.use(Vuex);

const loading = {
	state: {
		stack: [],
		showLoading: false
	},
	mutations: loadingMutations
}
const user = {
	state: {
		new: true,
		qr: '',
		id: null,
		rtimes: null
	},
	mutations: newMutations
}

export default new Vuex.Store({
	modules: {
		loading,
		user
	}
})

