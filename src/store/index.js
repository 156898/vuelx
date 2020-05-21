import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		data: []
	},
	mutations: {
		"FECH_DATA"(state, action) {
			state.data = action
		}
	},
	actions: {
		'FECH_NAME_ACTION'({commit}) {
		axios.get('https://api.baxiaobu.com/index.php/home/v5/getuser')
		.then(res => {
			commit('FECH_DATA', res.data.users)
		})
		},
		'FECH_NAME_ADD'(context, payload) {
		axios.post('https://api.baxiaobu.com/index.php/home/v5/add', qs.stringify(payload))
		.then(res => {
			if (res.data.status === '200') {
				context.dispatch('FECH_DATA')
			}

		})
		},
		'FECH_NAME_UPDATA'(context, payload) {
		axios.post('https://api.baxiaobu.com/index.php/home/v5/updateUser', qs.stringify(payload))
		.then(res => {
			if (res.data.status === '200') {
				context.dispatch('FECH_DATA')
			}
		})
		},
		'FECH_NAME_DELETE'(context, payload) {
		axios.post("https://api.baxiaobu.com/index.php/home/v5/deleteUser",qs.stringify(payload))
			.then((res) => {
				if (res.data.status === "200") {
					context.dispatch('FECH_DATA');
				}
			})
		},
		'FECH_NAME_SEARCH'(context, payload) {
		axios.get("https://api.baxiaobu.com/index.php/home/v5/findUser?keyword=" +payload)
			.then((res) => {
				context.commit('FECH_DATA', res.data.users);
			})
		}
	}
})
