import {
	defineStore
} from 'pinia';

export const useCounterStore = defineStore('counter', {
	state: () => {
		return {
			token: '',
			admin: '',
			nickName: '',
			avatar: '',
			userId: '',
			userName: '',
			openId: ''
		};
	},
	actions: {
		setStorageToken(value) {
			uni.setStorage({
				key: 'token',
				data: value,
			});
			this.token = value
		},
	},
	getters: {},
});
