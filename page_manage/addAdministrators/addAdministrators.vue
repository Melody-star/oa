<template>
	<view>
		<user-list v-show="isSelect" @getAllUserId='getAllUserId'></user-list>

		<uni-section title="管理员列表" type="line" v-show="isShow">
			<view class="list items-center" v-for="(item,i) in adminList" :key="i">
				<img :src="item.avatar" alt="" class="list-img">
				<text class="list-name">{{item.userName}}</text>
				<image class="list-cancel" src="http://img.zlpo.xyz/quxiao.png" @click="cancel"></image>
			</view>

			<view class="foot">
				<view class="foot-btn" @click="add">添加</view>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import {
		getAllUser,
		changeUser
	} from "@/api/api.js"

	export default {
		data() {
			return {
				adminList: [],
				isSelect: false,
				isShow: true
			}
		},
		methods: {
			cancel() {

			},
			add() {
				this.isSelect = true;
				this.isShow = false;
			},
			getAllUserId(e) {
				console.log(+e);

				let temp = +e

				changeUser({
					// userId: temp,
					admin: true
				}).then((res) => {
					console.log(res);
				})

				this.isSelect = false;
				this.isShow = true;
			}
		},
		onLoad() {
			getAllUser().then((res) => {
				this.adminList = res.rows.filter(item => item.admin == true)
			})
		}
	}
</script>

<style>
	page {
		/* background-color: #f5f5f5; */
	}

	.list {
		display: flex;
		margin-bottom: 30rpx;
	}

	.list-img {
		margin-left: 74rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 100rpx;
	}

	.list-name {
		margin-left: 37rpx;
		font-size: 32rpx;
		width: 400rpx;
	}

	.list-cancel {
		width: 65rpx;
		height: 38rpx;
		margin-left: 23rpx;
	}

	.foot {
		background-color: #ffffff;
		width: 100%;
		height: 120rpx;
		position: absolute;
		bottom: 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.foot-btn {
		width: 584rpx;
		height: 71rpx;
		background-color: #2973FF;
		border-radius: 10rpx;
		color: #ffffff;
		text-align: center;
		line-height: 71rpx;
		font-size: 28rpx;
	}
</style>
